import { Router } from "express";
import { likeController } from "../controllers/like.controller.js";
import { postController } from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.post("/", authMiddleware, postController.createPost);
postRouter.delete("/:id", authMiddleware, postController.deletePost);
postRouter.put("/:id", authMiddleware, postController.updatePost);

// like
postRouter.post("/:id/like", authMiddleware, likeController.likePost);

export default postRouter;
