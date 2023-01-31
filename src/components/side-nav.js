import React from "react";
import "./styles/side-nav.css";
import close from "../assets/close.png";
import { Link } from "react-router-dom";
import {getMail, logOut} from "../functions/auth";
import AuthNav from "./auth-nav";
import { Icon } from "@iconify/react";

const SideNav = ({toggleNav}) => {
    const mail = getMail()
    const initial = mail?.slice(0,1)
    return ( <div className="side-nav">
        <div className="close"><img onClick={()=>toggleNav()} src={close} alt="close"/></div>
        {!mail?<AuthNav toggleNav={toggleNav} />:<div className="info">
            <div className="badge"><span>{initial}</span></div>
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
        <ul className="social" >
            <li><a href="https://twitter.com/DanijuFarouq?t=JrmLRy5UaAdVNTDGgP_1rg&s=09" ><Icon className="icn" icon="logos:twitter" /></a></li>
            <li><a href="https://web.facebook.com/farouq.daniju" ><Icon className="icn" icon="logos:facebook" /></a></li>
            <li><a href="https://www.linkedin.com/in/farouq-daniju-9440a2219" ><Icon icon="skill-icons:linkedin" /></a></li>
        </ul>
    </div> );
}
 
export default SideNav;