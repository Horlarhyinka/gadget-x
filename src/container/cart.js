import axios from "axios";
import React from "react";
import Card from "../components/cart_card";
import {authHOC} from "./HOC/auth-hoc";


class Cart extends React.Component{
    constructor(){
        super()
        this.queryUrl = "http://localhost:2003/api/v1/cart"
        this.state={
            cart:[],
            message:""
        }
    }
    componentDidMount = () =>{
        const token = localStorage.getItem("x-auth-token")
        if(!token)return window.location.reload()
        //reloading renders authentication screen
        axios.get(this.queryUrl,{
            headers:{
                "x-auth-token":token
            }
        }).then(({data})=>{
            let counter = 0
            const collated = data.cart.map(prod=>{
                counter++
                return {
                    info:{...prod},
                    indx:counter,
                    quantity:1,
                    total:prod.price
                }
            }
            
            )
            this.setState({cart:collated})
        }
            )
        }

        updatePrice = (item) =>{
            item.total = item.info.price * item.quantity
            return item
        }

    removeFromCart = async(id) =>{
        const token = localStorage.getItem("x-auth-token")
        const respond = await axios.delete(this.queryUrl+"/"+id,{headers:{"x-auth-token":token}})
        this.setState({cart:this.state.cart.filter((el)=>{
            return el.info._id !== id
        })})
    }

    clearCart = async() =>{
       const res = await axios.delete(this.queryUrl)
       this.setState({cart:[]})
    }

    increment = (indx) =>{
        const newCart = this.state.cart.map((itm)=>{
            if(itm.indx == indx){
                itm.quantity++
                itm = this.updatePrice(itm)
            }
            return itm
        })
        console.log(newCart)
        this.setState({cart:[...newCart]})
    }

    decrement = (indx) =>{
        const newCart = this.state.cart.map((itm)=>{
            if(itm.indx == indx){
                if(itm.quantity > 1){
                   itm.quantity--
                itm = this.updatePrice(itm) 
                }
            }
            return itm
        })
        this.setState({cart:newCart})
    }

    purchaseCart = () =>{
    // <--make api call -->
    const toBePurchased = this.state.cart.map(({info,quantity})=>{
        const {id} = info
        return {id, quantity}
    })

    }

    purchaseCallback = () =>{
        // <--await api call -->

    }

    total = this.state.cart.reduce((sum,{total})=>{
        return sum+= total

    },0)
    

    render(){
        return !this.state.cart.length?(<h1>no items here</h1>):this.state.cart.map(({info:data, indx, quantity, total})=>{
            return <Card key={indx}
             id={data._id}
             indx={indx}
              name={data.name}
               img={data.preview_image_url}
                quantity={quantity}
                 price={total}
                 increment = {this.increment}
                 decrement = {this.decrement}
                 removeFromCart = {this.removeFromCart}
                  />
        })
    }
}
 
export default authHOC(Cart);