import React from "react";
import "./styles/header.css";
import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger.png"
import NavLink from "./nav-links";
import { getAuthToken } from "../functions/auth";


const Header = ({toggleNav}) => {
    let authenticated = getAuthToken()
    return ( <div className="header">
        <img className="logo" src={logo} alt={'logo'} />
        <NavLink authenticated={authenticated?true:false} />
        <img className="hamburger" onClick={()=>{toggleNav()}} src={hamburger} alt={"hamburger"} />
        </div> );
}
 
export default Header;