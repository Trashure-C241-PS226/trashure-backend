import { registerCollectorValidation, loginCollectorValidation } from "../validation/collector-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth-middleware.js";
import { getPublicUrl, uploadToGCS } from "../utils/imgUpload.js";
import { dateID } from "../utils/date.js";

const register = async (request, imgReq) => {
	imgReq.name = dateID() + "T" + imgReq.name;
	const collectorReq = validate(registerCollectorValidation, request);

	const countUser = await prismaClient.collector.count({
		where: {
			email: collectorReq.email,
		},
	});

	if (countUser === 1) throw new ResponseError(400, "User already Registered");

	// upload image to Cloud Storage
	await uploadToGCS("collector", imgReq);

	collectorReq.image = getPublicUrl("collector", imgReq.name);

	collectorReq.password = await bcrypt.hash(collectorReq.password, 10);

	return prismaClient.collector.create({
		data: collectorReq,
		select: {
			id: true,
			email: true,
			name: true,
			nomor: true,
			image: true,
			provinsi: true,
			kab_kota: true,
			kecamatan: true,
			tipe: true,
			deskripsi: true,
		},
	});
};

const login = async (request) => {
	const loginRequest = validate(loginCollectorValidation, request);

	const collector = await prismaClient.collector.findUnique({
		where: {
			email: loginRequest.email,
		},
		select: {
			id: true,
			email: true,
			password: true,
		},
	});

	if (!collector) throw new ResponseError(401, "Email or password wrong");

	const isPasswordValid = await bcrypt.compare(loginRequest.password, collector.password);

	if (!isPasswordValid) throw new ResponseError(401, "Email or password wrong");

	const jwtToken = generateToken(collector);

	return prismaClient.collector.update({
		data: {
			token: jwtToken,
		},
		where: {
			email: collector.email,
		},
		select: {
			token: true,
		},
	});
};

const get = async (idToken) => {
	const collector = await prismaClient.collector.findUnique({
		where: {
			id: idToken,
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
			tipe: true,
			deskripsi: true,
			items: true,
		},
	});

	if (!collector) throw new ResponseError(404, "Collector is not found");

	return collector;
};

const logout = async (idToken) => {
	const collector = await prismaClient.collector.findUnique({
		where: {
			id: idToken,
		},
	});

	if (!collector) {
		throw new ResponseError(404, "user is not found");
	}

	return prismaClient.collector.update({
		where: {
			id: collector.id,
		},
		data: {
			token: null,
		},
		select: {
			email: true,
		},
	});
};

export default { register, login, get, logout };
