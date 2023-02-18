//reducer . action creators
//import the token
import { csrfFetch } from './csrf';


//constant
const GET_Reviews ='spots/getReviews'

//action creator
export const getReviewsbySpot =(reviews) =>{
    console.log("看看getreveiwsbyspot passed in: ", reviews)
    return{
        type: GET_Reviews,
        reviews
    }
}


//THUNK - get the review by spot
export const getReviews = (id) => async (dispatch)=>{
    console.log("是否有hit getreview ")
    const response = await csrfFetch(`/api/spots/${id}/reviews`)
    const data = await response.json()
    console.log("THUNK---getReviews: ",data)
    dispatch(getReviewsbySpot(data))
    return data
}

const initialState = {};
const reviewsReducer = (state =initialState, action) =>{
    console.log("Reducer---reviewsReducer with action: ", action)

    let newState;
    switch(action.type){

        case GET_Reviews:
            newState = {...state}
            let newObj = {}
            action.reviews.Reviews.forEach(review=> newObj[review.id] = review)
            console.log("有hit這個條件")
            // return{...state, newState.}


        default:
            return state
    }
}




export default reviewsReducer;
