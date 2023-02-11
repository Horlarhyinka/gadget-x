import axios from "axios";
import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { authenticateResponse, getAdminAuthToken } from "../functions/auth";
import Back from "../components/back"
import "./styles/admin-preview.css"
import Consent from "../components/consent";

const api_base_url = process.env.REACT_APP_API_BASE_URL;
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

const AdminPreview = () => {
    const {id} = useParams()
    const queryUrl = api_base_url+"products/"+id;
    const [product,setProduct] = useState({product:"",quantity:"",price:"",description:""})
    const [dialog, setDialog] = useState(null)
    const [disabled,setDisabled] = useState(true)

    React.useEffect(()=>{
        authenticateResponse(()=>axios.get(queryUrl)).then(res=>{
            setProduct(res.data)
        }).catch((err)=>{
            throw Error("error getting data"+err)
        })
    },[])
    const handleMode = (e) =>{
        if(e.target.checked)return setDisabled(false)
        setDisabled(true)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            await authenticateResponse(()=>axios.put(queryUrl,{...product},{headers:{[tokenName]:getAdminAuthToken()}}))
            return setDialog({message:"update failed", status:"failed"})
        } catch (error) {
            return setDialog({message:error.response.data.message,status:"failed"})
        }
    }

    const handleDelete = async(e) =>{
        e.preventDefault()
        const res = await authenticateResponse(()=>axios.delete(queryUrl,{headers:{[tokenName]:getAdminAuthToken()}}))
        if(res.status !== 200) return setDialog({message:"could not delete produt",status:"failed"})
        window.location.assign("/admin")

    }


    const updateField = (e) =>{
        setProduct({...product,[e.target.id]:e.target.value})
    }

    return ( <div className="admin-preview">
    <Back url={"/admin"} />
    <img className="image-preview" src={product.preview_image_url}  />
    <form className={"new-product"}>
    <p className="writeup">dont forget to review product's information after updating.</p>
    <div className="mode-wrapper"><label>edit mode</label><input type={"checkbox"} onChange={(e)=>handleMode(e)} /></div>
     <label className="qty">quantity</label>
    <input type={"number"} value={product.quantity || ""} disabled={disabled} min={1} id={"quantity"} onChange={(e)=>{updateField(e)}} />
    <label>name</label>
    <input type={"text"} value={product.name || "" } disabled={disabled} id={"name"} onChange={(e)=>{updateField(e)}} />
    <label>price</label>
    <input type={"number"} value={product.price || ""} disabled={disabled} id={"price"} onChange={(e)=>{updateField(e)}} />
    <label>description</label>
    <textarea id="description" value={product.description || ""} disabled={disabled} maxLength={125} onChange={(e)=>{updateField(e)}}>
    </textarea>
    <button className={`${!disabled?"active":""}`} onClick={(e)=>{handleSubmit(e)}} >submit</button>
    <Consent message={dialog?.message} status={dialog?.status} controller={()=>setDialog(null)} />
    <button onClick={(e)=>{handleDelete(e)}} className="delete">delete product</button>
</form></div> )
}
 
export default AdminPreview;