
import Select from "react-select";
import { useEffect, useState } from "react";
import "./styles/admin_home.css";
import "../components/styles/message.css"
import { Icon } from '@iconify/react';
import Alert from "react-bootstrap/Alert";


const Admin_home = () => {

    const CLOUDINARY_PRESET = `umhffieh`;
    const cloudName = "lahri";
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const [category, setCategory] = useState("")
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [prev_img_file,setPrev_img_file] = useState([]);
    const [more_img_file, setMore_img_file] = useState()
    const [prev_img_url,setPrev_img_url] = useState("");
    const [more_img_url,set_more_img_url] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const cat_options = [
        {label:"phones and tablets",value:"phones and tablets"},
        {label:"laptops and macbooks",value:"laptops and macbooks"},
        {label:"headphones",value:"headphones"},
        {label:"powerbanks",value:"powerbanks"},
        {label:"others",value:"others"}
    ]

    const upload_to_cloudinary = (files) =>{
        let formdata = new FormData();
        const url_list = [];
      setIsPending(true);
        files.forEach(file =>{
            formdata.append("file",file);
            formdata.append("upload_preset",CLOUDINARY_PRESET);
             fetch(CLOUDINARY_URL,{
           method:"POST",
            body:formdata,
            mode:"cors"
            }).then(
                res =>{
                  return  res.json()
                }
            ).then((res)=>{
                url_list.push(res.url);
            }).catch(err =>{
                console.log("error uploading to cloudinary")
                setFailed(true);
                setIsOpen(true);
            })
        })
        return url_list;    
    }

    const handle_upload = async(e) =>{
        e.preventDefault();
        try {
            
        const prev_url = await upload_to_cloudinary(prev_img_file);
        const more_url = await upload_to_cloudinary(more_img_file);
        setPrev_img_url(prev_url);
        setPrev_img_url(more_url);
        fetch("http://localhost:5000/administrator/product-upload",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:{
                category:category,
                name:name,
                price:price,
                prev_img_url:prev_img_url,
                more_img_url:more_img_url
            }
        }).then((res) =>{
            setSuccess(true);
            setIsOpen(true);
        })
        } catch (error) {
            setFailed(true);
            setIsOpen(true);
        }
    }
    const handle_more_img = (e) =>{
        let img_list = [];
        Array.from(e.target.files).forEach(file =>{
            img_list.push(file)
        })
        setMore_img_file(Array.from(img_list));
    }

    const Message = () => {

        if(failed){return isOpen && <Alert className="alertBox failed" variant='success'>
            
        <p>upload failed</p>
        <span onClick={()=>setIsOpen(false)}>x</span>
      </Alert>}

       if(success){ return success && isOpen && <Alert className="alertBox success" variant='success'>
            
            <p>upload successful</p>
            <span onClick={()=>setIsOpen(false)}>x</span>
          </Alert>}
            }

    return ( <div className="admin">
        <h1 className="admin_header" >welcome admin </h1>
            <h4>Upload a new product</h4>
            <form className="upload_form">
                <label>select product category</label>
                <Select  options={cat_options} onChange={(e)=>setCategory(e.value)} />
                <label>input product name</label>
                <input type={"text"}  name={"name"} onChange={(e)=>setName(e.target.value)} />
                <label>input product price</label>
                <input type={"text"}  name={"price"} onChange={(e)=>setPrice(e.target.value)}/>
                <label>upload image</label>
                <input type={"file"}    name={"prev_image"} onChange={(e)=>setPrev_img_file([e.target.files[0]])} />
                <label>input more images</label>
                <input type={"file"} multiple  name={"more_images"} onChange={(e)=> handle_more_img(e) } /><br/>
                <button className="upload_btn" onClick={handle_upload}>upload</button>
                <Message/>
            </form>

            <h4>modify products</h4>
            <form className="rm_cat">
                <label>select category</label>
                <Select options={cat_options} />
            </form>
            <div className="rm">
                
            </div>
       
    </div> );
}
 
export default Admin_home;