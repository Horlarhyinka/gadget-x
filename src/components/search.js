import React from "react";
import "./styles/searchSection.css";
import {useEffect, useState} from "react";


const SearchSection = ({handleSearchChange, initial, categories}) => {
    let id = 0;
    let initialCat = initial;
    const [activeCat, setActiveCat] = useState(initialCat)
    const handleCatChange = (cat) =>{
        if(cat.toLowerCase() === "all"){
            setActiveCat("")
            handleSearchChange("")
        }else{
          setActiveCat(cat) 
          handleSearchChange(cat)
        }  
    }
    useEffect(()=>{
    handleCatChange(initialCat)
    },[])
    
    const catsList = [{type:"All"},...categories].map((cat)=>{
        id++
        return(<h2 className={`${(cat.type?.toLowerCase() === activeCat?.toLowerCase())||(!activeCat && cat.type?.toLowerCase() === "all")?"selected":""}`} onClick={(e)=>{handleCatChange(cat.type)}} key={id}>{cat.type}</h2>)})
    return ( <div className="searchsection">
<input className="searchfield"  type={"text"} onChange={(e)=>{handleSearchChange(e.target.value)}} placeholder="search products/categories" />
<div className="activecat">
    <h2>{!activeCat?initialCat:activeCat}</h2>
    <div className="allcats">
    {catsList}
    </div>
</div>
    </div> );
}
 
export default SearchSection;