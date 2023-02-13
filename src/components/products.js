import React from "react";
import { Link } from "react-router-dom";
import "./styles/products.css";
import ProductCard from "./product-card";

const Products = ({products}) => {

const productsList = products.map((product)=>{
    const {_id,preview_image_url:img,name,price, description} = product
    return (<Link to={`/products/${_id}`} key={_id} >
        <ProductCard
        name={name}
        img={img}
        price={price}
        description={description}
         />
    </Link >)
})
    return ( <div className="products-list">
        {productsList}
    </div> );
}
 
export default Products;