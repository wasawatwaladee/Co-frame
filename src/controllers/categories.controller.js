import { categoriesService } from "../services/categoriesCommunity.service.js";


export const categoriesController = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await categoriesService.getAllCategoriesService();
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  },

  createCategory: async (req, res, next) => {
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
};
