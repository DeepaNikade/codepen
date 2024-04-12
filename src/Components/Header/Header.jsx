import { NavLink, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Header.css"
import { useContext, useState } from "react";
import UserContext from "../../Context/Context"
import {  signOut } from "firebase/auth";
// import { auth } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [dropdown , setDropDown] = useState(false)
    const [logoutDropdown , setLogoutDropdown] = useState(false)
    const {isLoggedIn , userData} = useContext(UserContext);
    const {setIsLoggedIn , toast , setLoader , setUserData , setPenData , search , setSearch} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    let signupStyle = {
        display : (location.pathname === "/auth/signup") ? "none" : ""
    }
    let loginStyle = {
        display : (location.pathname === "/auth/login") ? "none" : ""
    }
    
    let logout = async () => {
        try{
            await signOut(auth);
            setIsLoggedIn(false)
            toast.success("Logged Out Successfully")
            setUserData([])
            setLoader(true);
            setPenData([])
            navigate("/" , {replace : true});
        } catch(error){
            console.log(error);
        }
    }
    
    
  return (
    <div className="header">
        <div className="small-screen-logo">
            <NavLink to={"/"}>
                <svg viewBox="0 0 100 100"><path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8 19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path></svg>
            </NavLink>
        </div>
        <div className="small-screen-dropdown">
            <div className="dropdown-button" onClick={() => setDropDown(!dropdown)}>
                <FaBars className="bar" />
                <svg viewBox="-122.9 121.1 105.9 61.9" width="12" height="12" fill="white" style={{transform : (dropdown) ? "rotate(180deg)" : ""}}><path d="m-63.2 180.3 43.5-43.5c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.7-6.5c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.7L-69.9 161l-37.2-37.2c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.6c-1.9 1.8-2.8 4.2-2.8 6.6 0 2.3.9 4.6 2.6 6.5 11.4 11.5 41 41.2 43 43.3l.2.2c3.6 3.6 10.3 3.6 13.9 0z"></path></svg>
            </div>
            <div className="dropdown" style={{opacity : (dropdown) ? "1" : "0"}} >
                <p className="title">TRY EDITOR</p>
                <NavLink to={"/pen"}><button>Start Coding</button></NavLink>
            </div>
        </div>
        <div className="input">
            <svg viewBox="0 0 56.7 56.7" fill="hsl(228.39deg 12.25% 50.39%)" height={20} width={20}><path d="M42.8 7.3C33-2.4 17.1-2.4 7.3 7.3c-9.8 9.8-9.8 25.7 0 35.5 8.7 8.7 22.2 9.7 32 2.9l9.6 9.6c1.8 1.8 4.7 1.8 6.4 0 1.8-1.8 1.8-4.7 0-6.4l-9.6-9.6c6.8-9.8 5.8-23.3-2.9-32zm-6.2 29.3c-6.4 6.4-16.7 6.4-23.1 0s-6.4-16.7 0-23.1c6.4-6.4 16.7-6.4 23.1 0 6.4 6.4 6.4 16.8 0 23.1z"></path></svg>
            <input type="text" value={search} placeholder="Search here..." onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="buttons" style={{display : (isLoggedIn) ? "none" : ""}}>
            <div className="signup" style={signupStyle} >
                <NavLink to={"/auth/signup"}><button>Sign Up</button></NavLink>
            </div>

            <div className="login" style={loginStyle} >
                <NavLink to={"/auth/login"}><button>Log In</button></NavLink>
            </div>
        </div>
        <div className="afterlogin" style={{display : (!isLoggedIn) ? "none" : ""}}>
            <div className="userImage">
                {
                    userData.length ?
                    userData[0].photoURL ? 
                    <img src={userData[0].photoURL} alt="" />
                    :
                    <div className="alternate">
                        {
                            userData[0].displayName ? <p>{userData[0].displayName[0].toUpperCase()}</p> : <p>{userData[0].name[0].toUpperCase()}</p>
                        }
                    </div>
                    : ""
                }
            </div>
            <div className="signoutdropdown" onClick={() => setLogoutDropdown(!logoutDropdown)}>
                <div className="icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" style={{transform : (logoutDropdown) ? "rotate(180deg)" : ""}} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                </div>
                <div className="logoutdropdown" style={{opacity : (logoutDropdown) ? "1" : ""}}>
                    {
                        userData.length ? userData[0].displayName ? 
                        userData[0].displayName.length > 14 ?
                        <p>Hi, {userData[0].displayName.slice(0,14)}....</p>
                        : <p>Hi, {userData[0].displayName}</p>
                        : userData[0].name.length > 14 ?
                        <p>Hi, {userData[0].name.slice(0,14)}....</p>
                        : <p>Hi, {userData[0].name}</p>
                        :""
                    }
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header;

