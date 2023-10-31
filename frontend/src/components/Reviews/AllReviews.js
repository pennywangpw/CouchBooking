import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostReviewModal from '../PostReviewModal'
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteConfirmationModal"
import { useEffect } from "react";
import { getReviews } from "../../store/reviews"

//1.dispaly review details
//2.the review should be in

// dispatch all the reviews
const AllReviews = ({ reviews, spot }) => {
    console.log("AllReviews component---passed in reviews: ", reviews)
    // console.log("AllReviews component---passed in spot: ", spot)

    const dispatch = useDispatch()
    const { spotId } = useParams()
    // console.log("這裡是ALLREVIEW 的id from params: ", typeof spotId)

    // //convert reviews obj into array
    // const reviewsArr = Object.values(reviews)
    // console.log("這裡是revierArr: ", reviewsArr)


    //dispaly -- "Be the first to post a review!"
    //check if user log in & not the owner
    //const currentUser = dispatch(restoreUser())
    //const spotDetails = dispatch(getSpotDetails())
    //use selector to get store> ownerId
    //currentUser !== null && id !== Ownerid
    //check if no reviews
    const user = useSelector(state => state.session.user)
    const singleSpot = useSelector(state => state.spots.singleSpot)


    //getAllreview
    const allreviews = useSelector(state => state.reviews)


    //convert reviews obj into array
    const reviewsArr = Object.values(allreviews)



    //display -- YYYY-MM-DD only
    //re-assign updatedAt with YYYY-MM-DD???
    //get updatedAt YYYY-MM-DD
    let dayDivider;
    for (let review of reviewsArr) {
        console.log("****all reviews: ", reviewsArr)
        const year = (review.updatedAt).split('-')[0]
        const month = (review.updatedAt).split('-')[1]
        const date = (review.updatedAt).split('-')[2].slice(0, 2)
        dayDivider = year + "-" + month + "-" + date
    }


    //reviews in order by reviewId
    // console.log("review in arrary: ", reviewsArr)
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


    console.log("沒有POST過: ", havePosted)
    console.log("$$$$$$$$$$ HERE IS ARRAY OF REVIEWS: ", reviewsArr)

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

            <div>
                {reviewsArr.map((review, i) =>
                    <div key={i}>
                        <div>
                            {/* <h1>{user.firstName}</h1>   */}
                            <h1>{review?.User?.firstName}</h1>
                            <h1>{dayDivider}</h1>
                            <h1>{review?.review}</h1>
                            <br />
                        </div>
                        {user?.id === review.userId && <OpenModalButton
                            buttonText="delete"
                            modalComponent={<DeleteFormModal reviewid={review.id} type="review" spotId={spotId} />}
                        />}

                    </div>
                )}
            </div>



        </div>
    )

}


export default AllReviews;
