import express from "express";

import collectorController from "../controller/collector-controller.js";
import itemController from "../controller/item-controller.js";
import { authenticateToken } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();

privateRouter.use(authenticateToken);

// private route collectors
privateRouter.get("/api/collectors", collectorController.get);
privateRouter.delete("/api/collectors/logout", collectorController.logout);

// private route items
privateRouter.post("/api/users/item", itemController.create);
privateRouter.patch("/api/collectors/items/:id", itemController.updateSold);
privateRouter.patch("/api/collectors/items/:id/reject", itemController.updateAvailable);

export { privateRouter };
