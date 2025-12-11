import { likeService } from "../services/like.service.js";

export const likeController = {
  async likePost(req, res, next) {
    try {
      const { id } = req.params;

      const userId = req.user ? req.user.id : null;

      const result = await likeService.togglePostLike(id, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async likeComment(req, res, next) {
    try {
      const { id } = req.params;

      const userId = req.user ? req.user.id : null;

      const result = await likeService.toggleCommentLike(id, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
