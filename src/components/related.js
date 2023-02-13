import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./styles/products.css";
import "./styles/related.css";
import { Link } from "react-router-dom";
import ProductCard from "./product-card";


const RelatedProducts = () => {
    const {id} = useParams()
    const queryUrl = `${process.env.REACT_APP_API_BASE_URL}products/${id}/related`
    const [related, setRelated] = useState([])
    useEffect(()=>{
        axios.get(queryUrl).then(res=>{
            setRelated(res.data)
        })
    },[queryUrl])
    
    const relatedList = related.map((product)=>{
    
        const {_id,preview_image_url:img, name, description, price} = product
        
        return (<Link to={`/products/${_id}`} key={_id} className="productcard">
           <ProductCard
            img={img}
            name={name}
            description={description}
            price={price}
            />
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