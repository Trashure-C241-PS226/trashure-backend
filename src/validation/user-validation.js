import Joi from "joi";

const registerUserValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(100).required(),
  fullname: Joi.string().max(255).required(),
  nomor: Joi.string().max(15).required(),
  image: Joi.string().max(255).optional(),
  provinsi: Joi.string().max(255).required(),
  kab_kota: Joi.string().max(255).required(),
  kecamatan: Joi.string().max(255).required(),
  kode_pos: Joi.string().max(255).required(),
});

export { registerUserValidation };
