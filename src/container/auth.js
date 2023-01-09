import React from "react";
import "./styles/auth.css";
import axios from "axios";
import { getAuthToken, setAuthToken } from "../functions/auth";

const queryUrl = process.env.REACT_APP_API_BASE_URL+"auth/"
class Authenticate extends React.Component {
    state = { 
        status:"login",
        email:"",
        password:""
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
        console.log(url, queryUrl)
        axios.post(url,{email:this.state.email,password:this.state.password}).then(res=>{
            const {data,token} = res.data
            if(!token)return console.log("could not get token")

            setAuthToken(token)
            window.location.reload()
        }).catch((err)=>{
            console.log(err.response.data.message)
        })
        
    }
    render() { 
        const G_icn = "https://www.google.com/search?q=google&sxsrf=ALiCzsZka-5nXxjtLpA-fPeCBafOZFlwSQ:1672228671321&tbm=isch&source=iu&ictx=1&vet=1&fir=mM5eejaz-bUIsM%252C0UCf55-GTy6fDM%252C%252Fm%252F045c7b&usg=AI4_-kSYAGYPZdf4mjV9iTOVhdppGBfSaw&sa=X&ved=2ahUKEwjhoL-foZz8AhXX_rsIHeTMC_0Q_B16BAg_EAI#imgrc=mM5eejaz-bUIsM"
        const image_url = "https://res.cloudinary.com/lahri/image/upload/v1666514029/ckhximqrrdxp0umb8q8k.jpg"
        return (<div className="auth" >
            <div className="side-div" style={{backgroundImage:`url(${image_url})`}}  >
               
            <div className="auth-writeup">
                we are not here to sell to you only, we are here to help you buy
            </div>
            <div className="cta">learn more</div>
            </div>
            <form className="auth-form">
                 <h3>{this.state.status}</h3>
            <div className="google-wrapper">
                <img src={G_icn} alt={"google"} className="g-icn" />
                <span className="g-txt">continue with google</span>
            </div>
            <div className="google-wrapper">
                <img src={G_icn} alt={"google"} className="g-icn" />
                <span className="g-txt">continue with google</span>
            </div>
            <div className="or"><hr></hr><p>or</p><hr></hr></div>
            <p>{this.state.status} with</p>
            <label htmlFor="email">
                Email
            </label>
            <input type={"text"} onChange={(e)=>this.handleField(e)} id="email" placeholder="example...@gmail.com" />
            <label htmlFor="password">
                Password
            </label>
            <input type={"password"} id="password" onChange={(e)=>this.handleField(e)} placeholder="****" />
            <div className="remember">    
            <input type={"checkbox"} />
            <label >remember me</label>
            <p>forget password</p>
            </div>
        
            <br></br>
            <div onClick={(e)=>this.handleSubmit(e)} className="submit"> Submit </div>
            <p className="switch-state"><span onClick={()=>this.handleStatus()} >click to {this.state.status==="login"?"register":"login"}</span></p>     
            </form>
    
        </div>);
    }
}
 
export default Authenticate;