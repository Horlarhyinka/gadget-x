import { reviews } from "../assets/datas";
import "./styles/reviews.css"

const Reviews = () => {

    let id = 0;
    const reviewsList = reviews.map(rev=>{
        id++
        let comment = rev.comment
        if(rev?.comment.length > 25){
            comment = rev.comment.slice(0,25) + "..."
        }

        return(<div key={id} className="revcard">
            <img className="revimg" src={rev["image"]} />
            <h3>{rev.name}</h3>
            <p>{comment}</p>
            <strong>rating:{rev.rating}</strong>
        </div>)
    })

    return ( <div className="reviews">
                <h1>Reviews</h1>
                <div className="revwrapper">
                    {reviewsList}
                </div>

            </div>);
}
 
export default Reviews;<div>
</div>