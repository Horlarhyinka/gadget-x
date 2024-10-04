import React from "react";
import { numberToPrice } from "../functions/factory";
import "./styles/product-card.css";

const ProductCard = ({img, name, description, price, handleClick, handleBtn, btnClass, reactions, comments}) => {
    if(name?.length + description?.length > 80){
        description = description.slice(0,80-name.length) + "..."
    }
return (
    <div className="product-card" onClick={handleClick}>
      <img src={img} alt={name} />
      <p className="name">{name}</p>
      <div className="price">
        <p className="slash price">
          <sup>₦</sup>{numberToPrice(price + Math.floor(price * 0.15))}.<sup>00</sup>
        </p>
        <p className="price">
          <sup>₦</sup>{numberToPrice(price)}.<sup>00</sup>
        </p>
      </div>
      <div style={{ color: "rgb(255, 174, 0)", fontSize: "1.25rem", marginLeft: "8px", padding: "0.875rem" }}>
        &#9733;&#9733;&#9733;&#9733;&#9733;
      </div>
      <br />
    </div>
  );
  
}
 
export default ProductCard;