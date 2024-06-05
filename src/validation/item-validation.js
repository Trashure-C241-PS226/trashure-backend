import Joi from "joi";

const createItemValidation = Joi.object({
    brand: Joi.string().max(100).optional(),
    storage: Joi.string().max(100).optional(),
    harga: Joi.string().max(100).optional(),
    ram: Joi.string().max(50).optional(),
    screen_size: Joi.string().max(50).optional(),
    camera: Joi.string().max(50).optional(),
    battery_capacity: Joi.string().max(50).optional(),
    tahun_pemakaian: Joi.number().required(),
    kategori: Joi.string().valid('Handphone', 'Laptop').max(15).required(),
    minus: Joi.string().optional(),
});

export { createItemValidation }
