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

export default { register, login };
