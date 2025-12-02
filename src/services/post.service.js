import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

export const postService = {
  async createPost(userId, content, title, thumbnail, categoryId) {
    const catIdInt = categoryId ? parseInt(categoryId) : undefined;

    const newPost = await prisma.post.create({
      data: {
        userId,
        title,
        content,
        thumbnail,
        categoryId: catIdInt,
      },
      include: {
        user: {
          select: { username: true, picture: true },
        },
        category: true,
      },
    });

    return newPost;
  },

  async getAllPosts() {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { username: true, picture: true },
        },
        category: true,
        comments: {
          include: {
            user: {
              select: { username: true, picture: true },
            },
          },
        },
        likes: true,
      },
    });
  },

  async deletePost(postId, userId) {
    const foundPost = await prisma.post.findUnique({ where: { id: postId } });

    if (!foundPost) throw createHttpError(404, "Data not found");

    if (foundPost.userId !== userId)
      throw createHttpError(401, "Cannot delete this post");

    return await prisma.post.delete({ where: { id: postId } });
  },

  async updatePost(postId, userId, content, title, thumbnail) {
    const foundPost = await prisma.post.findUnique({ where: { id: postId } });

    if (!foundPost) throw createHttpError(404, "Post not found");

    if (foundPost.userId !== userId)
      throw createHttpError(400, "Cannot edit this post");

    return await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        thumbnail,
      },
    });
  },
};
