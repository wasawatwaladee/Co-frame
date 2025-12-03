import { getMovies, getMoviesById } from "../services/movie.service.js"

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