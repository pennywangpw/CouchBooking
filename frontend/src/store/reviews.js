//reducer . action creators
//import the token
import { csrfFetch } from './csrf';
import { getSpotDetails } from "./spots"

//constant
const GET_Reviews = 'reviews/getReviews'
const POST_createReview = 'reviews/createReview'
const DELETE_deleteAReview = 'reviews/deleteReview'

//action creator
export const getReviewsbySpot = (reviews) => {
    return {
        type: GET_Reviews,
        reviews
    }
}

export const createReview = (review) => {
    return {
        type: POST_createReview,
        review
    }
}

export const deleteReview = (id) => {
    return {
        type: DELETE_deleteAReview,
        id
    }
}


//THUNK - get the review by spot
export const getReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    dispatch(getReviewsbySpot(data))
    return data
}

//THUNK - creat a review for a spot based on the spot's id
export const createAReview = ({ id, newReview }) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
    })

    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReview(newReview))
        dispatch(getSpotDetails(id))
        dispatch(getReviews(id))
        return newReview
    }
}

//THUNK - deletde a review
export const deleteAReview = (reviewid, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewid}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteReview(reviewid))
        dispatch(getSpotDetails(spotId))
    }
}

const initialState = {};
const reviewsReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {

        case GET_Reviews:
            // newState = {...state}
            // let newObj = {}
            // action.reviews.Reviews.forEach(review=> newObj[review.id] = review)
            // return{...state, newState}



            newState = {}
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review
            })

            return newState

        case POST_createReview:
            newState = { ...state }
            newState[action.review.id] = action.review
            return newState

        case DELETE_deleteAReview:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state
    }
}




export default reviewsReducer;
