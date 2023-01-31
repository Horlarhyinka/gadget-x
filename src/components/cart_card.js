import React from "react";
import "./styles/cart_card.css"

const Card = (prop) => {
    let {name, img, id, indx, price, quantity, increment, decrement, removeFromCart} = prop
    return ( <div style={{
        display: "block",
        textAlign: "center",
    }} className="card-card-wrapper">
    <div className="cart-card">
        <img src={img} alt={name} />
        <div className="info">
            <p className="name">{name}</p>
            <div>
             <div className="price">
            <label>price: </label> ₦{price}</div>
            <div className="quantity-container"><label>quantity: </label>
                   
                <strong className="actual-quantity">
                     <div className="switch-quantity" onClick={()=>{decrement(indx)}}><p>-</p></div>
                    <p className="qty-val">{quantity}</p>
                    <div className="switch-quantity" onClick={()=>{increment(indx)}} ><p>+</p></div>
                    </strong>
                
            </div>   
            </div>
            
        </div>
        </div>
        <strong
        style={{
            display: "inline-block",
            width: "100%",
            color: "red",
            textAlign:"right",
            width: "75%",
            maxWidth: "80%",
            marginBottom:"45px",
            cursor:"pointer"
        }}
        onClick={()=>{
            removeFromCart(id)
        }}
         className="rm-frm-cart">remove from cart</strong>
    </div>
     );
}
 
export default Card;