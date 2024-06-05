import itemService from "../service/item-service.js";

const create = async (req, res, next) => {
	try {
		const user = req.data;
		const request = req.body;
		const result = await itemService.create(user, request);

		res.status(201).json({
			message: "Barang berhasil dibuat!",
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const updateSold = async (req, res, next) => {
	try {
		const idItem = req.params.id;
		const collector = req.data;

		const result = await itemService.updateStatusSold(collector, idItem);

		res.status(200).json({
			message: "Barang berhasil di terima oleh collector!",
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const updateAvailable = async (req, res, next) => {
	try {
		const idItem = req.params.id;

		const result = await itemService.updateStatusAvailable(idItem);

		res.status(200).json({
			message: "Barang berhasil di terima oleh collector!",
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

export default { create, updateSold, updateAvailable };
