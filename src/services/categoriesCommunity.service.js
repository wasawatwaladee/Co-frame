import prisma from "../config/prisma.js";

export const categoriesService = {
  async getAllCategoriesService() {
    return await prisma.communityCategory.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
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
};
