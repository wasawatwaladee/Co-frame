import { Router } from "express";
import getTrendingHashtags from "../controllers/trending.controller.js";


const trendRouter = Router();

trendRouter.get("/hashtags", getTrendingHashtags);

export default trendRouter;