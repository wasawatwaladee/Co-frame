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
    // const data2 = {}
    await prisma.communityCategory.create({ data });
    await prisma.movieCategory.create({ data });
    return {message: "Create category success" };
  },

  async getCategoriesBySlug() {
    return await prisma.communityCategory.findUnique({
      where: { slug },
    });
  },
};
