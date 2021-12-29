import React, {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import "./profile.css"
const Profile= ({user}) =>{
    const [userProfile,setProfile] = useState(null);
    const [posts,setPosts] = useState([]);
    const {userid} = useParams()
    const [showfollow,setShowFollow]=useState(true);
    const [delcount,setDelete]=useState(0)
    useEffect(()=>{
        
        fetch(`http://localhost:5000/user/profile/${userid}`,{
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            auth:user.auth,
          },
          method: "GET",
          credentials: "include",
        })
        .then(res=>res.json())
        .then(res=>{
            setProfile(res)
            let state=true;
            res.followers.map(e=>{if(e.id===user.id)state=false})
            setShowFollow(state);
        })
        .catch(err=>{
            console.log(err)
        })
    },[userid,showfollow])
    useEffect(()=>{
      fetch(`http://localhost:5000/posts/myposts/${userid}`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          auth:user.auth,
        },
        method: "GET",
        credentials: "include",
      })
      .then(res=>res.json())
      .then(res=>{
          
          setPosts(res)
      },[delcount])
      .catch(err=>{
          console.log(err)
      })
  },[delcount])
    const followUser = ()=>{
        fetch("http://localhost:5000/user/follow",{
           
            body:JSON.stringify({
                follower_id:user.id,
                follower_username:user.username,
                following_id:userid,
                following_username:userProfile.username,
            }),
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                 auth:user.auth,
            },
            method:"POST",
        credentials: "include",
        }).then(res=>res.json())
        .then(data=>{
             setShowFollow(false)
        })
     }
     const unfollowUser = ()=>{
        fetch('http://localhost:5000/user/unfollow',{
           
            body:JSON.stringify({
                follower_id:user.id,
                follower_username:user.username,
                following_id:userid,
                following_username:userProfile.username,
            }),
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                 auth:user.auth,
            },
            method:"POST",
            credentials: "include",
        }).then(res=>res.json())
        .then(data=>{
             setShowFollow(true)
        })
     }

     const deletePost = (id)=>{
         
        fetch(`http://localhost:5000/posts/delete_post/${id}`, {
            
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            auth:user.auth,
          },
          method: "DELETE",
          credentials: "include",
          
        })
        .then((res) => res.json())
        .then((res) => {
         
            setDelete(e=>e+1)
        });
       }
    return(
        <>
        {userProfile? 
            <div style = {{maxWidth:"800px",margin:"0px auto"}}>
            <div style = {{
            display: "flex",
            margin:"18px 0px",
            justifyContent:"space-around",
            borderBottom:"2px solid grey"
            }}>
                <div>
                    <img 
                    style = {{width:"10vw",height:"10vw",borderRadius:"50%", minWidth:"100px",minHeight:"100px"}}
                    src={userProfile.pic} alt="Profile"
                     />
                </div>
                
                <div>
                    <h1>{userProfile.username}</h1>
                    <br/>
                    <div style = {{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h2>{userProfile.followers.length} followers</h2>
                        <h2>{userProfile.following.length} following</h2>
                    </div>
                    <br/>
                    {userid!==user.id?
                        showfollow ?
                        <div>
                        <button style={{width:"40%",height:"30px",backgroundColor:"lightgreen", borderRadius:"10px",marginLeft:"20%"}}
                        onClick = {()=>followUser()} >Follow</button>
                        </div>
                        :
                        <div>
                        <button style={{width:"40%",height:"30px",backgroundColor:"lightgreen", borderRadius:"10px",marginLeft:"20%"}}
                        onClick = {()=>unfollowUser()} >Unfollow</button>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        
        <div className = "profile-posts">
        {
            posts.length?posts.map(item=>{
                return  <div key ={item._id} className="post-item-head">
                           <div>
                                <img  className="item" src={item.image} alt ={item.title}/>
                                
                            {userid===user.id?<i onClick={()=>deletePost(item._id)}className="delete-post fas fa-trash fa-2x"></i>:<></>}
                            </div>
                            
                           
                            <span >( {item.likes_count} Likes)</span>
                        </div>
            }):
            <h1> No Posts till now</h1>
        }
        </div>
        </div>
         :<h2>loading</h2>}
        </>
    )
}
export default Profile;