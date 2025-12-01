import { commentService } from "../services/comment.service.js";

export const commentController = {
  async createComment(req, res, next) {
    try {
      const { content, postId } = req.body;

      const userId = req.user.id;

      const result = await commentService.createComment(
        content,
        userId,
        postId
      );

      res.status(201).json({
        message: "Comment success",
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllComment(req, res, next) {
    try {
      const allComment = await commentService.getAllComment();
      res.status(200).json({
        message: "sucess",
        allComment,
      });
    } catch (error) {
      next(error);
    }
  },
};
