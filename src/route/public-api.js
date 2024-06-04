import express from "express";
import collectorController from "../controller/collector-controller.js";

const publicRouter = new express.Router();

publicRouter.post('/api/collectors', collectorController.register);
publicRouter.post('/api/collectors/login', collectorController.login);

export { publicRouter };
