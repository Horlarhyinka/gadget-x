import React from "react";
import "./styles/comment-card.css";

const CommentCard = ({email, body, updatedAt, id}) => {
    return ( <div className="comment-card">
        <div className="body-section">
            <div className="badge"><span>{email?email[0]:"U"}</span></div>
            <div className="info" >
            <p className="email" >{email}</p>
            <p className="body">{body}</p>
            <aside>{updatedAt}</aside></div> 
        </div>
    </div> );
}
 
export default CommentCard;