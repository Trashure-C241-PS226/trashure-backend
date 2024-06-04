import jwt from "jsonwebtoken";

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

export { generateToken };
