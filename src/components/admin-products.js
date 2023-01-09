import React from "react"
import ProductCard from "./product-card";
import { Link } from "react-router-dom";
import "./styles/admin-products.css"

const AdminProducts = ({products}) => {
    console.log(products)
    const productList = products.map(({name,description , price, preview_image_url:img, _id:id })=>{
    return <Link key={id} to={"/admin/products/"+id} ><ProductCard name={name} description={description} price={price} img={img} id={id} /></Link>})
    return ( <div className="admin-products">
        <strong>manage inventory</strong>
        {productList}
    </div> );
}
 
export default AdminProducts;