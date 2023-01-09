import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./styles/admin-preview.css"

const api_base_url = process.env.REACT_APP_API_BASE_URL
const AdminPreview = () => {
    const {id} = useParams()

    const [product,setProduct] = React.useState({product:"",quantity:"",price:"",description:""})

    const [disabled,setDisabled] = React.useState(true)

    React.useEffect(()=>{
        axios.get(api_base_url+"products/"+id).then(res=>{
            setProduct(res.data)
        }).catch((err)=>{
            throw Error("error getting data"+err)
        })
    },[])
    const handleMode = (e) =>{
        if(e.target.checked)return setDisabled(false)
        setDisabled(true)
    }

    const updateField = (e) =>{
        setProduct({...product,[e.target.id]:e.target.value})
    }

    return ( <div className="admin-preview">
    <div className="del-wrapper">
        <button>delete</button>
    </div>
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
    <button className={`${!disabled?"active":""}`} onClick={(e)=>{}} >submit</button>
</form></div> )
}
 
export default AdminPreview;