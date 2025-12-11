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
        message: "success",
        allComment,
      });
      console.log(allComment);
    } catch (error) {
      next(error);
    }
  },

  async updateComment(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.id;

      const result = await commentService.updateComment(id, userId, content);

      res.json({
        message: "Update comment success",
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.role;

      await commentService.deleteComment(id, userId, userRole);

      res.json({
        message: "Delete comment success",
      });
    } catch (error) {
      next(error);
    }
  },
};
