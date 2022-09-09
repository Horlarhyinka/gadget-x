import axios from "axios";
import { Component } from "react";
import Productslist from "./productslist";
import Select from "react-select";import "./styles/admin_home.css";


class AdminProducts extends Component{
     constructor(){
        super()
        this.state = {
            products:null,
            search:"",
            categoryfilter:""
        }
        this.endpoint = "http://localhost:2003/api/v1/products"

        this.cat_options = [
            {label:"all",value:"all"},
            {label:"phones and tablets",value:"phones and tablets"},
            {label:"laptops and macbooks",value:"laptops and macbooks"},
            {label:"headphones",value:"headphones"},
            {label:"powerbanks",value:"powerbanks"},
            {label:"others",value:"others"}
        ]

    }
async componentDidMount(){
        const prods = await axios.get(this.endpoint,{method:"GET"}).then(res=>{
            return res.data
        })
        this.setState({products:prods})
    }
    render(){
        // const displayProducts = this.state.products.map(product =>{
        //         return (<Card key={product._id} props={product} />)
        // })
    return  !this.state.products ? 
            <h1 className="notfound">no products available</h1>:
            <div>
                <Select onChange={(e)=>{this.setState({categoryfilter:e.value})}} placeholder="select category" options={this.cat_options} />
                <input type="text" onChange={(e)=>{this.setState({search:e.target.value})}} name="search" placeholder = "search products..." className="search" />
                <Productslist search={this.state.search} products={this.state.products} category={this.state.categoryfilter} />
            </div>
            
    }
}
export default AdminProducts