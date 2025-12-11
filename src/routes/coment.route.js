import { Router } from "express";
import { commentController } from "../controllers/comment.controller.js";
import authMiddleware, {
  optionalAuthenticate,
} from "../middlewares/auth.Middleware.js";
import { likeController } from "../controllers/like.controller.js";

const commentRouter = Router();

commentRouter.get("/", authMiddleware, commentController.getAllComment);
commentRouter.post("/", authMiddleware, commentController.createComment);
commentRouter.patch("/:id", authMiddleware, commentController.updateComment);
commentRouter.delete("/:id", authMiddleware, commentController.deleteComment);

// like
commentRouter.post(
  "/:id/like",
  optionalAuthenticate,
  likeController.likeComment
);

export default commentRouter;
