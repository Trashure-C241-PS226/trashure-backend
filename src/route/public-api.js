import express from "express";

import userController from "../controller/user-controller.js";
import collectorController from "../controller/collector-controller.js";

const publicRouter = new express.Router();

// route collectors
publicRouter.post("/api/collectors", collectorController.register);
publicRouter.post("/api/collectors/login", collectorController.login);

// route users
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
