import "./styles/card.css";
import bgimg from "./bgimg.jpg";
import { Icon } from "@iconify/react";
import remove from "../functions/remover";
import { Link } from "react-router-dom";

const Card = ({props,setter}) => {
    return ( <Link className="cardBox" to={`/administrator/products/${props._id}`} >
            <img src={bgimg} alt="product image" className="cardimg" label="image" />
            <Icon onClick={()=>remove(props._id,setter)} className="delicn" icon="openmoji:delete" />
            <p className="cat">category: {props.category}</p>
            <h1 className="prodname">{props.name}</h1>
            <h4 className="prodprice">{props.price}$</h4>
    </Link> ); 
}
 
export default Card;