import axios from "axios";
import _ from "lodash"

const CLOUDINARY_PRESET = "stghocrq";
const cloudName = "lahri";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const uploader = async(files) =>{
const endpoint = "http://localhost:2003/api/v1/products"
const {prev_file,more_files} = files
const preview = new FormData()
const more = new FormData()
preview.append("upload_preset",CLOUDINARY_PRESET)
preview.append("file",prev_file[0])
more.append("upload_preset",CLOUDINARY_PRESET)

try{
files.preview_image_url = await fetch(CLOUDINARY_URL,{
    method:"POST",
    mode:"cors",
    body:preview
}).then(res =>{return res.json()})
.then(res=>{return res.url})
    
await more_files.map(async(file)=>{
        more.append("file",file)
        more.append("upload_preset",CLOUDINARY_PRESET)
        await fetch(CLOUDINARY_URL,{method:"POST",body:more,mode:"cors"})
        .then(res=>{return res.json()})
        .then(res=>{
           files.more_images_url.push(res.url)
            })
    })
    
const data = await axios.post(endpoint,_.pick(files,["category","price","name","more_images_url","preview_image_url","moreInfo"]))

}catch(err){
    throw Error(err)
}



}


export default uploader