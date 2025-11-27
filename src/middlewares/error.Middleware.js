export default (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    const details = err.details || null
    

    res.status(statusCode).json({message,success:false})
}