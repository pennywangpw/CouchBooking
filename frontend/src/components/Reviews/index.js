import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostReviewModal from '../PostReviewModal'
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteConfirmationModal"
import './AllReview.css'

//1.dispaly review details
//2.the review should be in

// dispatch all the reviews
const AllReviews = ({ reviews }) => {


    const dispatch = useDispatch()
    const { spotId } = useParams()


    //convert reviews obj into array
    const reviewsArr = Object.values(reviews)



    //dispaly -- "Be the first to post a review!"
    //check if user log in & not the owner
    //const currentUser = dispatch(restoreUser())
    //const spotDetails = dispatch(getSpotDetails())
    //use selector to get store> ownerId
    //currentUser !== null && id !== Ownerid
    //check if no reviews
    const user = useSelector(state => state.session.user)
    const singleSpot = useSelector(state => state.spots.singleSpot)



    //reviews in order by reviewId
    function compare(a, b) {
        const reviewA = a.id
        const reviewB = b.id

        let comparison = 0;
        if (reviewA < reviewB) {
            comparison = 1
        } else if (reviewB < reviewA) {
            comparison = -1
        }
        return comparison
    }

    reviewsArr.sort(compare)


    //check if current user have posted the review or not
    const havePosted = reviewsArr?.find((review) => review?.userId === user?.id)


    // reviewId !== current userId
    //(a&&b) if both T, return b
    return (
        <div>
            <br /><br />

            <div>
                <div>
                    {
                        user && (user.id !== singleSpot.Owner.id) && (havePosted === undefined) && (
                            <div>
                                <OpenModalButton
                                    buttonText="Post Your Review"
                                    className="button-13"
                                    modalComponent={<PostReviewModal id={spotId} />}
                                />
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        user && (user.id !== singleSpot.Owner.id) && (reviewsArr.length === 0) && (
                            <div>
                                <div>Be the first to post a review!</div>
                            </div>
                        )
                    }
                </div>


            </div>

            <div id="allreviews">
                {reviewsArr.map((review, i) =>
                    <div key={i}>
                        <div>
                            <h1>{review?.User?.firstName}</h1>
                            {/* <h1>{dayDivider}</h1> */}
                            <h1>{review.createdAt.split('-')[0]}-{review.createdAt.split('-')[1]}-{review.createdAt.split('-')[2].slice(0, 2)}</h1>
                            <h1>{review?.review}</h1>
                            <br />
                        </div>
                        {user?.id === review.userId && <OpenModalButton
                            buttonText="delete"
                            className="button-13"
                            modalComponent={<DeleteFormModal reviewid={review.id} type="review" spotId={spotId} />}
                        />}

                    </div>
                )}
            </div>



        </div>
    )

}


export default AllReviews;
