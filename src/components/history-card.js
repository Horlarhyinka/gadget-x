import React from "react";
import { numberToPrice } from "../functions/factory";
import "./styles/history-card.css";

const HistoryCard = ({history,retry}) => {

const {status, items, createdAt} = history


    const itemsList =()=> items.length >= 1?items.map(({name, description, price, _id, quantity})=><div key={_id} className="field"><label>{name+"- "+ description + "("+ quantity +")"}</label><p>₦{numberToPrice((price*quantity).toFixed(2))}</p></div>):<p>null</p>;
    const list = itemsList()

    return ( <div className="history-card">
        <div className="field"><label>title</label><p>purchase of {items.length+ " item" + `${items.length > 1? "'s":""}` } </p></div>
        <div className="field"><label>status</label><p className={status.toLowerCase().includes("success")?"success":"failed"}>{status}</p></div>
        <label>summary</label>
        <div className="summary">
            {list}
        </div>
        <div className="field"><label>Total</label><p>₦{items.reduce((acc,{price,quantity})=>acc += price*quantity,0)}</p></div>
        {!status.toLowerCase().includes("success")&&<span onClick={()=>{retry(items)}} className="retry">retry</span>}
        <aside>{createdAt}</aside>
            </div> );
}
 
export default HistoryCard;
