const express=require('express');
const check_authentication = require('../middlewares/check_authentication.js');
const router=express.Router();
const Post=require("../modals/post.js")
const User=require("../modals/user.js")
router.post("/new_post",check_authentication,(req,res)=>{
   
    const new_post=new Post({
        title:req.body.title,
        desc:req.body.desc,
        image:req.body.image,
        likes:[],
        likes_count:0,
        comments:[],
        owner_id:req.body.owner_id,
        name:req.body.name

    })
    
    new_post.save((err, doc) => {
        if (!err)
            res.status(200).json(doc)
        else
        {
            res.status(500).send({"done":"failed"})
        }
        });
})

router.get('/all_posts/:id',check_authentication,(req,res)=>{
    try{
         Post.find({},(err,data)=>{
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

router.get('/myposts/:id',check_authentication,(req,res)=>{
    try{
     Post.find({owner_id: req.params.id},(err,data)=>{
         if(err)
         {  
            res.status(500).send({"done":"failed"}) 
         }
         else
         {
             
            res.status(200).json(data)
         }
         
     })
   
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})

router.get('/following_posts/:id',check_authentication,(req,res)=>{
    try{
       
    User.findOne({id: req.params.id},(err,data)=>{
        if(err)
        {  
            res.status(500).send({"done":"failed"}) 
        }
        else
        {
            
            const arr=data.following.map(item=>{return item.id})
             Post.find( { owner_id: { $in: arr } }, (err,doc)=>{
                 if(err){
                     
                    res.status(500).send({"done":"failed"})
                 }
                 else{
                 res.status(200).json(doc)
                 }
             } )
            
            
        }
    })
    
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})

router.delete('/delete_post/:id',check_authentication,(req,res)=>{
    try{
     Post.findOneAndRemove({_id: req.params.id},(err,data)=>{
         if(err)res.status(500).send({"done":"failed"})
         else
         res.status(200).json(data)

     })
   
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})

router.post('/like_post',check_authentication,(req,res)=>{
    try{
       
        Post.findOneAndUpdate({_id:req.body.id},
            {$push:{likes: {id:req.body.user_id,username:req.body.username}},$inc: { likes_count: 1 }},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                    res.status(500).send({"done":"failed"})
                }else{
                //do stuff
                res.status(200).send({"status":"Successful"})
                }
            }
        );
    
    }
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})


router.post('/unlike_post',check_authentication,(req,res)=>{
    try{
       
        Post.findOneAndUpdate({_id:req.body.id},
            {$pull: {likes: {id:req.body.user_id,username:req.body.username}},$inc: { likes_count: -1 }},
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
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})
router.post('/comment_post',check_authentication,(req,res)=>{
    try{
       
        Post.findOneAndUpdate({_id:req.body.id},
            {$push: {comments: {user_id:req.body.user_id,username:req.body.username,body:req.body.comment}}},
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
    catch(err)
    {
        res.status(500).send({"done":"failed"})
    }
})
module.exports=router