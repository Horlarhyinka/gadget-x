import React from "react";
import "./styles/review-card.css"

const ReviewCard = ({userName, avatar, comment})=><li className="review-card" >
    <div className="review-card-content" >
    <h1 className="username">{userName}</h1>
    <p>{comment}</p>
    <div style={{fontSize: "16px", paddingLeft: "0px", color: "rgb(255, 174, 0)"}} >&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    </div>
</li>

export default ReviewCard