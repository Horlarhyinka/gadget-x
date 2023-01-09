import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/preview.css"
import axios from "axios";
import RelatedProducts from "../components/related";
import Jumia from "../components/jumia";
import { getAuthToken } from "../functions/auth";
//import bgimg from "../components/bgimg.jpg"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
const Preview = () => {
    const {id} =  useParams()
    const queryUrl = API_BASE_URL+"products/"+id
    const [info, setInfo] = useState()
    let [images,setImages] = useState([])
    let [curImg, setCurImg] = useState()
    let [comments,setComments] = useState()
    useEffect(()=>{
    axios.get(queryUrl).then(res=>{
        setInfo(res.data)
        let {preview_image_url, more_images_url, comments} = res.data
        setImages([preview_image_url,...more_images_url])  
        setCurImg(preview_image_url)
        setComments(comments)
    })
    },[])

    const commentsList = comments && comments.map(comment=>{
        let date = new Date()
        const {createdAt} = comment
        return (<div key={comment._id} className="comment">
            <p className="comment-body">{comment.comment}</p>
            <aside>{date.getFullYear(createdAt)}-{date.getMonth(createdAt)}-{date.getDate(createdAt)}</aside>
        </div>)
    })

const imagesList = images.map(image=>{
    const handleClick = () => setCurImg(image)
    return <img className="mini-image" alt="" onClick={handleClick} src={image} key={image} id={image} />
})

    
    return !info?<h1 className="preview-failed">unable to preview this product...</h1>:( 
    <div className="product-preview">
        <img className="preview-image" src={curImg} alt={info.name} label={info.name} />
        <small>click images to preview {">>>"}</small>
        <div className="image-list">{imagesList}</div>
        <h1 className="preview-name">{info.name}</h1>
        <strong className="preview-price">{info.price}$</strong>
        <div className="preview-comments">
            {commentsList.length?<div><h4>comments</h4>
            {commentsList}</div>:<p className="no-comment">no comments yet</p>}
        </div>
        <div onClick={()=>{
            const token = getAuthToken()
            axios.post(API_BASE_URL+"cart/"+id,{},{headers:{[tokenName]:token}})
            window.location.assign("/cart")
        }} className="checkout-btn">Add to cart</div>
        <form></form>
        <RelatedProducts />
        <Jumia keyword={info.name} className="jumia" />
        
    </div> );
}
 
export default Preview;