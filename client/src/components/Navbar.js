import { Link } from "react-router-dom";

 import "./Navbar.css"
const Navbar = ({ user ,set}) => {
  let css=0;

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  
  const search=()=>{
    if(document.getElementById("input").value)set("/users/"+document.getElementById("input").value)
    document.getElementById("input").value=""
  }

  const change=(e)=>{
    css=css+1;
    if(css%2===1 ) 
    { 
      const b=document.getElementById('lg')
         b.style.display="flex"  
    }
    else if(css!==0)
    {
      const b=document.getElementById('lg')
         b.style.display="none";    
    }
  }

  return (
    <div className="navbar" id="head" >
      <div className="logo">
        <Link className="link title" to="/">
          Instagram-clone
        </Link>
      </div >

      <div className="navbar2" id='lg'>
        <div  >
          <input className="link nav-input" type="text" placeholder="Search user" id="input" defaultValue=""  ></input>
        <Link to="/users" className="link" ><button type="button" className="link btn" onClick={search}>submit</button> </Link>
        </div>
        <div >
          <Link className="link" to="/all_posts" >
            All Posts
          </Link>
        </div>
        <div >
           <Link className="link" to="/following_posts" >
          My Following  post
          </Link>
        </div>
        <div >
          <Link className="link" to="/create-post" >
          Create Post
          </Link>
        </div> 
      
      {user ? (
      
        < ><div>
               <Link className="link" to={`/profile/${user.id}`} >
               <span><img src={user.pic} alt="" className="avatar" /></span> 
              <span id="user"> {user.username}</span></Link>
            </div>
            < div className="link" onClick={logout}>
            Logout
            </div>
        </>  
        ) 
        : 
        (
        <div >
            <Link className="link" to="login"onClick={change}>
              Login
            </Link>
        </div>

      )}
      </div>
            <button className="toggle" type="button" onClick={change} ><i className="material-icons ham">menu</i></button>       
      </div>
  );
};

export default Navbar;
