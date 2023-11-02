import React from "react";
import "./styles/side-nav.css";
import close from "../assets/close.png";
import { Link } from "react-router-dom";
import {getMail, logOut} from "../functions/auth";
import AuthNav from "./auth-nav";
import { Icon } from "@iconify/react";
import Badge from "./badge";
import Social from "./social";

const SideNav = ({toggleNav}) => {
    const mail = getMail()
    const initial = mail?.slice(0,1)
    return ( <div className="side-nav">
        <div className="close">
        <Icon icon="system-uicons:close" className="icn" onClick={()=>toggleNav()} />
        </div>
        {!mail?<AuthNav toggleNav={toggleNav} />:<div className="info">
            <Badge initial={initial} />
            <p className="mail">{mail}</p>
            <button onClick={()=>{logOut()}}>logout</button>
        </div>}
        <ul>
        <li><Link className="a" onClick={()=>toggleNav()} to="/" >Home</Link></li>
        <li><Link className="a" onClick={()=>toggleNav()} to="/shop">shop</Link></li>
        <li><Link className="a" onClick={()=>toggleNav()} to={"/about"} >About us</Link></li>
        <li><Link className="a" onClick={()=>toggleNav()} to="/cart">cart</Link></li>
        <li><Link className="a" onClick={()=>toggleNav()} to="/history">history</Link></li>
        </ul>
        <Social/>
    </div> );
}
 
export default SideNav;