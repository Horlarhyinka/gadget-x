import React from "react";
import "./styles/searchSection.css";
import {useEffect, useState} from "react";
import { Icon } from '@iconify/react';

const SearchSection = ({handleSearchChange, initial, categories}) => {
    let id = 0;
    let initialCat = initial;
    const searchRef = React.createRef()
    const [activeCat, setActiveCat] = useState(initialCat)
    const handleCatChange = async(cat) =>{
        setActiveCat(cat) 
        handleSearchChange(cat, searchRef.current.value)
    }
    useEffect(()=>{
    handleCatChange(initialCat)
    },[])

    const clearSearchField = () =>{
        searchRef.current.value = ""
    }
    
    const catsList = [{type:"All"},...categories].map((cat)=>{
        id++
        return(<h2 className={`${(cat.type?.toLowerCase() === activeCat?.toLowerCase())||(!activeCat && cat.type?.toLowerCase() === "all")?"selected":""}`} onClick={()=>{handleCatChange(cat.type)
        }} key={id}>{cat.type}</h2>)})
    return ( <div className="searchsection">
            <div className="search" >
                <input ref={searchRef} type="text" placeholder="search product's name/category" />
                <span className="icn" onClick={clearSearchField} >x</span>
                <Icon className="icn" icon="fluent:search-20-filled" onClick={()=>{
                    handleSearchChange(activeCat, searchRef.current.value)
                    clearSearchField()
                    }} />
            </div>

            <div className="activecat">
                <h2>{!activeCat?initialCat:activeCat}</h2>
                <div className="allcats">
                {catsList}
                </div>
            </div>
        </div> );
    }
 
export default SearchSection;