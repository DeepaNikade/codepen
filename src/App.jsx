import React, { useContext, useEffect } from "react";
import { RouterProvider ,createBrowserRouter  } from "react-router-dom";
import Home from "./Components/Home/Home";
import Editor from "./Components/Editor/Editor";
import Login from "./Components/LoginAndSignUp/Login/Login";
import SignUp from "./Components/LoginAndSignUp/SignUp/Signup";
import Loader from "./Components/Loader";
import UserContext from "./Context/Context";
import Outlets from "./Components/Outlet/Outlet";

function App() {
  
  const { loader = false, setLoader } = useContext(UserContext);

  useEffect(() => {
    setInterval(() => {
      setLoader(false);
    } , 2000)

  } , [])
  
 let router = createBrowserRouter([
  {
    path : "/",
    element : <Outlets />,
    children : [
      {
        path : "/",
        element : <Home />
      },
      {
        path : "/auth/login",
        element : <Login />
      },
      {
        path : "/auth/signup",
        element : <SignUp />
      }
    ]
  },
  {
    path : "/pen",
    element : <Editor />
  }
 ])
  return (
    (loader) ? 
    <div style={{height : "100vh" , width : "100vw" , display : "flex" , justifyContent : "center" , alignItems : "center", backgroundColor : "hsl(225deg 9.52% 8.24%)"}}>
      <Loader />
    </div>
    : 
     
        <RouterProvider router={router} />
      
  )
}

export default App;