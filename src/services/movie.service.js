import prisma from "../config/prisma.js"

export const getMovies = async() => {
    const movies = await prisma.movie.findMany({
        include:{
            category:true
        }
    })

    return movies
}

export const getMoviesById = async(id)=>{
    const movie = await prisma.movie.findUnique({
        where:{id: Number(id)},
        
        include:{
            category:true
        }
    })
    return movie
}

export const addMovie = async(data)=>{
    const movie = await prisma.movie.create({
       data:{
        title: data.title,
        description: data.description,
        thumbnail: data?.thumbnail ,
        poster: data?.poster,
        videoUrl: data.videoUrl,
        duration: data?.duration ? Number(data.duration) : null,
        categoryId: Number(data.categoryId)

       }
    })
    return movie
}

export const deleteMovie = async(id)=>{
    const movie = await prisma.movie.delete({
        where:{id: Number(id)}
        
        
    })
    return movie
}

export const updateMovie = async(id, data)=>{
    const movie = await prisma.movie.update({
        where: { id: Number(id) },
        data:{
            title: data.title,
            description: data.description,
            thumbnail: data?.thumbnail,
            videoUrl: data.videoUrl,
            duration: data.duration ? Number(data.duration) : null,
            poster: data.poster, 
            categoryId: Number(data.categoryId)
        }
    })
    return movie
}