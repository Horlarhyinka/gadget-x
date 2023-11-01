import axios from "axios";
import React from "react";
import "./styles/home0.css";
import ProductCard from "../components/product-card";
import { Link } from "react-router-dom";
import categories from "../assets/categories";
import Consent from "../components/consent";
import image1 from "../../public/gadgets-img-01.png";
import ReviewCard from "../components/review-card";
import reviews from "../assets/reviews";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

class Home  extends React.Component {
    state = {
      latest:[],
      newsEmail:null,
      results:[],
      dialog:null,
      productsCount: 0
    } 
    requestSize = 2
    requestPage = 1
    newsLetterRef = React.createRef()
    searchRef = React.createRef()

    productsQueryUrl = API_BASE_URL + `products?count=${this.requestSize}&&page=${this.requestPage}`

    setDialog = (info) =>{
      this.setState({dialog:info})
    }
    
    componentDidMount = async() =>{
      try{
      const response = await axios.get(this.productsQueryUrl)
      const products = response.data.data
      this.setState(state=>({
        latest:products
        // .sort((a,b)=>{
        // const aFactor = new Date(a.updatedAt).getTime()
        // const bFactor = new Date(b.updatedAt).getTime()
        // return bFactor - aFactor})
        ,
        productsCount: response.data?.total
      }))
      }catch(ex){
        return this.setDialog({message: ex.response?.data?.message || "Network error", status:"failed"})
      }
    }


    handleLoadMore = async () => {
      if (!this.state.latest.length) return;
      const newPage = this.requestPage + 1;
      this.requestPage++
      try {
        const response = await axios.get(
          API_BASE_URL + `products?count=${this.requestSize}&&page=${newPage}`
        );
    
        const products = response.data.data;
        this.setState((prevState) => ({
          productsCount: response.data.total,
          latest: [...prevState.latest, ...products
          //   .sort((a, b) => {
          //   const aFactor = new Date(a.updatedAt).getTime();
          //   const bFactor = new Date(b.updatedAt).getTime();
          //   return bFactor - aFactor;
          // })
        ],
        }));
      } catch (ex) {
        return this.setDialog({
          message: ex.response?.data?.message || "Network error",
          status: "failed",
        });
      }
    };
    
    handleNewsLetter = async () => {
      const email = this.newsLetterRef.current?.value;
      const exp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email) return;
      if (!exp.test(email)) return this.setDialog({ message: "please enter a valid email", status: "info" });
      const queryUrl = API_BASE_URL + "news";
      const res = await axios.post(queryUrl, { email });
      if (res.status !== 200) return this.setDialog({ message: "successful...Thank you for subscribing!!! :)", status: "failed" });
      this.setState({ newsEmail: email }); // Update the email in the state
      this.newsLetterRef.current.value = "";
      return this.setDialog({ message: "successful...Thank you for subscribing!!! :)", status: "success" });
    };
    

    renderCategories = () =>{
      let i = 0;
      return <ul className="categories" >
        {
        categories?.map(({image,type, description})=>{
          i++;
          return <li key={i} ><Link to={"/shop?initial="+type.replace("&","and")}><img src={image} />
          <div><p className="type" >
            {type}</p><p className="description" >{description}</p></div>
          </Link></li>
        })}
      </ul>
    }

    renderLatest = () =>{
      return <ul >
        {
          this.state.latest.map(({_id:id, name, description,preview_image_url:img , price}, i) =>{
          return <Link key={id} to={"/products/"+id} >
                    <ProductCard id={id} img={img} name={name} description={description} price={price} />
                </Link>
        })
        }
      </ul>
    }

    renderReviews = () =>{
      return <ul style={{display: "flex", overflowX: "scroll"}} >
        {
          reviews.map(review=><ReviewCard userName={review.name} avatar={review.avatar} comment={review.comment} />)
        }
      </ul>
    }

    render() { 
        return (<div className="home">
           <Consent message={this.state.dialog?.message} status={this.state.dialog?.status} controller={()=>this.setState({dialog:null})} />
          <section className="preview" >
          <div className="write-up" >
          <h1>Discover Luxury in Gadgets</h1>
          <p>We provide guaranteed, secure and reliable shopping experience. We are well known for our ability to deliver.</p>
          
            <Link to={"/shop"} ><button className="cta" >shop now</button></Link></div>
            <img src={image1} alt="" />
          </section>
          <br></br>
            <h1 className="sub-header" style={{textAlign: "left"}} >Categories</h1>
            {this.renderCategories()}
          <h1 className="sub-header" ></h1>
          <br></br>
            <h1 className="sub-header">Trending products.</h1>
            <p >here are some trending products you should try</p>
            {this.renderLatest()}
            {this.state.productsCount - this.state.latest?.length > 0 && <button className="more" onClick={this.handleLoadMore} >load more</button>}
           {/* <h1 className="sub-header"  > what people say about us. </h1>
          <p> here are some reviews from our clients.</p>
          {this.renderReviews()}
          <h1 className="sub-header">FAQs</h1>
          <div className="faqs" >
            <details>
              <summary>Can I return the product if it's not up to my expectations?</summary>
              <p>yes, you can return the product within 14 days after delivery.</p>
            </details>
            <details>
              <summary>Can I return the product if it's not up to my expectations?</summary>
              <p>yes, you can return the product within 14 days after delivery.</p>
            </details>
            <details>
              <summary>Can I return the product if it's not up to my expectations?</summary>
              <p>yes, you can return the product within 14 days after delivery.</p>
            </details>
            <details>
              <summary>Can I return the product if it's not up to my expectations?</summary>
              <p>yes, you can return the product within 14 days after delivery.</p>
            </details>
          </div>
            <Consent message={this.state.dialog?.message} status={this.state.dialog?.status} controller={()=>this.setState({dialog:null})} />
            <h1 className="sub-header" >subscribe to our newsletter</h1>
            <p>subscribe to our newsletter and get notified about updates on our inventory.</p>
            <input className="news-letter" type= "email" placeholder="example@gmail.com" ref={this.newsLetterRef} />
            <button className="news-letter" onClick={()=>this.handleNewsLetter()} >subscribe</button> */}
          </div>);
    }
}
 
export default Home;