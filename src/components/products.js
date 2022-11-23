import { Link } from "react-router-dom";
import "./styles/products.css"
const Products = ({products}) => {

const productsList = products.map((product)=>{
    
    const {_id,preview_image_url,name,price} = product
    
    return (<Link to={`/products/${_id}`} key={_id} className="productcard">
        <img src={preview_image_url} alt={name} label={preview_image_url} />
        <h1>{name}</h1>
        <strong>{price}$</strong>
        <button className="btn-preview">Buy now</button>
        <button className="btn-cart">Add to cart</button>
    </Link >)
})
    return ( <div className="productscardlist">
        {productsList}
    </div> );
}
 
export default Products;