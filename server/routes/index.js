const express=require('express');
const router=express.Router();
const Login=require("./login.js")
const User_route=require("./user.js")
const Post_route=require("./post.js")
const passport=require("passport")
const cookieSession = require("cookie-session");
require("dotenv").config()

router.use(
  cookieSession({ name: "session", keys: [process.env.SESSION_KEY], maxAge: 24 * 60 * 60 * 100 })
);
router.use(passport.initialize());
router.use(passport.session());
router.use('/auth',Login)
router.use('/user',User_route)
router.use('/posts',Post_route)
module.exports=router;