import { registerCollectorValidation, loginCollectorValidation } from "../validation/collector-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth-middleware.js";

const register = async (request) => {
	const collectorReq = validate(registerCollectorValidation, request);

	const countUser = await prismaClient.collector.count({
		where: {
			email: collectorReq.email,
		},
	});

	if (countUser === 1) throw new ResponseError(400, "User already Registered");

	collectorReq.password = await bcrypt.hash(collectorReq.password, 10);

	return prismaClient.collector.create({
		data: collectorReq,
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
		include: {
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
