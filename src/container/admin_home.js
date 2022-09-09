
import { Component } from "react";
import {UploadForm } from "./form";
import AdminProducts from "./admin_product_list";

class AdminHome extends Component{
    constructor(){
        super();
        this.state = {
            OverlayOpen:false,
            categoryfilter:""
        }


    }


    render(){
        return ( <div className="admin">
        <h1 className="admin_header" >welcome admin </h1>
            <h4>Upload a new product</h4>
            <UploadForm states={this.state} />
            <h4>modify products</h4>
            <form className="rm_cat">
                <label>select category</label>
                </form>
            <div className="products">
                <AdminProducts categoryfilter={this.state.categoryfilter} />
            </div>
       
    </div> );
    }
}

export default AdminHome;