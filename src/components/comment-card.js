import React from "react";
import "./styles/comment-card.css";
import Badge from "./badge";

const CommentCard = ({email, body, updatedAt, id}) => {
    return ( <div className="comment-card">
        <div className="body-section">
            <Badge initial={email[0]} />
            <div className="info" >
            <p className="email" >{email}</p>
            <p className="body">{body}</p>
            <aside>{updatedAt}</aside></div> 
        </div>
    </div> );
}
 
export default CommentCard;