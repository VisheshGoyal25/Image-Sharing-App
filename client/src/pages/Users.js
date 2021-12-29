import React, { useState, useEffect} from "react";
import "./user.css"
import {useParams} from 'react-router-dom'
import {Link} from "react-router-dom"
const Users=({user,set})=>{
   
    const [users,setUsers]=useState([])
    const {username} = useParams()
    useEffect(() => {
       set(null)
      fetch(`http://localhost:5000/user/${username}`, {
          
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
          setUsers(res);
        });
    },[]);
  return (
    <div >
       {users.length?
       <div className="all-users">
       {users.map(user=>{
       return <div className="user-head" key={user.id}>
         
         <div>
              <img className="users-img" src={user.pic} alt="No Pic available"  />
          </div>
                
                <div>
                <Link to={`/profile/${user.id}`} className="name"> <div >{user.username}</div></Link>
                    <br/>
                    <div style = {{display:"flex",justifyContent:"space-between",width:"100%"}}>
                        <p className="p-tag">{user.followers.length} followers</p>
                        <p className="p-tag">{user.following.length} following</p>
                    </div>
                    </div>
         
        
        </div>
        
      })})
      </div>
      
      : <div style={{fontSize:"4rem"}}>No User found</div>}
      </div>
  );
};
export default Users;

