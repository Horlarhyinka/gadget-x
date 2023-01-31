import React from "react";
import "./styles/nav-link.css";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import AuthNav from "./auth-nav";
import {logOut} from "../functions/auth";


const NavLink = ({authenticated}) => {
    return ( <div className="nav-link">
            <ul>
                <li><Link to={"/"} >Home</Link></li>
                <li><Link to={"/shop"} >shop</Link></li>
                <li><Link to={"/about"} >About us</Link></li>
            </ul>
            <div className="auth-nav">{!authenticated?<><AuthNav /></>:<div className="authenticated" >
                <Link to={"/cart"} ><Icon icon="mdi:cart-variant" className="icn" /></Link>
                <Link to={"/history"} ><Icon className="icn" icon="material-symbols:history-rounded" /></Link>
                <Icon className="icn logout" icon="icon-park-outline:logout" onClick={logOut} color="white" /></div>}</div>
    </div> );
}
 
export default NavLink;