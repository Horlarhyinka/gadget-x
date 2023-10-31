import axios from "axios";
import React from "react";
import AdminProducts from "../components/admin-products";
import CreateProductForm from "../components/new-product-form";
import "./styles/admin_home.css";
import adminAuthHOC from "./HOC/admin-auth-hoc";
import { Icon } from '@iconify/react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

class AdminHome extends React.Component {
    requestCount = 10
    state = { 
        products:[],
        requestTotal: 0,
     }
     requestPage = 1
     getUrl = (obj) =>`${API_BASE_URL}products/?count=${ this.requestCount }&&page=${obj?.requestPage || this.requestPage}&&search=${obj?.search || "all"}`

     componentDidMount = async() =>{
       const data = await this.requestProducts(this.getUrl())
        this.setState({products:data.data, requestTotal: data.total})
     }

     requestProducts = async(url) =>{
      const {data} = await axios.get(url)
      return data
     }

     handleSearch = async(search) =>{
        this.requestPage = 1
        const data = await this.requestProducts(this.getUrl({search}))
          this.requestPage = data.page
          Array.isArray(data.data) && this.setState({products: data.data, requestTotal: data.total})
     }

     handleLoadMore = async() =>{
      this.requestPage += 1
      const data = await this.requestProducts(this.getUrl())
      this.requestPage = data.page
      Array.isArray(data.data) && this.setState({products: [...this.state.products, ...data.data], requestTotal: data.total})
   }

    render() {
        return (<div className="admin-home">
            <div className="new-admin"><button onClick={()=>{window.location.assign("/admin/new")}}><Icon icon="mdi:user-add" /> new admin</button></div>
            <CreateProductForm />
            <AdminProducts handleSearch={this.handleSearch} products={this.state.products} />
            {this.state.requestTotal - this.state.products?.length > 0 && <button className="more" onClick={this.handleLoadMore} >load more</button>}
        </div>);
    }
}
 
export default adminAuthHOC(AdminHome);