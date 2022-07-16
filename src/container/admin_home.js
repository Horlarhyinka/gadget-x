
import Select from "react-select";
import { useEffect, useState } from "react";
import "./styles/admin_home.css"
const Admin_home = () => {

    const cat_options = [
        {label:"phones and tablets",value:"phones and tablets"},
        {label:"laptops and macbooks",value:"laptops and macbooks"},
        {label:"headphones",value:"headphones"},
        {label:"powerbanks",value:"powerbanks"},
        {label:"others",value:"others"}
    ]

    return ( <div>
        <h1 className="admin_header" >welcome admin </h1>
            <h4>Upload a new product</h4>
            <form className="upload_form">
                <label>select product category</label>
                <Select options={cat_options} />
                <label>input product name</label>
                <input type={"text"} name={"name"} />
                <label>input product price</label>
                <input type={"text"} name={"price"}/>
                <label>upload image</label>
                <input type={"file"} name={"prev_image"} />
                <label>input more images</label>
                <input type={"file"} name={"more_images"} /><br/>
                <button className="upload_btn">upload</button>
            </form>

            <h4>remove a product</h4>
            <form className="rm_cat">
                <label>select category</label>
                <Select options={cat_options} />
            </form>
            <div className="rm">
                
            </div>
       
    </div> );
}
 
export default Admin_home;