export default (req,res)=>{
    res.status(404).json({
        message : `request not found ${req.method}/${req.url}this server`
    })
}