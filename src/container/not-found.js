import React from "react";
import { Link } from "react-router-dom";
import "./styles/not-found.css"


class NotFound extends React.Component{
    render(){
        return(<div className="not-found">
            <h1>404</h1>
            <p>Oops, page not found.</p>
            <Link to={"/"}>Go to homepage</Link>
        </div>)
    }
}

export default NotFound;