import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom";
import "./styles/auth.css";
import Consent from "../components/consent";
import Back from "../components/back";

const ResetPassword = () =>{

    const {token } = useParams()
    const queryUrl = process.env.REACT_APP_API_BASE_URL + "auth/forget-password/"+token;

    const {useState, useEffect} = React; 
    const [status,setStatus] = useState()
    const [resetStatus,setResetStatus] = useState()
    const [message, setMessage] = useState();
    const passRef = React.createRef()
    const confirmPassRef = React.createRef()
    useEffect(()=>{
    axios.get(queryUrl).then((res)=>{
        setStatus(res?.status)
    }).catch(({response})=>{
        setStatus(response?.status)
    })
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
         const body = {password:passRef.current.value, confirmPassword:confirmPassRef.current.value}
         if(body.password !== body.confirmPassword){
            setMessage("password and confirm password must match")
            setResetStatus("failed")
            return;
         }
        const res = await axios.patch(queryUrl,{...body})   
        if(res) setResetStatus("success")
        if(res.data._kind?.toLowerCase() == "admin"){
            return window.location.assign("/admin/auth")
        }
        return window.location.assign("/auth")
        } catch (error) {
            setMessage()
            setResetStatus("failed")
        }
        
        
    }

    function ResetForm(){
        return <>
        <Back url={"/forget-password"} />
        {resetStatus && (resetStatus?.toLowerCase()=="success"?<Consent message={"password updated successfully"} status={"success"} />:<Consent message={message||"could not update password"} status={"failed"} />)}
        <form>
            <p className="write-up">password should be strong and easy to remember</p>
            <label>password</label>
            <input ref={passRef} type={"password"} id="password" />
            <label>confirm password</label>
            <input type={"password"} ref={confirmPassRef} id="confirmPassword" />
            <button onClick={(e)=>{handleSubmit(e)}} >submit</button>
        </form>
        </>
    }

    if(status == 200){
        return <div className="auth"><ResetForm /></div>
    }else if(!status){
        return <h1>validating token</h1>
    }else{
        setTimeout(window.location.assign("/forget-password"),5000)
        return <h1>error ocurred, kindly request a new token.</h1>
    }

}

export default ResetPassword;