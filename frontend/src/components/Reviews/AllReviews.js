import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams } from "react-router-dom";
import PostReviewModal from '../PostReviewModal'
import OpenModalButton from "../OpenModalButton";

// dispatch all the reviews
const AllReviews = ({ reviews }) => {
    console.log("AllReviews component---passed in reviews: ", reviews)
    // const dispatch = useDispatch()

    const { id } = useParams()
    console.log("這裡是ALLREVIEW 的id from params: ", typeof +id)

    //()it's implicit return in line25
    return (
        <div>
            <br /><br /><br /><br /><br /><br />
            <ul>
                <div>
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<PostReviewModal id={+id} />}
                    />
                </div>
                {Object.values(reviews).map(review => (
                    <li>
                        <h1>{review.User.firstName}</h1>
                        <h1>{review.updatedAt}</h1>
                        <h1>{review.review}</h1>

                    </li>
                ))}
            </ul>

        </div>
    )

}


export default AllReviews;
