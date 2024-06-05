import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { generateToken } from "../middleware/auth-middleware.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
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

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  console.log(user);

  if (!user) throw new ResponseError(401, "Username or password wrong");

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid)
    throw new ResponseError(401, "Username or password wrong");

  // const secret = process.env.JWT_SECRET;
  // const expiresIn = 60 * 60 * 1;
  const token = generateToken(user);

  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      email: user.email,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
