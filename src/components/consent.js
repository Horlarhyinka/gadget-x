import React from "react";
import "./styles/consent.css"

const Consent = ({message, status}) =>{
    if(message){
        return <div className={"consent " + status}><p>{message}</p></div>
    }
}
 
export default Consent;