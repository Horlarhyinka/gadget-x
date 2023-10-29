export const readCookie = (cookieName)=>{
    const cookies = document.cookie
    const start = cookies.indexOf(cookieName) + cookieName.length + 1
        const end = cookies.indexOf(";", start)
        const cookie = cookies.slice(start, end)
        return cookie
}