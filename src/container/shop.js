import React from "react";
import axios from "axios"
import {Component} from "react"
import SearchSection from "../components/search"
import Products from "../components/products";
import JumiaProducts from "../components/jumia";
import Back from "../components/back";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const productsUrl = API_BASE_URL+"products"

class Shop extends Component {
    allProducts 
    initial = new URLSearchParams(window.location.search)?.get("initial")
    state = { 
        products:[],
     } 
     componentDidMount = async() =>{
        let allProducts = await axios(productsUrl)
        this.allProducts = allProducts.data
        this.setState({products:[...allProducts.data]})
     }
     handleSearchChange = (e) =>{
        let searchField = e.target.value.trim()
        if(!this.allProducts){
            axios.get(productsUrl).then(res=>{
            return this.setState({products:res.data.filter(prod=>prod.category.includes(searchField))})
            })
            return
        }
        let newProducts = this.allProducts && this.allProducts.filter((product)=>{
            return product.category.toLowerCase().includes(searchField.toLowerCase()) || product.name.toLowerCase().includes(searchField.toLowerCase()) || Math.abs(product.price - parseInt(searchField)) <= 10
        })
        
        this.setState({products:[...newProducts]})
     }
    
    render() { 
        
        return (<div className="shop" >
            <Back />
            <SearchSection initial={this.initial || "All"} handleSearchChange={this.handleSearchChange} />
            <Products products={this.state.products} />
            <JumiaProducts keyword={this.initial || "gadget"} />
        </div>);
    }
}
 
export default Shop;