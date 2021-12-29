const express=require('express');
const router=express.Router();
const User=require("../modals/user.js")
const check_followed=require("../middlewares/check_followed.js")
const check_unfollowed=require("../middlewares/check_unfollowed.js")
const check_authentication=require("../middlewares/check_authentication.js")
router.get('/all_users',check_authentication,(req,res)=>{
    try{
         User.find({},(err,data)=>{
            if (err){
                res.status(500).send({"done":"failed"})
            }else{
             res.status(200).json(data)
            }
         })
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})
router.get('/profile/:id',check_authentication,(req,res)=>{
    try{
    User.findOne ({id: req.params.id},(err,data)=>{
        if (err){
            res.status(500).send({"done":"failed"})
        }else{
         res.status(200).json(data)
        }
    })
   }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})
router.post ('/follow',check_authentication,check_followed,(req,res)=>{
    try{
    User.findOneAndUpdate({id:req.body.follower_id},
        {$push: {following: {id:req.body.following_id,username:req.body.following_username}},
        $inc: { following_count: 1 }},
        function(err, doc) {
            if(err){
                res.status(500).send({"done":"failed"})
            }else{
           
                User.findOneAndUpdate({id:req.body.following_id},
                {$push: {followers: {id:req.body.follower_id,username:req.body.follower_username}},$inc: { followers_count: 1 }},

                function(err, doc) {
                    if(err){
                        res.status(500).send({"done":"failed"})
                    }else{
                    res.status(200).send({"done":"Successful"})
                    }
                }
                );
           }
         }
      );
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
});


router.post('/unfollow',check_authentication,check_unfollowed,(req,res)=>{
    User.findOneAndUpdate({id:req.body.follower_id},
        {$pull: {following: {id:req.body.following_id,username:req.body.following_username}},$inc: { following_count: -1 }},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                res.status(500).send({"done":"failed"})
            }else{
                User.findOneAndUpdate({id:req.body.following_id},
                    {$pull: {followers: {id:req.body.follower_id,username:req.body.follower_username}},$inc: { followers_count: -1 }},
                    {safe: true, upsert: true},
                    function(err, doc) {
                        if(err){
                            res.status(500).send({"done":"failed"})
                        }else{
                        //do stuff
                        res.status(200).send({"done":"Successful"})
                        }
                    }
                );
            
            }
        }
    );
    
})

router.put ('/update_pic',check_authentication,(req,res)=>{
    try{
    User.findOneAndUpdate({id:req.body.id},
        {$set:{pic:req.body.pic}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                res.status(500).send({"done":"failed"})
            }else{
            //do stuff
            res.status(200).send({"done":"Successful"})
            }
        }
    );
    }
    catch(err){
        res.status(500).send({"done":"failed"})
    }
})

router.get('/:username',check_authentication,(req,res)=>{
    try{
         let user=(req.params.username).replace(/\b\w/g, l => l.toUpperCase())
       
    User.find({username: user},(err,data)=>{
        if (err){
            res.status(500).send({"done":"failed"})
        }else{
           
         res.status(200).json(data)
        }
    })
   }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})
module.exports=router;