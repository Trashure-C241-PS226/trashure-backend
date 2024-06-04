import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) throw new ResponseError(400, "Username already exists");

  user.password = await bcrypt.hash(user.password, 10);

  console.log(user);

  return await prismaClient.user.create({
    data: user,
    select: {
      email: true,
      fullname: true,
      nomor: true,
      provinsi: true,
      kab_kota: true,
      kecamatan: true,
      kode_pos: true,
    },
  });
};

export default { register };
