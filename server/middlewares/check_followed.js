const User = require("../modals/user.js")
module.exports = (req,res,next)=>{
    const follower_id=req.body.follower_id
    const following_id=req.body.following_id
    User.findOne({id:follower_id},(err,data)=>{
        if(err){
            console.log("sdfg");
            res.status(300).send({"done":"Already followed"})
        }
        else
        {
            let check =true
             data.following.map(item => {  
                if( item.id == following_id)check=false
            })
            if(check)next();
            else res.status(300).send({"done":"Already followed"})
        
        }
    })
    
}