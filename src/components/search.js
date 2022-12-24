import "./styles/searchSection.css";
import {useEffect, useState} from "react";
import { cats } from "../assets/datas";
import { useParams } from "react-router-dom";

const SearchSection = ({handleSearchChange}) => {
    let id = 0;
    let initialCat = "all"
    const [activeCat, setActiveCat] = useState(initialCat)
    const handleCatChange = (cat) =>{
        if(cat.toLowerCase() === "all"){
            setActiveCat("")
            handleSearchChange({"target":{"value":""}})
        }else{
          setActiveCat(cat) 
          handleSearchChange({"target":{"value":cat}})
        }  
    }
    
    useEffect(()=>{
    handleCatChange(initialCat)
    },[])
    
    

    const catsList = cats.map((cat)=>{
        id++
        return(<h2 onClick={(e)=>{handleCatChange(cat)}} key={id}>{cat}</h2>)})
    return ( <div className="searchsection">
<input className="searchfield"  type={"text"} onChange={(e)=>{handleSearchChange(e)}} placeholder="search products/categories" />
<div className="activecat">
    <h2>{!activeCat?initialCat:activeCat}</h2>
    <div className="allcats">
    {catsList}
    </div>
</div>
    </div> );
}
 
export default SearchSection;