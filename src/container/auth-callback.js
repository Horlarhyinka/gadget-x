import React, {Component} from "react";
import { setAuthToken } from "../functions/auth";

class AuthCallback extends Component {
    state = {  } 

    componentDidMount = async() =>{
        const authTokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
        let token = decodeURIComponent(document.cookie)
        const tokenPresent = token?.startsWith(authTokenName)
        if(!tokenPresent)return window.location.assign("/auth")
        token = token.slice(authTokenName.length + 1)
        const splitted = token.split(";email=")
        const authToken = splitted[0]
        const email = splitted[1]
        setAuthToken(authToken, email)
        window.location.assign("/")
    }

    render() { 
        return (<div className="null">
            authenticating...
        </div>);
    }
}
 
export default AuthCallback;