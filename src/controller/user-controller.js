import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(200).json({
      message: "User berhasil di buat!",
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      message: "User berhasil login!",
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const request = req.body;
    const request_id = req.data.id;
    request.id = request_id;
    request.email = req.data.email;

    const result = await userService.update(request);
    res.status(200).json({
      message: "Profile berhasil dirubah",
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const request = req.data.id;

    const result = await userService.get(request);
    res.status(200).json({
      message: "Berhasil mendapatkan User!",
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.data.id);
    res.status(200).json({
      message: "Gagal logout!",
      success: true,
      data: {},
    });
  } catch (e) {
    next(e);
  }
};

const getAllPengepuls = async (req, res, next) => {
  try {
    const result = await userService.getAllPengepuls();
    res.status(200).json({
      message: "Berhasil mendapatkan pengepul!",
      success: true,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { register, login, update, get, logout, getAllPengepuls };
