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
    return await prisma.communityCategory.create({ data });
  },

  async getCategoriesBySlug() {
    return await prisma.communityCategory.findUnique({
      where: { slug },
    });
  },
};
