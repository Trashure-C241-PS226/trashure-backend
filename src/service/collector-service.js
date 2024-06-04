import { registerCollectorValidation, loginCollectorValidation } from "../validation/collector-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { logger } from "../app/logging.js";
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

	const collector = await prismaClient.collector.findFirst({
		where: {
			email: loginRequest.email,
		},
	});

	if (!collector) {
		throw new ResponseError(401, "Email or password wrong");
	}

	const isPasswordValid = await bcrypt.compare(loginRequest.password, collector.password);
	if (!isPasswordValid) {
		throw new ResponseError(401, "Email or password wrong");
	}

    let jwtToken = null;
	jwtToken = generateToken(collector);
	logger.info(jwtToken);

	return prismaClient.collector.update({
        data: {
            token: jwtToken
        },
        where: {
            id: collector.id
        },
        select: {
            token: true
        }
    });
};

export default { register, login };
