import React from "react";
import { tops } from "../assets/datas";
import "./styles/top.css"

const Top = () => {
    let id = 0;

    const cardList = tops.map(obj=>{
        id++
        return (<div className="topcard" key={id}>
            <img className="topcardimg" src={obj.image} alt={obj["name"]} label={obj["name"]} />
            <div className="info">
            <h3>{obj["name"]}</h3>
            <strong>{obj["price"]}$</strong>
            </div>
            
            </div>)})
    return ( <div className="top" >
    <h1>Top</h1>
    <div className="topswrapper">
        {cardList}
    </div>
    </div> );
}
 
export default Top;