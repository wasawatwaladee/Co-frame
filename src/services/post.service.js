import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

export const postService = {
  async createPost(userId, title, content, thumbnail, categoryId) {
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

  async getAllPosts(categoryId,hashtag) {
    const whereCondition = {};

    if (categoryId) {
      whereCondition.categoryId = Number(categoryId);
    }
    
    if (hashtag) {
      // ค้นหา content ที่มี # ตามด้วยคำนั้น (Frontend ส่งมาโดยลบ '#' ออกแล้ว)
      whereCondition.content = {
        contains: `#${hashtag}`, 
        
      };
    }
   

    return await prisma.post.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { username: true, picture: true } },
        category: true,

        comments: {
          include: {
            user: true,
            likes: true,
          },
        },

        likes: true,
      },
    });
  },

  async deletePost(postId, userId, userRole) {
    const id = Number(postId);

    const foundPost = await prisma.post.findUnique({ where: { id } });

    if (!foundPost) throw createHttpError(404, "Data not found");

    const isOwner = foundPost.userId === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isOwner && !isAdmin) {
      throw createHttpError(403, "Cannot delete this post (Unauthorized)");
    }

    return await prisma.$transaction(async (tx) => {
      const postComments = await tx.comment.findMany({
        where: { postId: id },
        select: { id: true },
      });

      const commentIds = postComments.map((c) => c.id);

      if (commentIds.length > 0) {
        await tx.commentLike
          .deleteMany({
            where: { commentId: { in: commentIds } },
          })
          .catch(() => {});
      }

      await tx.comment.deleteMany({
        where: { postId: id },
      });

      await tx.postLike
        .deleteMany({
          where: { postId: id },
        })
        .catch(() => {});

      return await tx.post.delete({ where: { id } });
    });
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
