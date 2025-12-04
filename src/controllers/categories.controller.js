import { categoriesService } from "../services/categoriesCommunity.service.js";


export const categoriesController = {
  async getAllCategories(req, res, next) {
    try {
      const categories = await categoriesService.getAllCategoriesService();
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  },

  async createCategory(req, res, next) {
    try {
      const { name, description, slug } = req.body;

      const result = await categoriesService.createCategoriesService(
        name,
        description,
        slug
      );

      res.status(201).json({
        message: "Create category success",
        result,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteCategory(categoryId) {
    const foundCategory = await prisma.communityCategory.findUnique({
      where: { id: categoryId },
      include: { _count: { select: { posts: true } } },
    });

    if (!foundCategory) {
      throw createHttpError(404, "Category not found");
    }

    // 2. (Optional) ป้องกันการลบ ถ้ายังมี Post อยู่ในหมวดนี้
    // ถ้าลบหมวดนี้ Post ที่อยู่ข้างในจะไม่มีที่อยู่ (หรือ Error FK Constraint)
    if (foundCategory._count.posts > 0) {
      throw createHttpError(
        400,
        "Cannot delete category with existing posts. Please move or delete posts first."
      );
    }

    return await prisma.communityCategory.delete({
      where: { id: categoryId },
    });
  },
};
