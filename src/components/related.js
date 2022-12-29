import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./styles/products.css";
import "./styles/related.css";
import { Link } from "react-router-dom";

const RelatedProducts = () => {
    const {id} = useParams()
    const queryUrl = `http://localhost:2003/api/v1/products/${id}/related`
    const [related, setRelated] = useState([])
    useEffect(()=>{
        axios.get(queryUrl).then(res=>{
            setRelated(res.data)
        })
    },[queryUrl])
    
    const relatedList = related.map((product)=>{
    
        const {_id,preview_image_url,name,price} = product
        
        return (<Link to={`/products/${_id}`} key={_id} className="productcard">
            <img src={preview_image_url} alt={name} label={preview_image_url} />
            <h1>{name}</h1>
            <strong>{price}$</strong>
            <button className="btn-preview">buy now</button>
            <button className="btn-cart">add to cart</button>
        </Link >)
    })
    
    return related.length?(<div className="related">
        <h2>you may also like</h2>
        <div className="related-list">
          {relatedList}  
        </div>
        

    </div>):null
}
 
export default RelatedProducts;