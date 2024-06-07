import { createItemValidation, updateItemValidation } from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, idCollector, request) => {
	const itemReq = validate(createItemValidation, request);
	itemReq.user_id = user.id;
	itemReq.collector_id = parseInt(idCollector, 10);
	itemReq.status = "Available";

	const findCollector = await prismaClient.collector.count({
		where: {
			id: itemReq.collector_id,
		},
	});

	if (findCollector !== 1) throw new ResponseError(400, "Collector is not found");

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

export default {
	create,
	update,
};
