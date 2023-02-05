import axios from "axios";
import React from "react";
import "./styles/home.css";
import ProductCard from "../components/product-card";
import amazon from "../assets/amazon.png";
import jumia from "../assets/jumia.png";
import { Link } from "react-router-dom";
import { categories } from "../assets/datas";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

class Home  extends React.Component {
    state = {
      latest:[],
      categories:[],
      newsEmail:null,
      results:[],
      products:null
    } 
    newsLetterRef = React.createRef()
    searchRef = React.createRef()
    
    componentDidMount = async() =>{
      const queryUrl = API_BASE_URL + "products";
      const products = await axios.get(queryUrl)
      this.setState({categories,latest:products.data.sort((a,b)=>a.updatedAt > b.updatedAt).slice(0,21),products:products.data})
    }

    handleNewsLetter = async() =>{
      const email = this.newsLetterRef.current?.value
      if(!email)return;
      const queryUrl = API_BASE_URL + "news";
      const res = await axios.post(queryUrl,{email})
      if(res.status !== 200)return alert("error, could not subscribe to news-letter")
      this.newsLetterRef.current.value = ""
      alert("thanks for subscribing to our newsletter")
    }

    renderCategories = () =>{
      let i = 0;
      return <ul>
        {
        categories.map(({image,type})=>{
          i++;
          return <li key={i} ><Link to={"/shop?initial="+type.replace("&","and")}><img src={image} /><p>{type}</p></Link></li>
        })}
      </ul>
    }

    renderLatest = () =>{
      return <ul>
        {
          this.state.latest.map(({_id:id, name, description,preview_image_url:img , price}) =><Link key={id} to={"/products/"+id} ><ProductCard id={id} img={img} name={name} description={description} price={price} /></Link>)
        }
      </ul>
    }

    renderSearchResults = () =>{
      return <ul>
        {
        this.state.results?.map(({_id:id, name, description, category})=>{
        if((name+description)?.length > 60){
          description = description.slice(0,(61-name.length))
        }
      return <li key={id} ><Link to={`/products/${id}`} >
                  <p className="name">{name} - {description}</p>
                  <p className="category">{category}</p>
                  </Link>
              </li>})
        }
      </ul>
    }

    updateSearchResult = () =>{
      const value = this.searchRef.current.value?.toLowerCase().trim()
      if(!value)return this.setState({results:[]});
      return this.setState({results:this.state.products.filter(({name, category})=>{
        name = name?.toLowerCase()
        category = category?.toLowerCase()
        return name?.includes(value) || value.includes(name) || category?.includes(value) || value.includes(category)})})
    }

    render() { 
        return (<div className="home">
          <div className="preview-banner">
            <div className="writeup">
              <h1>Shopping made easier.</h1>
              <p>premium products with uptimized shopping experience.</p>
              <Link to={"/shop"} ><button className="cta" >start shopping</button></Link>
            </div>
            <ul>
              <li><img src={"https://res.cloudinary.com/lahri/image/upload/v1674320076/gadget-x/Ellipse_1_qthaq9.png"} /></li>
              <li><img src={"https://res.cloudinary.com/lahri/image/upload/v1674320076/gadget-x/Ellipse_6_ryru28.png"} /></li>
              <li><img src={"https://res.cloudinary.com/lahri/image/upload/v1674320076/gadget-x/Ellipse_2_hstin9.png"} /></li>
              <li><img src={"https://res.cloudinary.com/lahri/image/upload/v1674320076/gadget-x/Ellipse_3_arspwg.png"} /></li>
            </ul>
          </div>
          <div className="search" >
            <label>search products or categories</label>
            <input ref={this.searchRef} onChange={()=>this.updateSearchResult()} />
            {this.renderSearchResults()}
          </div>
          <div className="section categories" >
            <h1>Categories</h1>
            {this.renderCategories()}
          </div>
          <div className="section latest" >
            <h1>Latest</h1>
            {this.renderLatest()}
          </div>
          <div className="preview-banner partner" >
            <h1>Our partners</h1>
            <p>we uptimize customers satisfaction by collaborating with leading e-commerce companies and sharing data to improve shopping experience.</p>
            <Link to={"/shop"} ><button className="cta">start shopping</button></Link>
            <div className="partners">
              <img src={amazon} alt={"amazon"} />
              <img src={jumia} alt={"jumia"} />
            </div>
          </div>
          <div className="section news-letter">
            <h1>News letter</h1>
            <p>subscribe to our newsletter and get notified about updates on our inventory.</p>
            <input placeholder="example@gmail.com" ref={this.newsLetterRef} />
            <button onClick={()=>this.handleNewsLetter()} >subscribe</button>
          </div>
          </div>);
    }
}
 
export default Home;