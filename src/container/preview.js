import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/preview.css"
import axios from "axios";
import RelatedProducts from "../components/related";
import Jumia from "../components/jumia";
import { authenticateResponse, getAuthToken, getUserId } from "../functions/auth";
import Back from "../components/back";
import { Icon } from "@iconify/react";
import { numberToPrice } from "../functions/factory";
import Consent from "../components/consent";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const tokenName = process.env.REACT_APP_AUTH_TOKEN_NAME
const Preview = () => {
    const {id} =  useParams()
    const queryUrl = API_BASE_URL+"products/"+id
    const [info, setInfo] = useState(null)
    let [images,setImages] = useState([])
    let [curImg, setCurImg] = useState()
    let [comments,setComments] = useState()
    const [dialog, setDialog] = useState(null)

    const displayMessage = (info) =>{
        setDialog(info)
    }

    useEffect(()=>{
    axios.get(queryUrl).then(res=>{
        const {data} = res
        if(Object.values(data)?.length < 1)return;
        setInfo(data)
        let {preview_image_url, more_images_url, comments} = data
        preview_image_url && setImages([preview_image_url,...more_images_url])  
        more_images_url && setCurImg(preview_image_url)
        setComments(comments)
    })
    },[queryUrl])

    const handleReaction = async(e) =>{
        const type = e.target.id
        if(!type)return;
        const queryUrl = API_BASE_URL + `products/${id}/react?reaction=${type}`
        try {
        const res = await axios.patch(queryUrl, {}, {headers: { [tokenName]: getAuthToken() } })
        setInfo(res.data)
        } catch (error) {
        if(error.response.status === 401){
            window.location.assign("/auth")
            return
        }
            }}

const imagesList = images.map((image, i)=>{
    const handleClick = () => setCurImg(image)
    return <img className="mini-image" alt="" onClick={handleClick} src={image} key={i} id={image} />
})

    const renderFeedback = () =>{
        const userId = getUserId()
        return <div className="reactions">
            <Link to={`/products/${id}/comments#comments`} id="" className={"reaction"}><Icon icon="uis:comment-dots" /><p>{comments?.length} comment{comments?.length>1?"s":""}</p></Link>
            <div id="like" onClick={(e)=>handleReaction(e)} className={`reaction ${info.reactions.likes.includes(userId)?"active":""}`}>
                <Icon id="like" onClick={(e)=>handleReaction(e)} icon="mdi:like" />
                <p>{info?.reactions?.likes.length} like{info?.reactions?.likes.length>1?"s":""}</p>
            </div>
            <div id="dislike" onClick={(e)=>handleReaction(e)}  className={`reaction ${info.reactions.dislikes.includes(userId)?"active":""}`} >
                <Icon id="dislike" onClick={(e)=>handleReaction(e)} icon="mdi:dislike" />
                <p>{info?.reactions?.dislikes.length} dislike{info?.reactions?.dislikes.length>1?"s":""}</p>
            </div>
        </div>
    }

    return <div>        
    <Consent message={dialog?.message} status={dialog?.status} controller={()=>{setDialog(null)}} />
    <Back url={"/shop"} />
    {!info? 
    <h1 style={{fontSize: "18px", fontWeight: 420}} className="preview-failed">loading preview...</h1>
    :(  <div className="product-preview">
        <img className="preview-image" src={curImg} alt={info.name} label={info.name} />
        <br></br>
        <div className="image-list horizontal-scroll">{imagesList}</div>
        <p className="name">{info.name}</p>
        <p className="description">{info.description}</p>
        <p className="preview-price">₦{numberToPrice(info.price)}</p>
        <div className="preview-comments">
            {renderFeedback()}
        </div>
        <button onClick={async()=>{
            const token = getAuthToken()
            await authenticateResponse(()=>axios.post(API_BASE_URL+"cart/"+id,{},{headers:{[tokenName]:token}}),"/cart")
            window.location.assign("/cart")
        }} className="checkout-btn">Add to cart</button>
        <RelatedProducts />
        <Jumia displayMessage={displayMessage} keyword={info.name} className="jumia" />
    </div>)}
    </div> 
}
 
export default Preview;
