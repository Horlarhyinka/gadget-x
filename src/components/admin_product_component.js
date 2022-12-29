import React from "react";
import "./styles/card.css";
import { Icon } from "@iconify/react";
import remove from "../functions/remover";
import { Link } from "react-router-dom";

const Card = ({props,setter}) => {
    return ( <Link className="cardBox" to={`/administrator/products/${props._id}`} >
            <img src={props.preview_image_url} alt={props.name} className="cardimg" label="image" />
            <Icon onClick={()=>remove(props._id,setter)} className="delicn" icon="openmoji:delete" />
            <p className="cat">{props.category}</p>
            <h1 className="prodname">{props.name}</h1>
            <h4 className="prodprice">{props.price}$</h4>
    </Link> ); 
}
 
export default Card;