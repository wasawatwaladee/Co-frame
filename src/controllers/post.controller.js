import { postService } from "../services/post.service.js";

export const postController = {
  async createPost(req, res, next) {
    try {
      const { content, title, categoryId, thumbnail } = req.body;
      const userId = req.user.id;

      const result = await postService.createPost(
        userId,
        title,
        content,
        thumbnail,
        categoryId
      );

      res.status(201).json({
        message: "Create Post success",
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();
      res.json({ posts });
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      await postService.deletePost(+id, userId);
      res.json({ message: "Delete done" });
    } catch (error) {
      next(error);
    }
  },

  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { message, image } = req.body;
      const userId = req.user.id;
      const result = await postService.updatePost(+id, userId, message, image);
      res.json({ message: "Update post done", result });
    } catch (error) {
      next(error);
    }
  },
};
