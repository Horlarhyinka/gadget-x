import React from "react";
import { numberToPrice } from "../functions/factory";
import "./styles/product-card.css";

const ProductCard = ({img, name, description, price, handleClick, handleBtn, btnClass}) => {
    if(name?.length + description?.length > 80){
        description = description.slice(0,80-name.length) + "..."
    }
return (<div className="product-card" onClick={()=>{handleClick}} >
            <img src={img} alt={name} />
            <p className="name-description">{!description?name:name + " - " + description}</p>
            <p className="price">₦{numberToPrice(price)}</p>
        </div>);
}
 
export default ProductCard;