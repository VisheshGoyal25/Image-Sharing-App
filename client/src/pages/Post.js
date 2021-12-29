import React, { useState, useEffect } from "react";
import Card from "../components/Card.js"
import "./Post.css"
const Post = ({user,path}) => {
  const [data, setData] = useState([]);
  const [newdata,setNew]=useState(0);
  useEffect(() => {
    fetch(`http://localhost:5000/posts/${path}/${user.id}`, {
        
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          auth:user.auth,
        },
        method: "GET",
        credentials: "include",
        
      })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  },[path,newdata]);
  
   const likePost =(id)=>{
    fetch(`http://localhost:5000/posts/like_post`, {
        body:JSON.stringify({
           id,
           user_id:user.id,
           username:user.username
        }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        auth:user.auth,
      },
      method: "POST",
      credentials: "include",
      
    })
    .then((res) => res.json())
    .then((res) => {
      setNew((e)=>e+1);
    });
  }
  const unlikePost =(id)=>{
    fetch(`http://localhost:5000/posts/unlike_post`, {
        body:JSON.stringify({
           id,
           user_id:user.id,
           username:user.username
        }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        auth:user.auth,
      },
      method: "POST",
      credentials: "include",
      
    })
    .then((res) => res.json())
    .then((res) => {
      setNew((e)=>e+1);
    });
    
  }

   const makeComment =(id,comment)=>{
    fetch(`http://localhost:5000/posts/comment_post`, {
        body:JSON.stringify({
           id:id,
           user_id:user.id,
           username:user.username,
           comment:comment
        }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        auth:user.auth,
      },
      method: "POST",
      credentials: "include",
      
    })
    .then((res) => res.json())
    .then((res) => {
      setNew((e)=>e+1);
    });
   }
 
 

  return (
    <div className="home">
      
      {data.length?data.slice(0).reverse().map((item,index) => {
        return (
          
        <Card user={user} post={item} key={index} like={likePost} unlike={unlikePost} comment={makeComment} />
      )})
    :<h1 style={{fontSize:"4rem", marginTop:"30%",width:"100%", fontFamily:"cursive"}}>No Posts till yet...</h1>}
    </div>
  );
};
export default Post;
