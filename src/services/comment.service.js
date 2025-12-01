import prisma from "../config/prisma.js";

export const commentService = {
  async getAllComment() {
    return await prisma.comment.findMany({
      orderBy: "desc",
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
        userId: +userId, // แปลงเป็น Int
        postId: +postId, // แปลงเป็น Int
      },
      include: {
        user: {
          select: {
            id: true,
            // username: true,
            firstName: true,
            lastName: true,
            picture: true,
          },
        },
      },
    });
  },
};
