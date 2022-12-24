import axios from "axios";
import { Component } from "react";
import {authHOC} from "./HOC/auth-hoc";
class Cart extends Component{
    constructor(){
        super()
        this.queryUrl = ""
        this.state={
            cart:[],
            message:""
        }
    }
    componentDidMount = () =>{
        axios.get(this.queryUrl).then(({data})=>{
            
        })
       return
    }

    removeFromCart = async(id) =>{
        const respond = await axios.delete(this.queryUrl+"/"+id)
        this.setState({cart:respond.data["cart"]})
    }

    clearCart = async() =>{
       const res = await axios.delete(this.queryUrl)
       this.setState({cart:[]})
    }

    increment = (id) =>{
        const target = this.state.cart.find((prod)=>{
            return prod._id == id
        })

    }

    decrement = (id) =>{

    }

    purchaseCart = () =>{
    // <--make api call -->
    }

    purchaseOne = () =>{
        // <--make api call -->
    }

    purchaseCallback = () =>{
        // <--await api call -->

    }


    render(){
        return (<h1>cart here</h1>)
    }
}
 
export default Cart;