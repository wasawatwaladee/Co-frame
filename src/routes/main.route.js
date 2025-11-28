import { Router } from "express";
import authRouter from "./auth.route.js";
import { authLimiter } from "src/middlewares/rateLimiter.middleware.js";

const mainRouter = Router();

mainRouter.use('/auth', authLimiter, authRouter)


export default mainRouter;