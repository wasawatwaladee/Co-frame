import prisma from "../config/prisma.js"

export const getMovies = async() => {
    const movies = await prisma.movie.findMany()
    return movies
}

export const getMoviesById = async(id)=>{
    const movie = await prisma.movie.findUnique({
        where:{id: Number(id)}
    })
    return movie
}