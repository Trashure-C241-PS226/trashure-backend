import collectorService from "../service/collector-service.js";

const register = async (req, res, next) => {
	try {
		const result = await collectorService.register(req.body);
		
        res.status(201).json({
			message: "User berhasil dibuat!",
			success: true,
			data: result,
		});
	} catch (e) {
        next(e);
	}
};

const login = async (req, res, next) => {
    try {
        const result = await collectorService.login(req.body);
        
        res.status(200).json({
            message: "User berhasil login!",
            success: true,
            data: result,
        });
    } catch (e) {
        next(e)
    }
}

export default { register, login };
