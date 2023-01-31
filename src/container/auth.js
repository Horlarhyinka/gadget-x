import React from "react";
import "./styles/auth.css";
import axios from "axios";
import { getAuthToken, setAuthToken } from "../functions/auth";
import Forget from "../components/forget-password";
import Consent from "../components/consent";
import Back from "../components/back";

const queryUrl = process.env.REACT_APP_API_BASE_URL+"auth/"
class Authenticate extends React.Component {
    state = { 
        status:"login",
        email:"",
        password:"",
        error:false,
        errorMessage:null
     } 
     handleField = (e) =>{
        const field =e.target.id
        return this.setState({[field]:e.target.value})
     }
    queryUrl = queryUrl + this.state.status
    handleStatus = () =>{
        this.state.status==="login"?this.setState({status:"register"}):this.setState({status:"login"})
    }
    handleSubmit = async(e)=>{
        e.preventDefault()
        const url = queryUrl+this.state.status;
        axios.post(url,{email:this.state.email,password:this.state.password}).then(res=>{
            const {data,token} = res.data
            if(!token)return console.log("could not get token")
            setAuthToken(token, data?.email)
            const pathName=window.location.pathname
            pathName!=="/auth"?window.location.assign(pathName):window.location.assign("/")
        }).catch((err)=>{
            const message = err.response.data.message
            this.setState({errorMessage:message,error:true})
            
        })
    }
    
    render() { 
        return (<div className="auth" >
            <Back url={"/"} />
            {this.state.error && (<Consent message={this.state.errorMessage || "authentication error"} status={"failed"} />)}
            <form className="auth-form">
                <p className="write-up">we provide you with thrilling shopping experience. We care more about your comfort.</p>
            <p className="form-status">{this.state.status}</p>
            <label htmlFor="email">
                Email
            </label>
            <input type={"text"} required onChange={(e)=>this.handleField(e)} id="email" placeholder="example...@gmail.com" />
            <label htmlFor="password">
                Password
            </label>
            <input type={"password"} id="password" required onChange={(e)=>this.handleField(e)} placeholder="****" />
            <label className="forgot-password">{this.state.status.toLocaleLowerCase()==="login"?<Forget/>:""}</label>
        
            <br></br>
            <button onClick={(e)=>this.handleSubmit(e)} className="submit"> submit </button>
            <p className="switch-state"><span onClick={()=>this.handleStatus()} >click to {this.state.status==="login"?"register":"login"}</span></p>     
            </form>
    
        </div>);
    }
}
 
export default Authenticate;