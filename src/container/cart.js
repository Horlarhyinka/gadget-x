import axios from "axios";
import React from "react";
import Back from "../components/back";
import Card from "../components/cart_card";
import CartSummary from "../components/cart_summary";
import { getAuthToken, authenticateResponse } from "../functions/auth";
import {authHOC} from "./HOC/auth-hoc";
import "./styles/cart.css";


const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
class Cart extends React.Component{

        queryUrl = API_BASE_URL + "cart"
        state={
            cart:[],
            message:"",
            btnStatus:""
        }

    componentDidMount = () =>{
        const token = getAuthToken()
        if(!token)return window.location.reload()
        authenticateResponse(()=>axios.get(this.queryUrl,{
            headers:{
                [tokenName]:token
            }
        })).then(({data})=>{
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
        net = () => this.state.cart.reduce((acc,unit)=>{
            return acc + parseInt(unit.total)
        },0)

        delivery = (Math.random()*1000).toFixed(2)

        updatePrice = (item) =>{
            item.total = item.info.price * item.quantity
            return item
        }

    removeFromCart = async(id) =>{
        const token = getAuthToken()
        await authenticateResponse(()=>axios.delete(this.queryUrl+"/"+id,{headers:{[tokenName]:token}}))
        this.setState({cart:this.state.cart.filter((el)=>{
            return el.info._id !== id
        })})
    }

    clearCart = async() =>{
       await authenticateResponse(()=>axios.delete(this.queryUrl,{headers:{[tokenName]:getAuthToken()}}))
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

    purchaseCart = async() =>{
    // <-- make api call -->
    const items = this.state.cart.map(({info,quantity})=>{
        const {_id} = info
        return {id:_id, quantity}
    })
    if(!this.state.btnStatus)return
    const {data} = await authenticateResponse(()=>axios.post(API_BASE_URL+"payment/pay",{items},{headers:{[tokenName]:getAuthToken()}}))
                        .then(({data})=>{
                                const redirectUrl = data?.data
                                if(redirectUrl)return window.location.assign(redirectUrl)
                        })

    }

    handleCheckbox = (e) =>{
        if(e.target.checked && this.net()>0)return this.setState({btnStatus:"btn-active"})
        return this.setState({btnStatus:""})
    }


    total = this.state.cart.reduce((sum,{total})=>{
        return sum+= total

    },0)
    

    render(){
        return <div className="cart">
            <Back url={"/shop"} />
            {this.state.cart.length>=1 && this.state.cart.map(({info:data, indx, quantity, total})=>{
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
        })}
        <strong style={{
            display:"block",
            color:"red",
            margin:"25px 0px 25px 85px",
            textAlign:"left",
            cursor:"pointer"
        }}
        onClick={()=>{
            this.clearCart();
            window.location.assign("/shop")
        }}
        >clear cart</strong>
        <CartSummary net={this.net()} delivery={this.delivery} />
        <div className="acknowledge">
           <p>i hereby acknowledge the above bill</p>
        <input onChange={(e)=>{this.handleCheckbox(e)}} required type={"checkbox"} /> 
        </div>
        <button onClick={()=>{this.purchaseCart()}} className={this.state.btnStatus}>Checkout</button>
        </div>
    }
}

 
export default authHOC(Cart);