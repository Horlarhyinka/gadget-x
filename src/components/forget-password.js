
import React from "react";
import { Link } from "react-router-dom";


const Forget = () => {
    return ( <Link to={"/forget-password"} style={{textDecoration:"none"}} className="forget">forget password</Link> );
}
 
export default Forget;