import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

export const commentService = {
  async getAllComment() {
    return await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { username: true, picture: true },
        },
        post: {
          select: { title: true },
        },
      },
    });
  },

  async createComment(content, userId, postId) {
    return await prisma.comment.create({
      data: {
        content: content,
        userId: +userId,
        postId: +postId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            picture: true,
          },
        },
      },
    });
  },

  async updateComment(commentId, userId, content) {
    const foundComment = await prisma.comment.findUnique({
      where: { id: +commentId },
    });

    if (!foundComment) {
      throw createHttpError(404, "Comment not found");
    }

    if (foundComment.userId !== userId) {
      throw createHttpError(403, "You are not allowed to edit this comment");
    }

    return await prisma.comment.update({
      where: { id: +commentId },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            picture: true,
          },
        },
      },
    });
  },

  async deleteComment(commentId, userId, userRole) {
    return await prisma.$transaction(async (tx) => {
      await tx.commentLike.deleteMany({
        where: { commentId: +commentId },
      });

      return await tx.comment.delete({
        where: { id: +commentId },
      });
    });
  },
};
