import {Cloudinary} from "cloudinary-core";

const options = { 
    api_key:"594777649387224",
    api_secret:"m3tIWkEVkXMkiWizxTYN20iEfVM",
    cloud_name:"lahri"
}

const cloudinary = Cloudinary.new(options)

console.log(cloudinary)

export const uploadFiles  = (fileList) =>{
    return 
}