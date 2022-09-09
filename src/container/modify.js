import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import getResource from "../functions/getter";
const Modify = () => {
    const [resource,setResource] = useState()

        const id = useParams(window.location.href).id
        const endpoint = `http://localhost:2003/api/v1/products/${id}`
        getResource(endpoint).then(({data})=>{
            setResource(data)
        })
        const getFields = () =>{
            if(!resource || !Object.entries(resource).length) return;
            console.log("here")
            Object.entries(resource).map((item)=>{
                
                return (<div>
                <label>{item[0]}</label>
                <input type={"text"} default={item[1]} readOnly={"readonly"} />
                </div>)
            }) 
        }
        const fields = getFields()
    
return (<div>
            <h1>modify</h1>
            <div className="imgPev">
                <img src= {"img.jpg"} />
                <label>label</label>
                <input type={"text"} default={"default"} />
            </div>
            <div className="fieldsdisp">
                {fields}
            </div>
        </div>);
}
 
export default Modify;