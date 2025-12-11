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
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      await categoriesService.deleteCategory(id);

      res.status(200).json({
        message: "Delete category success",
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, slug } = req.body;

      // เรียก Service
      const result = await categoriesService.updateCategoriesService(id, {
        name,
        description,
        slug,
      });

      res.status(200).json({
        message: "Update category success",
        category: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
