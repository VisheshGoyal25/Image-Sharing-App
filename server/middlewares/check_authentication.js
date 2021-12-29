
module.exports = (req,res,next)=>{
    if(req.headers.cookie==undefined ||req.headers.auth!=req.headers.cookie)
    res.status(401).send({"done":"Not Authorised"})
    else
    next();
}