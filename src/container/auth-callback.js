import React, {Component} from "react";
import { setAuthToken } from "../functions/auth";
import { readCookie } from "../functions/cookie";

class AuthCallback extends Component {
    state = {  } 

    componentDidMount = async() =>{
        const authTokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
        const token = readCookie(authTokenName)
        const email = readCookie("email")
        const id = readCookie("id")
        // setAuthToken({cookie: token, email })
        setAuthToken(token, email, id)
        window.location.assign("/")
    }

    render() { 
        return (<div className="null">
            authenticating...
        </div>);
    }
}
 
export default AuthCallback;