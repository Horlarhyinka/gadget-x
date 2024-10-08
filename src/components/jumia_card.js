import React from "react";
import "./styles/jumia-card.css";


const Card = ({prop}) => {
    let {img, name, price, i} = prop
    if(name.length >120){
        name = name.slice(0,100)+"..."
    }
    return ( <div key={i} className="jumia-card" onClick={()=>{window.open(`https://www.jumia.com.ng/catalog/?q=${prop.name}`,"_blank")}} >
        <img src={img} alt={name} label={name} />
        <div className="info">
            <p>{name?.slice(0,61)}...</p>
            <strong>{price}</strong>
        </div>
            
    </div > );
}
 
export default Card;