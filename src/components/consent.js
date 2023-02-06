import React from "react";
import "./styles/consent.css"

const Consent = ({message, status, controller}) =>{
    setTimeout(()=>{
        controller()
    },5000)
    if(message && status){
        return <div className={"consent " + status}><p>{message}</p></div>
    }
}
 
export default Consent;