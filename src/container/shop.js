import React from "react";
import axios from "axios"
import {Component} from "react"
import SearchSection from "../components/search"
import Products from "../components/products";
import JumiaProducts from "../components/jumia";
import Back from "../components/back";
import categories from "../assets/categories";
import Consent from "../components/consent";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const productsUrl = API_BASE_URL+"products"

class Shop extends Component {

    state = { 
        products:[],
        categories,
        dialog:null
     } 

    allProducts 
    initial = new URLSearchParams(window.location.search)?.get("initial")

     toggleDialog = (details) =>{
        this.setState({dialog:details})
     }

     componentDidMount = async() =>{
        axios.get(productsUrl).then(({data})=>{
                this.allProducts = data 
                this.setState({products:[...data],categories})
                this.handleSearchChange(this.initial)
        }).catch(err=>console.log(err.response))
     }
     handleSearchChange = (value) =>{
        let searchField = value?.trim()?.toLowerCase().replace("&","and")
        if(searchField === "all"){
            searchField = ""
        }
        if(!this.allProducts){
            axios.get(productsUrl).then(res=>{
            return this.setState({products:res.data.filter(prod=>prod.category.includes(searchField))})
            })
            return
        }
        let newProducts = this.allProducts.filter(({category, price, name, description})=>{
            category = category?.toLowerCase().trim()
            name = name?.toLowerCase().trim()
            description = description?.toLowerCase().trim()
            price = parseInt(price)
            return (
                category?.includes(searchField) || searchField?.includes(category)
             || description?.includes(searchField) || searchField?.includes(description)
             || name?.includes(searchField) || searchField.includes(name)
             || Math.abs(parseInt(price) - parseInt(searchField)) <= 10)
        })
        this.setState({products:[...newProducts]})
     }
    
    render() {
        return (<div className="shop" >
            <Consent message={this.state.dialog?.message} status={this.state.dialog?.status} controller={()=>{this.setState({dialog:null})}} />
            <Back />
            <SearchSection
             initial={this.initial || "All"}
              categories={this.state.categories}
               handleSearchChange={this.handleSearchChange} />
            <Products products={this.state.products} />
            <JumiaProducts displayMessage={this.toggleDialog} keyword={this.initial || "gadget"} />
        </div>);
    }
}
 
export default Shop;