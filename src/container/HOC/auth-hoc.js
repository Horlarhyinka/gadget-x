import Authenticate from "../auth";


export const authHOC = (childComponent) =>{
    const token = localStorage.getItem("gadget-x-auth-token") 
    console.log(token,document.cookies)
    return token?childComponent:Authenticate
}