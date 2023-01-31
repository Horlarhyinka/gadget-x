import { getAdminAuthToken } from "../../functions/auth";
import AdminAuthenticate from "../admin-auth";

function adminAuthHOC(childComponent){
    const adminToken = getAdminAuthToken()
    if(!adminToken)return AdminAuthenticate;
    return childComponent
}

export default adminAuthHOC