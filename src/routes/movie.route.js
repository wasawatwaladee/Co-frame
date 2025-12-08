import { Router } from "express";
import { createMovie, deleteMovieController, listMovies, listMoviesById,  updateMovieController } from "../controllers/movie.controller.js";

const movieRouter = Router();

movieRouter.get("/", listMovies);
movieRouter.get("/:id", listMoviesById);
movieRouter.post("/", createMovie);
movieRouter.put("/:id", updateMovieController); 
movieRouter.delete("/:id", deleteMovieController);

export default movieRouter;
