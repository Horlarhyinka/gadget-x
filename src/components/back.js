import React from "react";
import { Link } from "react-router-dom";
import "./styles/back.css";
import { Icon } from '@iconify/react';

const Back = ({url}) => {
    return ( <Link to={url || "/"} className="back">
        <button><Icon icon="material-symbols:arrow-back-ios-new-rounded" />  Back</button>
    </Link> );
}
 
export default Back;