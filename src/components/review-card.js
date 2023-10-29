import React from "react";
import "./styles/review-card.css"

const ReviewCard = ({userName, avatar, comment})=><li className="review-card" >
    <img src={avatar}/>
    <div>
    <h1 className="username">{userName}</h1>
    <p>{comment}</p>
    <div style={{fontSize: "16px", paddingLeft: "0px", color: "yellow"}} >&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    </div>
</li>

export default ReviewCard