import { likeService } from "../services/like.service.js";

export const likeController = {
  // ฟังก์ชันสำหรับ Route Post
  async likePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await likeService.togglePostLike(id, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  // ฟังก์ชันสำหรับ Route Comment
  async likeComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const result = await likeService.toggleCommentLike(id, userId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
