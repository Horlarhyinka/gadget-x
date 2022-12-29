import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/preview.css"
import axios, { Axios } from "axios";
import RelatedProducts from "../components/related";
import { authHOC } from "./HOC/auth-hoc";
import Jumia from "../components/jumia";
//import bgimg from "../components/bgimg.jpg"


const Preview = () => {
    const {id} =  useParams()
    const queryUrl = "http://localhost:2003/api/v1/products/"+id
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
    },[queryUrl])

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

    
    return !info?<h1 className="preview-failed">unable to preview this product...</h1>:( <div className="product-preview">
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
            const token = localStorage.getItem("x-auth-token")
            axios.post("http://localhost:2003/api/v1/cart/"+id,{},{headers:{"x-auth-token":token}})
            window.location.assign("/cart")
        }} className="checkout-btn">Add to cart</div>
        <form></form>
        <RelatedProducts />
        <Jumia keyword={info.name} className="jumia" />
        
    </div> );
}
 
export default Preview;