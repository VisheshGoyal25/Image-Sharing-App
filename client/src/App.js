import Navbar from "./components/Navbar.js";
import Posts from "./pages/Post.js";
import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js"
import Create from "./pages/Create.js"
import User from "./pages/Users.js"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const App = () => {
  const [user, setUser] = useState(null);
   const [search,setSearch]=useState(null)
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          resObject.user.auth=resObject.auth;
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} set={setSearch}  />
       
        <Routes>
          <Route path="/" exact element={user ? <Posts  user={user} path="all_posts"/> : <Navigate to="/login" />} />
          
          <Route path="/users" exact element={search ? <Navigate to={`${search}`} /> : <Navigate to="/login" />} />
          <Route path="/login" exact element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/all_posts" exact element={user ? <Posts  user={user} path="all_posts"/>: <Navigate to="/" /> }/>
          <Route path="/users/:username" element={user ? <User  user={user} set={setSearch}/>: <Navigate to="/" /> }/>
          <Route path="/following_posts" element={user ?  <Posts  user={user} path="following_posts"/>:<Navigate to="/" /> }/>
          <Route path="/profile/:userid" element={user ?   <Profile user={user} />:<Navigate to="/" />}/>
          <Route path="/create-post" element={user ?   <Create user={user} toast={toast}/>:<Navigate to="/" />}/>
        </Routes>
      </div>
      
    </BrowserRouter>
  );
};

export default App;
