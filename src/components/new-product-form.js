import axios from "axios";
import React from "react";
import "./styles/new-product-form.css";
import Select from "react-select";
import Joi from "joi";

const CLOUDINARY_PRESET = "stghocrq";
const cloudName = "lahri";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const queryUrl = process.env.REACT_APP_API_BASE_URL + "products";

class CreateProductForm extends React.Component{

    state = { 
        newProduct:{
            name:null,
            price:null,
            description:null,
            category:null,
            quantity:null,
            preview_image_url:null,
            more_images_url:null
        },
        files:{
          preview_image:null,
          more_images:null
        },
        validated:false
      }

      schema = {
          category:Joi.string().required(),
          name:Joi.string().min(3).required(),
          description: Joi.string().min(3).required(),
          price:Joi.number().min(1).required(),
          quantity:Joi.number().min(1).required(),
          preview_image:Joi.array().min(1).required(),
          more_images: Joi.array().min(1).required(),
          
        }
      validateInput = () =>{

        const {category, name, description, price, quantity} = this.state.newProduct
        const {preview_image, more_images} = this.state.files
        const res = Joi.object(this.schema).validate({category, name, description, price, quantity, preview_image, more_images})
        console.log(res)
        if(!res.error){
          return this.setState({validated:true})
        }
        return this.setState({validated:false})
      }

      showMessage = (type) =>{
        alert(`this is a ${type} message`)
      } 

      updateField= (e) =>{
        this.setState({newProduct:{...this.state.newProduct, [e.target.id]:e.target.value}},this.validateInput())
        
      }

      handleSelect = (e) =>{
        this.setState({newProduct:{...this.state.newProduct, category:e.value}},this.validateInput())
      }

      updateFile =(e) =>{
        this.setState({files:{...this.state.files,[e.target.id]:Array.from(e.target.files)}},this.validateInput())
        
      }

      handleSubmit = async(e) =>{
        function extractUrl(data){
          return data.map(({data})=>data.secure_url)
        }
        e.preventDefault()
        if(!this.state.validated) return;
        try {
        let preview_image_url = await this.uploadFiles(this.state.files.preview_image)
        preview_image_url = extractUrl(preview_image_url)[0]
        console.log({preview_image_url})
        let more_images_url = await this.uploadFiles(this.state.files.more_images)
        more_images_url = extractUrl(more_images_url)
        this.setState({newProduct:{...this.state.newProduct,preview_image_url,more_images_url}})
        console.log(this.state.newProduct)
        if(!this.state.newProduct.more_images_url || !this.state.newProduct.preview_image_url)throw Error("error: could not create product")
        const newProduct = await axios.post(queryUrl,this.state.newProduct)
        } catch (error) {
          return this.showMessage("error")
        }

      }

      uploadFiles = (fileList) =>{
        const formData = new FormData()
        return Promise.all(fileList.map(async(file)=>{
          formData.append("upload_preset",CLOUDINARY_PRESET)
          formData.append("file",file)
          return await axios.post(CLOUDINARY_URL,formData)
        }))
      }

    render(){
      const selectOptions = [
        {value:"Phones and Tablets",label:"Phones and Tablets"},
        {value:"Laptops and MacBooks",label:"Laptops and MacBooks"},
        {value:"Headphones",label:"Headphones"},
        {value:"Watches",label:"Watches"},
        {value:"Power Banks",label:"Power Banks"},
        {value:"Others",label:"Others"},
      ]
        return ( <form onChange={()=>{this.validateInput()}} className={"new-product"}>

                    <p className="head">Welcome Admin</p>
                    <p className="writeup">dont forget to add product descriptions and other sales promoting info.</p>
                    <label>category</label>
                    <Select 
                    onChange={(e)=>{this.handleSelect(e)}}
                    options={selectOptions}
                    id={"select"}
                    className="select"
                     />
                     <label className="qty">quantity</label>
                    <input type={"number"} min={1} id={"quantity"} onChange={(e)=>{this.updateField(e)}} />
                    <label>name</label>
                    <input type={"text"} id={"name"} onChange={(e)=>{this.updateField(e)}} />
                    <label>price</label>
                    <input type={"number"} id={"price"} onChange={(e)=>{this.updateField(e)}} />
                    <label>description</label>
                    <textarea id="description" maxLength={125} onChange={(e)=>{this.updateField(e)}}>
                    </textarea>
                    <label>preview image</label>
                    <input className="file" type={"file"} id={"preview_image"} onChange={(e)=>{this.updateFile(e)}} />
                    <label>more images</label>
                    <input type={"file"} className="file" multiple id={"more_images"} onChange={(e)=>{this.updateFile(e)}} />
                    <button className={`${this.state.validated?"active":""}`} onClick={(e)=>{this.handleSubmit(e)}} >submit</button>


                </form> )
    }
    
}
 
export default CreateProductForm;