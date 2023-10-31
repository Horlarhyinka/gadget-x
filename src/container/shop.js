import React from "react";
import axios from "axios"
import {Component} from "react"
import SearchSection from "../components/search"
import Products from "../components/products";
import JumiaProducts from "../components/jumia";
import Back from "../components/back";
import categories from "../assets/categories";
import Consent from "../components/consent";
import { authenticateResponse } from "../functions/auth";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

class Shop extends Component {

    state = { 
        products:[],
        categories,
        dialog:null,
        requestTotal: 0,
        currentSearch: ""
     } 
    initial = new URLSearchParams(window.location.search)?.get("initial")
    requestCount = 10
    requestPage = 1
    category = "all"
    queryUrl = `${API_BASE_URL}products/?count=${this.requestCount}&&page=${this.requestPage}&&category=${this.category}`
     toggleDialog = (details) =>{
        this.setState({dialog:details})
     }
     componentDidMount = async() =>{
        authenticateResponse(()=>axios.get(this.queryUrl))
        .then(({data})=>{
                this.setState({products:[...data], requestTotal: data.total})
        }).catch(err=>console.log(err.response))
     }
     handleSearch = async(category, search) =>{
      const queryUrl = `${API_BASE_URL}products/?count=${this.requestCount}&&page=${this.requestPage}&&category=${category}&&search=${search}`
      this.category = category
        const result = await axios.get(queryUrl)
        const products = result.data?.data
        Array.isArray(products) && this.setState({products, requestTotal: result.data.total, currentSearch: search})
     }

     handleLoadMore = async()=>{
      this.requestPage += 1
      const queryUrl = `${API_BASE_URL}products/?count=${this.requestCount}&&page=${this.requestPage}&&category=${this.category}`
      authenticateResponse(()=>axios.get(queryUrl))
      .then(({data})=>{
         this.setState({products:[...this.state.products, ...data.data, ], requestTotal: data.total})
      }).catch(err=>console.log(err.response))
     }
    
    render() {
        return (<div className="shop" >
            <Consent message={this.state.dialog?.message} status={this.state.dialog?.status} controller={()=>{this.setState({dialog:null})}} />
            <Back />
            <SearchSection
             initial={this.initial || "All"}
              categories={categories}
               handleSearchChange={this.handleSearch} />
               {this.state.currentSearch && <p style={{color: "lightgray"}} >
                  {this.state.requestTotal} results for "{this.state.currentSearch}"</p>}
            <Products products={this.state.products} />
            {this.state.requestTotal - this.state.products?.length > 0 && <button className="more" onClick={this.handleLoadMore} >load more</button>}

            <JumiaProducts displayMessage={this.toggleDialog} keyword={this.state.currentSearch?.trim().length?this.state.currentSearch:this.category} />
        </div>);
    }
}
 
export default Shop;