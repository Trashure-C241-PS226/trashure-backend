import { createItemValidation } from "../validation/item-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { logger } from "../app/logging.js";

const create = async (user, request) => {
	const itemReq = validate(createItemValidation, request);
	itemReq.user_id = user.id;
	itemReq.status = "Available";

    logger.info(itemReq)

	return prismaClient.item.create({
		data: itemReq,
	});
};

const updateStatusSold = async (collector, idItem) => {
    const idItemInt = parseInt(idItem, 10);

    return prismaClient.item.update({
        data: {
            collector_id: collector.id,
            status: "SoldOut"
        }, 
        where: {
            id: idItemInt
        },
    })
}

const updateStatusAvailable = async (idItem) => {
    const idItemInt = parseInt(idItem, 10);

    return prismaClient.item.update({
        data: {
            collector_id: null,
            status: "Available"
        }, 
        where: {
            id: idItemInt
        },
    })
}

export default { create, updateStatusSold, updateStatusAvailable };
