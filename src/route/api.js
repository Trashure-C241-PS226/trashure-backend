import express from "express";

import collectorController from "../controller/collector-controller.js";
import itemController from "../controller/item-controller.js";
import {
  authenticateTokenUser,
  authenticateTokenCollector,
} from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";

const userRouter = new express.Router();
const collectorRouter = new express.Router();

userRouter.use(authenticateTokenUser);
collectorRouter.use(authenticateTokenCollector);

// private route collectors
collectorRouter.get("", collectorController.get);
collectorRouter.delete("/logout", collectorController.logout);

// private route items
userRouter.post("/collectors/:id/items", itemController.create);
userRouter.patch("/items/:id", itemController.update);

// private route users
userRouter.patch("", userController.update);
userRouter.get("", userController.get);
userRouter.delete("", userController.logout);
userRouter.get("/collectors", userController.getAllPengepuls);
userRouter.get("/collectors/:collectorId", userController.getPengepullById);

export { userRouter, collectorRouter };
