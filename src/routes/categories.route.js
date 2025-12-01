import { Router } from "express";
import { categoriesController } from "../controllers/categories.controller.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", categoriesController.getAllCategories);

categoriesRoutes.post("/", categoriesController.createCategory);

export default categoriesRoutes;
