import { addMovie, deleteMovie, getMovies, getMoviesById, updateMovie } from "../services/movie.service.js"

export const listMovies = async (req, res,next) => {
    try {
        const movies =  await getMovies()
        res.json(movies)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const listMoviesById = async (req, res,next) => {
        const {id} = req.params;
    try {
        const movie = await getMoviesById(id)
        res.json(movie)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const createMovie = async (req, res, next) => {
    try {
        const movie = await addMovie(req.body)
        console.log('req.body', req.body)
        res.json(movie)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const updateMovieController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await updateMovie(id, req.body)
        res.json(movie)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const deleteMovieController = async (req, res, next) => {
     const { id } = req.params;
    try {
        const movie = await deleteMovie(id)
        res.json(movie)
    } catch (err) {
        console.log(err)
        next(err)
    }
}