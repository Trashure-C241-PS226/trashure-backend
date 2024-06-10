import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  // Jika ada error
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        message: err.message,
        success: false,
        data: {},
      })
      .end();
  } else {
    res.status(500);
  }
};

export { errorMiddleware };
