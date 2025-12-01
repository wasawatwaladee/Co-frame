import { Router } from "express";
import { createLike, deleteLike } from "../controllers/like.controller.js";
import { postController } from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

const postRouter = Router();

postRouter.get("/", authMiddleware, postController.getAllPosts);
postRouter.post("/", authMiddleware, postController.createPost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);
postRouter.put("/:id", authMiddleware, postController.updatePost);

// like
postRouter.post("/:id/like", authMiddleware, createLike);
postRouter.delete("/:id/like", authMiddleware, deleteLike);

export default postRouter;
