import Joi from "joi";

const registerUserValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(100).required(),
  username: Joi.string().max(255).required(),
  nomor: Joi.string().max(15).required(),
  image: Joi.string().max(255).optional(),
  provinsi: Joi.string().max(255).required(),
  kab_kota: Joi.string().max(255).required(),
  kecamatan: Joi.string().max(255).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(100).required(),
});

const updateUserValidation = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(100).optional(),
  username: Joi.string().max(255).optional(),
  nomor: Joi.string().max(15).optional(),
  image: Joi.string().max(255).optional(),
  provinsi: Joi.string().max(255).optional(),
  kab_kota: Joi.string().max(255).optional(),
  kecamatan: Joi.string().max(255).optional(),
});

export { registerUserValidation, loginUserValidation, updateUserValidation };
