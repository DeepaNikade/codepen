import { useState } from 'react'
import UserContext from './Context'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Userprovidercontext = ({ children }) => {
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [loader , setLoader] = useState(true);
    const [search , setSearch] = useState("")
    const [userData , setUserData] = useState([]);
    const [penData , setPenData] = useState([])
  return (
    <UserContext.Provider value={{isLoggedIn , setIsLoggedIn , toast , loader , setLoader , userData , setUserData , penData , setPenData , search , setSearch}}>
        {children}
        <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            bodyClassName= "toastbody"
        />
   </UserContext.Provider>
  )
}

export default Userprovidercontext;