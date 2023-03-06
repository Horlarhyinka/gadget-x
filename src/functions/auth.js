const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME;

export const getAuthToken = () =>{
    const obj = JSON.parse(localStorage.getItem(tokenName))
    if(obj?.isAdmin)return null;
    return obj?.token
}

export const setAuthToken = (token, email) =>{ 
    const obj = JSON.stringify({token, isAdmin:false, email})
    return localStorage.setItem(tokenName, obj)
}

export const setAdminAuthToken = (token, email) =>{
    return localStorage.setItem(tokenName,JSON.stringify({token, isAdmin:true, email}))
}

export const getAdminAuthToken = () =>{
    const obj = JSON.parse(localStorage.getItem(tokenName));
    if(!obj?.isAdmin)return null;
    return obj.token;
}

export const removeAuthToken = () =>{
    return localStorage.removeItem(tokenName)
}

export const getMail = () =>{
    const obj = JSON.parse(localStorage.getItem(tokenName))
    return obj?.email;
}

export const logOut = () =>{
    removeAuthToken()
    window.location.reload()
}

export const authenticateResponse = async(fn,url) =>{
    try {
       const response = await fn() 
       return response
    } catch (error) {
        const {status, data} = error.response
        if(!status)return;
        if(status === 401 || data?.message?.toLowerCase().includes("unauthenticated")){
        removeAuthToken(tokenName)
        if(url)return window.location.assign(url)
        return window.location.reload()
    }
    return {data:null}
    }
}

//removeAuthToken()