import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { createRef } from "react";
import axios from "axios";
import "./styles/modify.css";


const baseUrl = process.env.REACT_APP_API_BASE_URL
const Modify=()=> {

const params = useParams()
const [prod,setProd] = useState(null)
const [updates,setUpdates] = useState({})
const [readOnly,setreadOnly] = useState(true)

useEffect(()=>{
    axios.get(`${baseUrl}products/${params.id}`).then(res=>
        setProd(res.data))},[])

    
let product = {...prod}
delete product.preview_image_url
delete product.more_images_url
delete product._id
delete product.category
let preview = prod && prod.preview_image_url
const refs = {

}

const update = async(e) =>{
    e.preventDefault()
const updated = await axios.put(`${baseUrl}products/${params.id}`,updates)
window.location.reload()
}

return !prod || !prod._id?<div className="notfound"><h1>product not found</h1>
<button onClick={()=>{window.location.assign("http://localhost:3000/administrator/home")}} >Back</button>
</div>:(<div className="modify">
            <div className="imgprev">
                <img src= {preview} />
            </div>
            <form className="fieldsdisp">
                <span onClick={()=>{setreadOnly(false)}}>edit</span>
                {
                    product? Object.entries(product).map(p=>{
                        let k = p[0]
                        let v = p[1]
                        refs[k] = createRef()
                        return (<div className="field" key={k+ v}>
                        <label>{k}</label>
                        <input name={k} onChange={(e)=>{setUpdates({...updates,[k]:e.target.value})}} readOnly={readOnly} id={k} ref={refs[k]} defaultValue={v} />
                        </div>)}):<h1>none</h1>
                }
               <button onClick={(e)=>{update(e)}}>update</button>
            </form>
            
        </div>)
}
 
export default Modify;