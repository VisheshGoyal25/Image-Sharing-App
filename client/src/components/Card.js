import { Link } from "react-router-dom";
import {useState,useEffect} from "react"
import "./Card.css"

const check=(post,comment)=>{
  if(document.getElementById(post._id).value===""){
  
  }
  else
  comment(post._id,document.getElementById(post._id).value)
  document.getElementById(post._id).value=""
}

const Card = ({ user,post,like,unlike,comment }) => {
  const [isLiked,setLike]=useState(false);
  useEffect(()=>{
    setLike(false)
    post.likes.map((e)=>{if(e.id===user.id)setLike(true)})
    
  })
  return (
    <div className="card">
      <Link to={`/profile/${post.owner_id}`} className="card-head">Posted By: <p className="Card-user"> {post.name}</p> </Link>
        <img src={post.image} alt="" className="img" />
        {!isLiked?<i onClick={()=>{like(post._id)}} className="far fa-thumbs-up fa-2x thumb"></i>:<i className="fas fa-thumbs-up fa-2x thumb" onClick={()=>{unlike(post._id)}}></i>}

        <p className="Card-title" id="title">{post.title} (  {post.likes_count} Likes )</p><br/>
        <div className="desc" id="desc">{post.desc}</div>
        <input className="card-input" id={post._id} placeholder="Comment here..."></input><button className="cardButton" onClick={()=>check(post,comment)}>Comment</button>


        

        {post.comments.length?<div className="post-comments">
          <div style={{width:"97%",height:"auto",borderBottom:"solid", borderWidth:"0.5px",marginTop:"10px",fontWeight:"bold",fontSize:"1.3rem"}}>Recent Comments</div>
          {post.comments.slice(0).reverse().map((item,index)=>{
           return <div key={index} style={{width:"93%",height:"auto",borderBottom:"solid", borderWidth:"0.5px",marginTop:"20px", padding:"20px",borderRadius:"10px",backgroundColor:"rgb(242, 242, 242)"}}>
              <Link to={`/profile/${item.user_id}`} className="card-head"> <p  className="comment-user"> {item.username}:</p> </Link>
              <span className="desc">{item.body}</span>
              </div>
          })}
         </div>:
        <></>
        }
    </div>
  );
};

export default Card;
