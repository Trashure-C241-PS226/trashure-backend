import express from "express";

import collectorController from "../controller/collector-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();

privateRouter.use(authenticateToken)

privateRouter.get("/api/collectors", collectorController.get);
privateRouter.get("/api/collectors/logout", collectorController.logout);

export { privateRouter };
