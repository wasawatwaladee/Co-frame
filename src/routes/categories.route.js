import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller.js";
import adminMiddleware from "../middlewares/admin.Middleware.js";
import authMiddleware from "../middlewares/auth.Middleware.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", categoriesController.getAllCategories);
categoriesRoutes.post("/", categoriesController.createCategory);
categoriesRoutes.put("/", categoriesController.updateCategory);
categoriesRoutes.delete(
  "/:id",
  authMiddleware,
  categoriesController.deleteCategory
);

export default categoriesRoutes;
