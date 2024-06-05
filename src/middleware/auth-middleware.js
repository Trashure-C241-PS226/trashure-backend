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

const tokenWithPastExp = jwt.sign(
	{
		data: null,
		exp: Math.floor(Date.now() / 1000) - 60 * 60 // 1 jam yang lalu
	},
	process.env.JWT_SECRET_TOKEN
);

const authenticateToken = async (req, res, next) => {
	let token = req.get("Authorization");
	token = String(token).split("Bearer ")[1];

	if (!token) {
		res.status(401).json({
		    errors: "Unauthorized"
		}).end();

		return;
	} 

	try {
		var decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		req.data = decoded.data
		next();
	  } catch (err) {
		res.status(401).json({
			error: "Unauthorized",
		}).end();
	  }
}

export { generateToken, authenticateToken, tokenWithPastExp };
