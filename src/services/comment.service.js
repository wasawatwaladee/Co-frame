import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

export const commentService = {
  async getAllComment() {
    return await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            picture: true,
          },
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
    const foundComment = await prisma.comment.findUnique({
      where: { id: +commentId },
    });

    if (!foundComment) {
      throw createHttpError(404, "Comment not found");
    }

    if (foundComment.userId !== userId) {
      throw createHttpError(403, "You are not allowed to delete this comment");
    }
    const isOwner = foundPost.userId === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw createHttpError(403, "Cannot delete this comment");
    }
    return await prisma.comment.delete({
      where: { id: +commentId },
    });
  },
};
