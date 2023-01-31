import axios from "axios";
import React from "react";
import AdminProducts from "../components/admin-products";
import CreateProductForm from "../components/new-product-form";
import "./styles/admin_home.css";
import adminAuthHOC from "./HOC/admin-auth-hoc";
import { Icon } from '@iconify/react';
import { authenticateResponse, getAdminAuthToken } from "../functions/auth";



class AdminHome extends React.Component {
    queryUrl = process.env.REACT_APP_API_BASE_URL + "products"
    state = { 
        products:[]
     } 
     products = []

     componentDidMount = async() =>{
        const {data} = await axios.get(this.queryUrl)
        this.products = data
        this.setState({products:data})
     }

     handleSearch = (e) =>{
        const val = remChar(e.target.value)
        const products = this.products.filter(({name, description, price, category})=>{
            name = remChar(name)
            description = remChar(description)
            category = remChar(category)
            price = parseInt(price)
            return name?.includes(val) || val?.includes(name) || description?.includes(val) || val?.includes(description) || val?.includes(category) || category?.includes(val) || price - parseInt(val) <= Math.abs(1000)
        })
        this.setState({products})
        function remChar(val){
            return val?.toLowerCase().replace(/[\-\.\s]/,"")
        }
     }

    render() {
        return (<div className="admin-home">
            <div className="new-admin"><button onClick={()=>{window.location.assign("/admin/new")}}><Icon icon="mdi:user-add" /> new admin</button></div>
            <CreateProductForm />
            <AdminProducts handleSearch={this.handleSearch} products={this.state.products} />
        </div>);
    }
}
 
export default adminAuthHOC(AdminHome);