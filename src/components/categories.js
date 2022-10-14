import { Link } from "react-router-dom";
import { categories } from "../assets/datas";
import "./styles/categories.css";

const Categories = () => {
    let id = 0
    const categoryList = categories.map(obj=>{
        id++
        const {type} = obj
        
        return (<Link to={`/shop/${type.replace("&","and")}`} className="catcard" key={id}>
            <img className="catcardimg" src={obj.image} alt={obj["name"]} label={obj["name"]} />
            <div className="info">
            <h3>{obj["type"]}</h3>
            </div>
            
            </Link>)})
    return ( <div className="categories" >
        <h1>categories</h1>
        <div className="catswrapper">
            {categoryList}
        </div>
    </div> );
}
 
export default Categories;