import Joi from "joi";

const registerCollectorValidation = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(255).required(),
  nomor: Joi.string().max(15).required(),
  provinsi: Joi.string().max(255).required(),
  kab_kota: Joi.string().max(255).required(),
  kecamatan: Joi.string().max(255).required(),
  kode_pos: Joi.string().max(10).required(),
  tipe: Joi.string().max(15).required(),
  deskripsi: Joi.string().required(),
});

const loginCollectorValidation = Joi.object({
  email: Joi.string().max(255).email().required(),
  password: Joi.string().max(100).required(),
});

export { registerCollectorValidation, loginCollectorValidation };
