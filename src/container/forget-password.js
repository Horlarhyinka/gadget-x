import axios from "axios";
import React from "react";
import "./styles/auth.css";
import Consent from "../components/consent";
import Back from "../components/back";


class ForgetPassword extends React.Component {
    state = { email:"",message:undefined} 
    handleField = (e) =>{
        this.setState({...this.state,[e.target.id]:e.target.value})
    }
    handleSubmit = async(e) =>{
        e.preventDefault()
        const res = await axios.post(process.env.REACT_APP_API_BASE_URL+"auth/forget-password",{email:this.state.email})
        console.log(res)
        if(res.status == 200){
            this.setState({...this.state,message:res.data.message})
        }
    }
    render() { 
        return (
    <div className="auth ">
        <Back url={"/auth"} />
        <Consent message={this.state.message} status={"success"} />
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