import React from "react";
import "./styles/header.css";
import logo from "../assets/logo.png";
import hamburger from "../assets/hamburger.png"
import NavLink from "./nav-links";
import { getAuthToken } from "../functions/auth";
import { Icon } from '@iconify/react';


const Header = ({toggleNav}) => {
    let authenticated = getAuthToken()
    return ( <div className="header">
        <img className="logo" src={logo} alt={'logo'} />
        <NavLink authenticated={authenticated?true:false} />
        {/* <img className="hamburger" onClick={()=>{toggleNav()}} src={hamburger} alt={"hamburger"} /> */}
        <Icon className="hamburger" onClick={()=>{toggleNav()}} icon="solar:hamburger-menu-linear" />
        </div> );
}
 
export default Header;