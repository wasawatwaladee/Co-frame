import { Router } from "express";
import { listMovies, listMoviesById } from "../controllers/movie.controller.js";

const movieRouter = Router();

movieRouter.get("/", listMovies);
movieRouter.get('/:id',listMoviesById)



export default movieRouter;