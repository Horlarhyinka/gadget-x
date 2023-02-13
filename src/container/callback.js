import React,{Component} from "react";
import { authenticateResponse, getAuthToken } from "../functions/auth";
import { authHOC } from "./HOC/auth-hoc";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

class PaymentCallback extends Component {
    state = {  } 
    componentDidMount = async()=>{
        await authenticateResponse(()=>axios.get(url,{headers:{[tokenName]:getAuthToken()}}))
        return window.location.assign("/history")
        }
    render() { 
        return (
            <p className="null">processing...</p>
        );
    }
}
 
export default authHOC(PaymentCallback);