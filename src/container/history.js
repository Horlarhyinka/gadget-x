import axios from "axios";
import React from "react";
import HistoryCard from "../components/history-card";
import { getAuthToken, authenticateResponse } from "../functions/auth";
import "./styles/history.css";
import { authHOC } from "./HOC/auth-hoc";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

let queryUrl =  API_BASE_URL + "history"
let retryUrl = API_BASE_URL + "payment/pay"
class History extends React.Component {
    state = { 
        history:[]
     } 
     componentDidMount = async() =>{
        const response = await authenticateResponse(()=>axios.get(queryUrl,{headers:{"x-auth-token":getAuthToken()}}))
        let history = response.data.data.reverse()
        this.setState({history})
     }
     retry = async(items) =>{
        // <--make api call -->
       items =items.map(({_id,quantity})=>({id:_id, quantity}))
        const res = await axios.post(retryUrl,{items},{headers:{"x-auth-token":getAuthToken()}})
        const redirectUrl = res.data.data
        if(redirectUrl)return window.location.assign(redirectUrl)
        }
    render() {
        return (<div className="history">
            <h4>history</h4>
            <div className="card-list">
                {
                this.state.history.length >= 1 ? this.state.history.map(history=><HistoryCard retry={this.retry} key={history._id} history= {history} />):<h1 className="null" >you have no history yet</h1>
            }
            </div>
        </div>);
    }
}
 
export default authHOC(History);