import React,{Component} from "react";
import { authenticateResponse, getAuthToken } from "../functions/auth";
import { authHOC } from "./HOC/auth-hoc";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

class PaymentCallback extends Component {
    state = {  } 
    componentDidMount = async()=>{
        console.log({auth:getAuthToken()})
        //const url = API_BASE_URL+"payment/verify?reference=" + new URLSearchParams(window.location.search).get("reference")
        const url = "http://localhost:2003/api/v1/payment/verify?reference=" + new URLSearchParams(window.location.search).get("reference")
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