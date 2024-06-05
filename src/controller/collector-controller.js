import collectorService from "../service/collector-service.js";

const register = async (req, res, next) => {
	try {
		const result = await collectorService.register(req.body);
		
        res.status(201).json({
			message: "Collector berhasil dibuat!",
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
            message: "Collector berhasil login!",
            success: true,
            data: result,
        });
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.data.id;
        const result = await collectorService.get(id);
        
        res.status(200).json({
            message: "Berhasil mendapatkan Collector!",
            success: true,
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const id = req.data.id;
        const result = await collectorService.logout(id);
        
        res.status(200).json({
            message: "Collector berhasil keluar!",
            success: true,
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default { register, login, get, logout };
