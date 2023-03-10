import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostReviewModal from '../PostReviewModal'
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteConfirmationModal"

//1.dispaly review details
//2.the review should be in

// dispatch all the reviews
const AllReviews = ({ reviews, spots }) => {
    console.log("AllReviews component---passed in reviews: ", reviews)
    console.log("AllReviews component---passed in spots: ", spots)


    const { id } = useParams()
    console.log("這裡是ALLREVIEW 的id from params: ", typeof +id)

    //convert reviews obj into array
    const reviewsArr = Object.values(reviews)
    console.log("這裡是revierArr: ", reviewsArr)

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



    // console.log("AFTER review in arrary: ", reviewsArr)

    //dispaly -- "Be the first to post a review!"
    //check if user log in & not the owner
    //const currentUser = dispatch(restoreUser())
    //const spotDetails = dispatch(getSpotDetails())
    //use selector to get store> ownerId
    //currentUser !== null && id !== Ownerid
    //check if no reviews
    const user = useSelector(state => state.session.user)
    const singleSpot = useSelector(state => state.spots.singleSpot)
    console.log("這個是一個updatedStore: ", user, singleSpot)


    // //{review?.User?.firstName} check if review? if yes > check next
    // const reviewDetails = () => {
    //     // console.log("$$$$$$$$$$$$$$$$$$$$是否有進到這個")
    //     console.log("$$$$$$$$$$ HERE IS ARRAY OF REVIEWS: ", reviewsArr)
    //     if (reviewsArr.length === 0) {
    //         // console.log("是否有進到這個func: ", user.id, singleSpot.Owner.id)
    //         return (
    //             <div>
    //                 <div>"Be the first to post a review!"</div>
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <ul>
    //                 {reviewsArr.map(review => (
    //                     <li>
    //                         <h1>{review?.User?.firstName}</h1>
    //                         <h1>{dayDivider}</h1>
    //                         <h1>{review?.review}</h1>
    //                         <br />
    //                     </li>
    //                 ))
    //                 }
    //             </ul>

    //         )

    //     }
    // }

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
                                    modalComponent={<PostReviewModal id={+id} />}
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

                {/* {reviewDetails()} */}

            </div>

            <div>
                {reviewsArr.map((review, i) =>
                    <div key={i}>
                        <div>
                            <h1>{review?.User?.firstName}</h1>
                            <h1>{dayDivider}</h1>
                            <h1>{review?.review}</h1>
                            <br />
                        </div>
                        {user?.id === review.userId && <OpenModalButton
                            buttonText="delete"
                            modalComponent={<DeleteFormModal id={review.id} type="review" />}
                        />}

                    </div>
                )}
            </div>



        </div>
    )

}


export default AllReviews;
