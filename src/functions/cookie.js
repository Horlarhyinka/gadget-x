export const readCookie = (cookieName)=>{
    const cookies = decodeURIComponent(document.cookie)
    const start = cookies.indexOf(cookieName) + cookieName.length + 1
        const end = cookies.indexOf(";", start)
        const cookie = cookies.slice(start, end)
        return cookie
}