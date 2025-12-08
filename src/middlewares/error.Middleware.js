export default (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.status || err.statusCode || 500
    const message = err.message || "Internal server error"
    const details = err.details || null

    if (err.name === 'ZodError') {
        return res.status(400).json({ 
            message: 'Validation Failed', 
            details: err.errors 
        });
    }

    res.status(status).json({
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} 
    });

    res.status(statusCode).json({message,success:false})
}