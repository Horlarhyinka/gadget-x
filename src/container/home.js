import {Component} from "react";
import "./styles/home.css";
import { Icon } from '@iconify/react';
import Top from "../components/top";
import Categories from "../components/categories";
import Reviews from "../components/reviews";
import { Link } from "react-router-dom";

const img_uri = "https://res.cloudinary.com/lahri/image/upload/v1665172022/otztpwt9okj5hfoykxzl.png"
class Home  extends Component {
    state = {products:[]} 
    render() { 
        return (<div className="home">
           <div className="previewsection">
           <img className="prev_img" src={img_uri} />
           <div>
             <span className="writeup">
            Gadget is luxury
           </span>
           <span className="writeup">
            Luxury is comic
           </span>
           <Link to={"/shop/All"} className="cta">
            <span>Shop</span>
            <Icon className="arr" icon="material-symbols:arrow-circle-right-rounded" />
           </Link>
           </div>
           </div>
  
           <Top/>
          <Categories/>
          <Reviews />
        </div>);
    }
}
 
export default Home;