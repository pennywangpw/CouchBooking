//reducer . action creators
//import the token
import { csrfFetch } from './csrf';


//action creator
const GET_AllSpots = 'spots/getAllSpots'
const GET_SpotsDetails ='spots/getSpotsDetails'
const POST_CreateSpot ='spots/createSpot'
const POST_newImg ='spots/newImg'
const GET_CurrentSpots = 'spots/getCurrentSpots'
// const GET_Reviews ='spots/getReviews'

export const getSpots = (spot) =>{
    return{
        type: GET_AllSpots,
        spot
    }
}


export const getDetails = (detail) =>{
    console.log("this is getDetails")
    return{
        type: GET_SpotsDetails,
        detail
    }
}


export const createSpot = (newspot) =>{
    return{
        type: POST_CreateSpot,
        newspot
    }
}


export const createImgs = (newImg) =>{
    return{
        type: POST_newImg,
        newImg
    }
}

export const getUserSpots = (spot)=>{
    return{
        type: GET_CurrentSpots,
        spot
    }
}

// export const getReviewsbySpot =(reviews) =>{
//     return{
//         type: GET_Reviews,
//         reviews
//     }
// }


//thunk action creator
export const getAllSpots =() => async (dispatch) =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json()
    console.log("from getAllSpots thunk: ", data)
    dispatch(getSpots(data))
    // if(response.ok){
    //     dispatch(getSpots(data))
    // }
    return data
}

export const getSpotDetails =(spotId) => async (dispatch) =>{
    console.log("getSpotDetails thunk --- spotID: ", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json()
    console.log("getSpotDetils data: ", data)
    dispatch(getDetails(data))
    return data
}

export const createASpot = (spot) => async (dispatch) =>{
    const response = await csrfFetch(`/api/spots`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(spot)
    })

    if(response.ok){
        const newSpot = await response.json()
        console.log("createASpot thunk--newSpot: ",newSpot)

        //update store
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

//request an img from db
export const createNewImgs = ({newUrl, spotId}) => async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}/images`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify ({
            "url": newUrl,
            "preview": true
        })
    })
    if(response.ok){
        const newImg = await response.json()
        //update store
        dispatch(createImgs(newImg))

    }


    console.log("createASpot thunk---responseImg: ", response)
}

//get Current user's spots thunk
export const getCurrentSpots = () => async(dispatch) =>{
    console.log("有道thunk?")
    const response = await csrfFetch('/spots/current')
    const data = await response.json()
    console.log("getCurrentSpots data: ", data)
    dispatch(getUserSpots(data))
    return data
}


// //get the review by spot
// export const getReviews = (spotId) => async (dispatch)=>{
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
//     const data = await response.json()
//     dispatch(getReviewsbySpot(data))
//     return data
// }


//Reducer
const initialState = {allSpots:{},singleSpot:{}};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_AllSpots:
        //follow store shape
        //normoziling data
        newState = {...state}
        const newObj = {}
        action.spot.Spots.forEach(spot => newObj[spot.id] = spot)
        newState.allSpots = newObj

        // console.log("spotsReducer with newState: ", newState)
        return newState
    case GET_SpotsDetails:
        newState = {...state, singleSpot:{...state.singleSpot}}
        // const newObjforDetails = {...action.detail[0]}
        // console.log("spotsReducer wih Get SpotsDetails data: ", newObjforDetails)
        newState.singleSpot = action.detail[0]
        console.log("這個是spotsDetails newState: ", newState)
        return newState

    case GET_CurrentSpots:
        console.log("hello~~~")
        newState ={...state}
        const newObj2 ={}
        action.spot.Spots.forEach(spot => newObj2[spot.id] = spot)
        newState.allSpots = newObj2
        return newState

    case POST_newImg:
        return state
    // case POST_CreateSpot:
    //     console.log("在create 之前", state)
    //     console.log("在create 之前all spot: ", state.allSpots)
    //     console.log("reducer creatspot is running and check action: ", action)
    //     const b= {...state}
    //     console.log("測試: ",b)
    //     newState  = {...state.allSpots,[action.newspot.id]: action.newspot}
    //     console.log("spotsReducer--- createSpot newstate: ", newState)
    //     return newState
    default:
      return state;
  }
};



export default spotsReducer;
