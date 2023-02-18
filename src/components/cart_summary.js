import React from "react";
import "./styles/cart-summary.css";
import { numberToPrice } from "../functions/factory";

const CartSummary = ({net, delivery}) => {
    return ( <div className="cart-summary">
        <h3>summary</h3>
        <div><label>net-price</label><p>₦{net}</p></div>
        <div><label>delivery fee</label><p>₦{numberToPrice(net>0?(parseFloat(delivery)).toFixed(2):0)}</p></div>
        <div className="total"><label>Total</label><p>₦{numberToPrice(net>0?(parseFloat(net) + parseFloat(delivery)).toFixed(2):0)}</p></div>
    </div> );
}
 
export default CartSummary;