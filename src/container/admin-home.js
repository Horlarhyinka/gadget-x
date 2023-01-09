import axios from "axios";
import React from "react";
import AdminProducts from "../components/admin-products";
import CreateProductForm from "../components/new-product-form";
import "./styles/admin_home.css"


class AdminHome extends React.Component {
    queryUrl = process.env.REACT_APP_API_BASE_URL + "products"
    state = { 
        products:[]
     } 

     componentDidMount = async() =>{
        const res = await axios.get(this.queryUrl)
        this.setState({products:res.data})
     }

    render() { 
        return (<div className="admin-home">
            <CreateProductForm />
            <AdminProducts products={this.state.products} />
        </div>);
    }
}
 
export default AdminHome;