import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Sidebar from "../SideBar/SideBar.jsx";
import "./Outlet.css"
import { useState } from "react"

const Outlets = () => {
  const [sidebaropen , setSideBarOpen] = useState(true);
  
  return (
    <div className="main-container">
        <div className="sideBarBox">
          <Sidebar sidebaropen={sidebaropen} setSideBarOpen={setSideBarOpen} />
        </div>
        <div className="header-outlet" style={{marginLeft : (!sidebaropen) ? "0" : "" , width : (!sidebaropen) ? "100%" : ""}}>
            <div className="headerBox">
              <Header />
            </div>
            <div className="outlet">
              <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Outlets;