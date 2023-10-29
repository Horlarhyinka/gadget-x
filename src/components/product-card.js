import React from "react";
import { numberToPrice } from "../functions/factory";
import "./styles/product-card.css";

const ProductCard = ({img, name, description, price, handleClick, handleBtn, btnClass, reactions, comments}) => {
    if(name?.length + description?.length > 80){
        description = description.slice(0,80-name.length) + "..."
    }
return (<div className="product-card" onClick={()=>{handleClick}} >
            <img src={img} alt={name} />
            <p className="name">{name}</p>
            <div className="price" >
            <p className="slash price"><sup>₦</sup>{numberToPrice(price + Math.floor(price*0.15))}.<sup>00</sup></p>
                <p className="price"><sup>₦</sup>{numberToPrice(price)}.<sup>00</sup></p></div>
                <div style={{color: "yellow", fontSize: "16px", marginLeft: "8px"}} >&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <br></br>
        </div>);
}
 
export default ProductCard;