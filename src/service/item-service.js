import { createItemValidation, predictItemValidation, updateItemValidation } from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getPublicUrl, uploadToGCS } from "../utils/imgUpload.js";
import { dateID } from "../utils/date.js";
import tf from "@tensorflow/tfjs-node";
import { runPythonScript } from "../utils/runPhyton.js";
import { getBrandIndex } from "../utils/helper.js";

const create = async (user, idCollector, request, imgReq) => {
	const itemReq = validate(createItemValidation, request);
	itemReq.user_id = user.id;
	itemReq.collector_id = parseInt(idCollector, 10);
	itemReq.status = "Available";
	imgReq.name = dateID() + "T" + imgReq.name;

	const findCollector = await prismaClient.collector.count({
		where: {
			id: itemReq.collector_id,
		},
	});

	if (findCollector !== 1) throw new ResponseError(400, "Collector is not found");

	// upload image to Cloud Storage
	await uploadToGCS("item", imgReq);

	itemReq.image = getPublicUrl("item", imgReq.name);

	return prismaClient.item.create({
		data: itemReq,
	});
};

const update = async (idItem, request) => {
	const idItemInt = parseInt(idItem, 10);
	const itemReqUpdate = validate(updateItemValidation, request);

	const findItem = await prismaClient.item.count({
		where: {
			id: idItemInt,
		},
	});

	if (findItem !== 1) {
		throw new ResponseError(400, "Item is not found");
	}

	return prismaClient.item.update({
		where: {
			id: idItemInt,
		},
		data: itemReqUpdate,
	});
};

const descBatas = ["99-199", "199-299", "299-499", "499-1399"];
const persentaseAndroid = [0.6638, 0.385, 0.28695, 0.1889];
const persentaseIphone = [0.833, 0.6433, 0.4894, 0.3357];

const predict = async (model, request) => {
	const itemReq = validate(predictItemValidation, request);
	try {
		const new_data = {
			Brand: [getBrandIndex(itemReq.brand)],
			Storage: [itemReq.storage],
			RAM: [itemReq.ram],
			"Screen_Size_(inches)": [Number(itemReq.screen_size)],
			"Camera_(MP)": [Number(itemReq.camera)],
			"Battery_Capacity_(mAh)": [Number(itemReq.battery_capacity)],
		};

		// mengambil hasil data inputan yang sudah dinormalisasi
		const newDataNormalized = await runPythonScript(new_data);
		// data "newDataNormalized" yang awalnya array JavaScript, dirubah menjadi tensor 2D
		const inputTensor = tf.tensor2d(newDataNormalized);
		// prediksi berdasarkan "inputTensor"
		const predictedLogPrice = model.predict(inputTensor);
		// mengambil value array terbesar dari predict class
		const yPredClass = predictedLogPrice.argMax(-1).dataSync()[0];
		const predictedPriceRange = descBatas[yPredClass];

		// konversi dollar ke rupiah
		const arr = predictedPriceRange.split("-");
		const rupiah = 16299;
		let batasBawahRP = parseFloat(Number(arr[0]) * rupiah);
		let batasAtasRP = parseFloat(Number(arr[1]) * rupiah);

		let newBatasBawah, newBatasAtas;
		const th = Number(itemReq.tahun_pemakaian) > 4 ? 4 : Number(itemReq.tahun_pemakaian);
		if (itemReq.brand === "Apple") {
			newBatasBawah = batasBawahRP * persentaseIphone[th - 1];
			newBatasAtas = batasAtasRP * persentaseIphone[th - 1];
		} else {
			newBatasBawah = batasBawahRP * persentaseAndroid[th - 1];
			newBatasAtas = batasAtasRP * persentaseAndroid[th - 1];
		}

		let formatter = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 2,
		});

		const result = `${formatter.format(newBatasBawah)} - ${formatter.format(newBatasAtas)}`;

		return {
			category : yPredClass,
			harga: result
		};
	} catch (error) {
		throw new ResponseError(500, error);
	}
};

export default {
	create,
	update,
	predict,
};
