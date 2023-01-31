import React from "react";
import axios from "axios";
import { authenticateResponse, getAdminAuthToken } from "../functions/auth";
import Back from "../components/back";
import adminAuthHOC from "./HOC/admin-auth-hoc";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

class NewAdmin extends React.Component{

    state={
        user:{}
    }
    queryUrl = API_BASE_URL + "auth/admin/register"
    updateField= (e) =>{
        this.setState({
            user:{...this.state.user,[e.target.id]:e.target.value}
        })
    }

    handleSubmit= async(e)=>{
        e.preventDefault()
        const user = {...this.state.user,password:this.state.user.lastName?.toLowerCase()}
        const {data} = await authenticateResponse(()=>axios.post(this.queryUrl,{...user},{headers:{[tokenName]:getAdminAuthToken()}}),"/admin/auth")
        if(!data)return alert("could not create new user")
        alert("new user created")
    }


    render(){
     return (
    <div className="auth">
        <Back url={"/admin"} />
    <form className="auth-form new-admin">
    <p className="write-up">be aware that the new user will now have the authorization to manage products and authorize new users on this platform</p>
    <label htmlFor="email">
        Email
    </label>
    <input type={"text"} required onChange={(e)=>{this.updateField(e)}} id="email" placeholder="example...@gmail.com" />
    <label htmlFor="firstName">
        first name
    </label>
    <input type={"text"} id="firstName" required onChange={(e)=>{this.updateField(e)}} />
    <label htmlFor="lastName">
        last name
    </label>
    <input type={"text"} id="lastName" required onChange={(e)=>{this.updateField(e)}} />
    <br></br>
    <button onClick={(e)=>{this.handleSubmit(e)}} className="submit"> submit </button>   
    </form>
        </div>
     )   
    }
    
    }
 
    
export default adminAuthHOC(NewAdmin);