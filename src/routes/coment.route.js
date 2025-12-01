import { Router } from "express";
import { commentController } from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

const commentRouter = Router();

commentRouter.get("/", authMiddleware, commentController.getAllComment);
commentRouter.post("/", authMiddleware, commentController.createComment);
commentRouter.patch("/", () => {});
commentRouter.delete("/", () => {});

export default commentRouter;
