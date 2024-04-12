import logo from "../../assets/codepen.png";
import { FaBars } from "react-icons/fa";
import "./SideBar.css"
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
    let obj = props;
    let sidebaropen = obj.sidebaropen;
    let setSideBarOpen = obj.setSideBarOpen;
    let sideBarStyle = {
        transform : (sidebaropen) ? "translateX(0)" : "translateX(-100%)"
      }
      let sidebtnStyle = {
        opacity : (sidebaropen) ? "" : "1",
        transform : (sidebaropen) ? "" : "translateX(0)"
      }

  return (
    <div className="sidebar" style={sideBarStyle}>
          <div className="logo">
            <NavLink to={"/"}><img src={logo} alt="" /></NavLink>
          </div>
          <div className="button-title">
            <p className="title">TRY OUR ONLINE EDITOR</p>
            <NavLink to={"/pen"}><button>Start Coding</button></NavLink>
          </div>
          <div className="sidebtn" style={sidebtnStyle}  onClick={() => setSideBarOpen(!sidebaropen)}>
            <FaBars className="bar" />
            <svg viewBox="-122.9 121.1 105.9 61.9" width="8" height="8" className="arrow" style={{transform : (sidebaropen) ? "rotate(90deg)" : "rotate(270deg)"}}><path d="m-63.2 180.3 43.5-43.5c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.7-6.5c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.7L-69.9 161l-37.2-37.2c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.6c-1.9 1.8-2.8 4.2-2.8 6.6 0 2.3.9 4.6 2.6 6.5 11.4 11.5 41 41.2 43 43.3l.2.2c3.6 3.6 10.3 3.6 13.9 0z"></path></svg>
          </div>
        </div>
  )
}

export default Sidebar;