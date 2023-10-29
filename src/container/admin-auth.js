import React from "react";
import "./styles/auth.css";
import axios from "axios";
import { getAuthToken, setAdminAuthToken, setAuthToken } from "../functions/auth";
import Forget from "../components/forget-password";
import Consent from "../components/consent";

const queryUrl = process.env.REACT_APP_API_BASE_URL+"auth/admin/"
class AdminAuthenticate extends React.Component {
    state = { 
        email:"",
        password:"",
        dialog:null
     } 

     setDialog = (inf) =>{
        this.setState({dialog:inf})
     }

     handleField = (e) =>{
        const field =e.target.id
        return this.setState({[field]:e.target.value})
     }
    queryUrl = queryUrl + "login"

    handleSubmit = async(e)=>{
        e.preventDefault()
        const url = this.queryUrl
        axios.post(url,{email:this.state.email,password:this.state.password}).then(res=>{
            const {data,token} = res.data;
            setAdminAuthToken(token,data?.email)
            window.location.assign("/admin")
        }).catch((err)=>{
            this.setDialog({message:err.response.data?.message, status:"failed"})
        })
        
    }
    render() { 
        const G_icn = "https://www.google.com/search?q=google&sxsrf=ALiCzsZka-5nXxjtLpA-fPeCBafOZFlwSQ:1672228671321&tbm=isch&source=iu&ictx=1&vet=1&fir=mM5eejaz-bUIsM%252C0UCf55-GTy6fDM%252C%252Fm%252F045c7b&usg=AI4_-kSYAGYPZdf4mjV9iTOVhdppGBfSaw&sa=X&ved=2ahUKEwjhoL-foZz8AhXX_rsIHeTMC_0Q_B16BAg_EAI#imgrc=mM5eejaz-bUIsM"
        return (<div className="auth" >
            <Consent message={this.state.dialog?.message} status = {this.state.dialog?.status} controller={()=>this.setState({dialog:null})} />
            <form className="auth-form admin">
            <p className="form-status">login</p>
                <p className="write-up">we appreciate your effort in providing customer satisfaction</p>
            <label htmlFor="email">
                Email
            </label>
            <input type={"text"} required onChange={(e)=>this.handleField(e)} id="email" placeholder="example...@gmail.com" />
            <label htmlFor="password">
                Password
            </label>
            <input type={"password"} id="password" required onChange={(e)=>this.handleField(e)} placeholder="****" />
            <label className="forgot-password"><Forget/></label>
        
            <br></br>
            <button onClick={(e)=>this.handleSubmit(e)} className="submit"> submit </button>   
            </form>
    
        </div>);
    }
}
 
export default AdminAuthenticate;