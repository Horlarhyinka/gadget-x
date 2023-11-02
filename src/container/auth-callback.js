import React, {Component} from "react";
import { setAuthToken } from "../functions/auth";
import { readCookie } from "../functions/cookie";
import { getFromLocalStorage } from "../functions/factory";

class AuthCallback extends Component {
    state = {  } 

    componentDidMount = async() =>{
        const authTokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
        const token = readCookie(authTokenName)
        const email = readCookie("email")
        const id = readCookie("id")
        setAuthToken(token, email, id)
        const redirectUrl = getFromLocalStorage("redirect_url") || "/"
        window.location.assign(redirectUrl)
    }

    render() { 
        return (<div className="null">
            authenticating...
        </div>);
    }
}
 
export default AuthCallback;