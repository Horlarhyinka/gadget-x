import React from "react"
import ProductCard from "./product-card";
import { Link } from "react-router-dom";
import "./styles/admin-products.css";
import { Icon } from "@iconify/react";

const AdminProducts = ({products, handleSearch}) => {
    const searchRef = React.createRef()
    const productList = products.map(({name,description , price, preview_image_url:img, _id:id })=>{
        if(description?.length > 60){
            description = description.slice(0,60) + "..."
        }
    return <Link key={id} to={"/admin/products/"+id} ><ProductCard name={name} description={description} price={price} img={img} id={id} /></Link>})
    return ( <div className="admin-products">
        <strong>manage inventory</strong>
        <div className="search-wrapper" >
            <input ref={searchRef} type="text" placeholder="search products" />
            <Icon className="icn" icon="fluent:search-20-filled" onClick={()=>{
                handleSearch(searchRef.current.value)
                searchRef.current.value = ""
                }} />
        </div>
        <br></br>
        {productList}
        
    </div> );
}
 
export default AdminProducts;