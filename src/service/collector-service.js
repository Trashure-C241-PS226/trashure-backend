import { registerCollectorValidation, loginCollectorValidation } from "../validation/collector-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken, tokenWithPastExp } from "../middleware/auth-middleware.js";
import { logger } from "../app/logging.js";

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
	});

	if (!collector) throw new ResponseError(401, "Email or password wrong");

	const isPasswordValid = await bcrypt.compare(loginRequest.password, collector.password);
	if (!isPasswordValid) throw new ResponseError(401, "Email or password wrong");

	let jwtToken = null;
	jwtToken = generateToken(collector);
	// logger.info(jwtToken);

	// const result = await prismaClient.collector.update({
	// 	data: {
	// 		token: jwtToken,
	// 	},
	// 	where: {
	// 		id: collector.id,
	// 	},
	// 	select: {
	// 		token: true,
	// 	},
	// });
	// logger.info(result);

	// const impacted = await prismaClient.$executeRaw`UPDATE collectors SET token = ${jwtToken} WHERE id = ${collector.id};`;
	// const collectors = await prismaClient.$queryRaw`SELECT * FROM collectors WHERE id = ${collector.id}`;

	return jwtToken;
};

const get = async (idToken) => {
	const collector = await prismaClient.collector.findUnique({
		where: {
			id: idToken,
		},
		include: {
			items: true
		}
	});
	
	if (!collector) throw new ResponseError(404, "Collector is not found");
	
	return collector;
};

const logout = async () => {
	return tokenWithPastExp;
};

export default { register, login, get, logout };
