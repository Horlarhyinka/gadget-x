import React from "react";
import "./styles/nav-link.css";
import { Link } from "react-router-dom";

const AuthNav = ({toggleNav}) => {
    const  handleToggle = () =>toggleNav?toggleNav():{}
    return ( <div className="auth-nav"><Link to={"/auth"} ><button className="login" onClick={()=>handleToggle()} >login</button></Link><Link to={"/auth"} ><button className="register" onClick={()=>handleToggle()} >register</button></Link></div> );
}

export default AuthNav;