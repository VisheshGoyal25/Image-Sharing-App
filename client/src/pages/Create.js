import React, { useState, useEffect} from "react";
import "./create.css"


const Create=({user,toast})=>{
    
    const [url,setUrl]=useState(null)
    useEffect(()=>{
        // eslint-disable-next-line
        if(url){
        fetch("http://localhost:5000/posts/new_post",{
          body:JSON.stringify({
            "title":document.getElementById("title").value.slice(0,20),
            "desc":document.getElementById("body").value,
            "image":url,
            "owner_id":user.id,
            "name":user.username,
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
        .then(res=>res.json())
        
        .then(data=>{
          document.getElementById("button").innerHTML="Create";
          toast.success('Post Created Successfully', {autoClose:3000})
          setUrl(null);
          
          
         
      })
      .catch(err=>{
      
        setUrl(null);
        toast.error('Error while creating post', {
           autoClose:10000})
          document.getElementById("button").innerHTML="Create";
         
      })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[url])
const postDetails = () =>{
    document.getElementById("button").innerHTML="Creating"
    const data = new FormData()
       data.append("file",document.getElementById("create-img").files[0])
       data.append("upload_preset","instagram-clone")
       data.append("cloud_name","visheshg")
       fetch("https://api.cloudinary.com/v1_1/visheshg/image/upload",{
         method:"post",
         body:data
       })
       .then(res =>res.json())
       .then(data=>{
         setUrl(data.url)
       })
       .catch(err =>{console.log(err)})
  }

 const check=()=>{
      if(document.getElementById("title").value==="" ||document.getElementById("body").value==="" ||  (!(document.getElementById("create-img").files.length  )))
    {
      toast.warning('Please fill all the fields', {autoClose:10000})
    }
    else if(! document.getElementById("create-img").files[0].name.match("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$"))
    {
      toast.warning(' wrong file format', {autoClose:10000})
    }
    else{
      postDetails();
    }
 }
  return (
    <div className="create">
        <div className="post-head">Enter the Post Details</div>
        <input type="text" id="title" placeholder="Title (max 20 letters)" required></input>
        <input type="text" id="body" placeholder="Description" required></input>
        <div className="button-wrap">
        <label className="new-button" for="create-img"> Upload pic</label>
        <input type="file" id="create-img" required></input>
        </div>
        
        <p><button type="button" id="button" onClick={check}>Create</button></p>
      </div>
  );
};
export default Create;
