import axios from "axios";
import React from "react";
import "./styles/comments.css";
import { useParams } from "react-router-dom";
import { getAuthToken, getMail } from "../functions/auth";
import {authHOC} from "./HOC/auth-hoc";
import { Icon } from "@iconify/react";
import CommentCard from "../components/comment-card";
import Back from "../components/back";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME

const Comments = () => {
    const {id} = useParams()
    const [comments, setComments] = React.useState(null)
    const email = getMail()
    const headerToken = {[tokenName]:getAuthToken()}

    const queryUrl = `${API_BASE_URL}products/${id}/comments`

    React.useEffect(()=>{
        axios.get(queryUrl,{headers:headerToken}).then((res)=>{
            const {data} = res;
            if(data.length < 1)return setComments(null)
            return setComments(data.reverse())
        })
    },[])
    const commentRef = React.createRef()
    const handleComment = async() =>{
        const body = commentRef.current.value?.trim()
        if(!body)return;
        //api call
        const {data} = await axios.post(queryUrl,{email,body},{headers:headerToken})
        setComments(data.data.sort((a,b)=>b.updatedAt-a.updatedAt))
        commentRef.current.value = null
    }

    const renderComments = () =>{
        return comments?.map(
            ({email, body, _id:id, updatedAt})=>{
            return <CommentCard key={id} email={email} id={id} body={body} updatedAt={updatedAt}  />})
    }
    return ( <div className={"comments-page"}>
                <Back url={"/products/"+id} />
                <ul className="comments" >
                    {comments?renderComments():<h1 className="null">no comments yet</h1>}
                </ul>
                    <input ref={commentRef} placeholder="type a comment" type={"text"} />
                <button onClick={()=>handleComment()} className="send"><Icon className="icn" icon="ri:send-plane-fill" color="white" /></button>
            </div> )
        }
 
export default authHOC(Comments);