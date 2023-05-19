const notFound=(req,res)=>{
    return res.status(404).send("Route do not exit")
}

module.exports=notFound