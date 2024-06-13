import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter, collectorRouter } from "../route/api.js";
import expressFileUpload from "express-fileupload";
import { loadModel } from "../utils/loadModel.js";
import cors from "cors";

export const web = express();

const model = await loadModel();
web.locals.model = model;

web.use(cors({ origin: '*' }));

web.use(express.json());
web.use(express.urlencoded({ extended: false }));
web.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

web.use(publicRouter);
web.use("/api/users", userRouter);
web.use("/api/collectors",collectorRouter);

web.use(errorMiddleware);
