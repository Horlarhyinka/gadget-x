import axios from "axios";
import React from "react";
import "./styles/auth.css";
import Consent from "../components/consent";
import Back from "../components/back";


class ForgetPassword extends React.Component {
    state = { email:"",message:undefined, notify: false,error: false} 
    handleField = (e) =>{
        this.setState({[e.target.id]:e.target.value})
    }
    handleSubmit = async(e) =>{
        try {
            
        e.preventDefault()
        const res = await axios.post(process.env.REACT_APP_API_BASE_URL+"auth/forget-password",{email:this.state.email})
        this.setState({message:res.data.message, notify: true, error: false})
        } catch (error) {
        this.setState({message:error.response?.data?.message, notify: true, error: true})
            
        }
    }
    render() { 
        return (
    <div className="auth ">
        <Back url={"/auth"} />
        <Consent message={this.state.message} controller={()=>{this.setState({message: undefined, notify: false})}} status={this.state.error?"failed":"success"} />
        <form className="forget" >
            <p className="write-up">please provide your email address</p>
            <label>Email</label>
            <input id="email" type={"text"} required onChange={(e)=>{this.handleField(e)}} />
            <button onClick={(e)=>{this.handleSubmit(e)}}>submit</button>
        </form>
    </div>
);
    }
}
 
export default ForgetPassword ;