import React from "react";
import "./styles/review-card.css"

const ReviewCard = ({userName, avatar, comment})=><li className="review-card" >
    {/* <div className="review-card-content" >
    <h1 className="username">{userName}</h1>
    <p>{comment}</p>
    <div style={{fontSize: "16px", paddingLeft: "0px", color: "rgb(255, 174, 0)"}} >&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    </div> */}
    <div className="profile" ><img src={avatar} alt="" /><h2>{userName}</h2></div>
    <p>{comment}</p>
    <div style={{fontSize: "1.5rem", paddingLeft: "0px", color: "rgb(255, 174, 0)"}} >&#9733;&#9733;&#9733;&#9733;&#9733;</div>
</li>

export default ReviewCard