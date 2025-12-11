import prisma from "../config/prisma.js";
import createHttpError from "http-errors";

export const categoriesService = {
  async getAllCategoriesService() {
    return await prisma.communityCategory.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        slug: true,
        _count: {
          select: { posts: true },
        },
      },
    });
  },

  async createCategoriesService(name, description, slug) {
    const data = { name, description, slug };
    const data2 = { name, description };

    const result1 = await prisma.communityCategory.create({ data });
    const result2 = await prisma.movieCategory.create({ data: data2 });
    return result1, result2;
  },

  async getCategoriesBySlug() {
    return await prisma.communityCategory.findUnique({
      where: { slug },
    });
  },

  async deleteCategory(categoryId) {
    const id = Number(categoryId);
    if (isNaN(id)) throw createHttpError(400, "Invalid Category ID");

    const foundCategory = await prisma.communityCategory.findUnique({
      where: { id: id },
    });

    if (!foundCategory) {
      throw createHttpError(404, "Category not found");
    }

    return await prisma.$transaction(async (tx) => {
      const posts = await tx.post.findMany({
        where: { categoryId: id },
        select: { id: true },
      });
      const postIds = posts.map((p) => p.id);

      if (postIds.length > 0) {
        const comments = await tx.comment.findMany({
          where: { postId: { in: postIds } },
          select: { id: true },
        });
        const commentIds = comments.map((c) => c.id);

        if (commentIds.length > 0) {
          await tx.commentLike
            .deleteMany({
              where: { commentId: { in: commentIds } },
            })
            .catch(() => {}); // ใส่ catch กันไว้เผื่อไม่มีตารางนี้ หรือชื่อผิด
        }

        await tx.comment.deleteMany({
          where: { postId: { in: postIds } },
        });

        await tx.postLike
          .deleteMany({
            where: { postId: { in: postIds } },
          })
          .catch(() => {});

        await tx.post.deleteMany({
          where: { categoryId: id },
        });
      }

      return await tx.communityCategory.delete({
        where: { id: id },
      });
    });
  },

  async updateCategoriesService(categoryId, updateData) {
    const id = Number(categoryId);
    if (isNaN(id)) {
      throw createHttpError(400, "Invalid Category ID");
    }

    const foundCategory = await prisma.communityCategory.findUnique({
      where: { id: id },
    });

    if (!foundCategory) {
      throw createHttpError(404, "Category not found");
    }

    const { name, description, slug } = updateData;

    return await prisma.communityCategory.update({
      where: { id: id },
      data: {
        name,
        description,
        slug,
      },
    });
  },
};
