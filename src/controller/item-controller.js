import itemService from "../service/item-service.js";

const create = async (req, res, next) => {
	try {
		const user = req.data;
		const idCollector = req.params.id;
		const request = req.body;
		
		const result = await itemService.create(user, idCollector, request);

		res.status(201).json({
			message: "Barang berhasil dibuat!",
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};

const update = async (req, res, next) => {
	try {
		const idItem = req.params.id;
		const request =  req.body;

		const result = await itemService.update(idItem, request);

		res.status(200).json({
			message: "Barang berhasil dirubah!",
			success: true,
			data: result,
		});
	} catch (e) {
		next(e);
	}
};


export default { create, update };
