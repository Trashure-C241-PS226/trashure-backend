import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";
import { logger } from "../app/logging.js";

const generateToken = (payloadData) => {
	return jwt.sign(
		{
			data: payloadData,
		},
		process.env.JWT_SECRET_TOKEN,
		{
			expiresIn: "1h",
		}
	);
};

const authenticateTokenUser = async (req, res, next) => {
	let token = req.get("Authorization");
	token = String(token).split("Bearer ")[1];

	if (!token) {
		res.status(401).json({
			errors: "Unauthorized",
		}).end();
		return;
	}

	try {
		const totalUserInDatabase = await prismaClient.user.count({
			where: {
				token: token
			}
		})

		logger.info("User : "+ totalUserInDatabase)

		if (totalUserInDatabase !== 1) {
			res.status(401).json({
				errors: "Unauthorized",
			}).end();
			return;
		}

		var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		req.data = decoded.data;
		next();
	} catch (err) {
		res.status(401).json({
			errors: "Unauthorized",
		}).end();
	}
};

const authenticateTokenCollector = async (req, res, next) => {
	let token = req.get("Authorization");
	token = String(token).split("Bearer ")[1];

	if (!token) {
		res.status(401).json({
			errors: "Unauthorized",
		}).end();
		return;
	}

	try {
		const totalCollectorInDatabase = await prismaClient.collector.count({
			where: {
				token: token
			}
		})

		logger.info("Collector : "+ totalCollectorInDatabase);

		if (totalCollectorInDatabase !== 1) {
			res.status(401).json({
				errors: "Unauthorized",
			}).end();
			return;
		}

		var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		req.data = decoded.data;
		next();
	} catch (err) {
		res.status(401).json({
			errors: "Unauthorized",
		}).end();
	}
};

export { generateToken, authenticateTokenUser, authenticateTokenCollector };
