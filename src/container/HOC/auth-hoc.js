import { getAuthToken } from "../../functions/auth";
import Authenticate from "../auth";

export const authHOC = (childComponent) =>{
    const token = getAuthToken()
    return !token?Authenticate:childComponent;
}
