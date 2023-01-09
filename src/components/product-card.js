import React from "react";
import "./styles/product-card.css";

const ProductCard = ({img, name, description, price, handleClick, handleBtn, btnClass}) => {
return (<div className="product-card" onClick={()=>{handleClick}} >
            <img src={img} alt={name} />
            <p className="name-description">{name + " - " + description}</p>
            <p className="price">₦{price}</p>
        </div>);
}
 
export default ProductCard;