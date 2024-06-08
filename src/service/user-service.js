import { prismaClient } from "../app/database.js";
import { logger } from "../app/logging.js";
import { ResponseError } from "../error/response-error.js";
import { generateToken } from "../middleware/auth-middleware.js";
import { getPublicUrl, uploadToGCS } from "../utils/imgUpload.js";
import {
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
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
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) throw new ResponseError(401, "Username or password wrong");

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid)
    throw new ResponseError(401, "Username or password wrong");

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

const update = async (request, imgReq) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (totalUserInDatabase !== 1) throw new ResponseError(404, "User not found");

  const data = {
    fullname: user?.fullname,
    nomor: user?.nomor,
    provinsi: user?.provinsi,
    kab_kota: user?.kab_kota,
    kecamatan: user?.kecamatan,
    kode_pos: user?.kode_pos,
  };

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  await uploadToGCS("user", imgReq);
  data.image = getPublicUrl("user", imgReq.name);

  return await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      fullname: true,
      nomor: true,
      image: true,
      provinsi: true,
      kab_kota: true,
      kecamatan: true,
      kode_pos: true,
    },
  });
};

const get = async (request) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: request,
    },
    select: {
      email: true,
      fullname: true,
      nomor: true,
      image: true,
      provinsi: true,
      kab_kota: true,
      kecamatan: true,
      kode_pos: true,
      items: true,
    },
  });

  if (!user) throw new ResponseError(404, "User tidak ditemukan ");

  return user;
};

const logout = async (id) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return prismaClient.user.update({
    where: {
      id: id,
    },
    data: {
      token: null,
    },
    // select: {},
  });
};

const getAllPengepuls = async (pengepul_id) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: pengepul_id,
    },
    select: {
      kab_kota: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  const result = await prismaClient.collector.findMany({
    where: {
      kab_kota: user.kab_kota,
    },
    select: {
      id: true,
      email: true,
      name: true,
      nomor: true,
      image: true,
      provinsi: true,
      kab_kota: true,
      kecamatan: true,
      kode_pos: true,
      tipe: true,
      deskripsi: true,
    },
  });

  if (result.length == 0)
    throw new ResponseError(404, "Tidak ada pengepul di daerah anda!");

  return result;
};

const getPengepullById = async (id) => {
  logger.info([id]);
  const pengepul = await prismaClient.collector.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      nomor: true,
      image: true,
      provinsi: true,
      kab_kota: true,
      kecamatan: true,
      kode_pos: true,
      tipe: true,
      deskripsi: true,
    },
  });

  if (!pengepul) {
    throw new ResponseError(404, "Collector is not found");
  }

  return pengepul;
};

export default {
  register,
  login,
  update,
  get,
  logout,
  getAllPengepuls,
  getPengepullById,
};
