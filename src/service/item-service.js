import { createItemValidation, predictItemValidation, updateItemValidation } from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { getPublicUrl, uploadToGCS } from "../utils/imgUpload.js";
import { dateID } from "../utils/date.js";

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

const predict = async (model, request) => {
	const itemReq = validate(predictItemValidation, request);


	return itemReq;
};

export default {
	create,
	update,
	predict,
};
