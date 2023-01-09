const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

export const getAuthToken = () =>{
    return localStorage.getItem(tokenName)
}
export const setAuthToken = (token) =>{
    return localStorage.setItem(tokenName,token)
}