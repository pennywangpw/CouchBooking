//reducer . action creators
//import the token
import { csrfFetch } from './csrf';


//action creator
const GET_AllSpots = 'spots/getAllSpots'
const GET_SpotsDetails ='spots/getSpotsDetails'

const getSpots = (spot) =>{
    return{
        type: GET_AllSpots,
        spot
    }
}


const getDetails = (detail) =>{
    console.log("this is getDetails")
    return{
        type: GET_SpotsDetails,
        detail
    }
}


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
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json()
    console.log("getSpotDetils data: ", data)
    dispatch(getDetails(data))
    return data
}


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

        console.log("spotsReducer with newState: ", newState)
        return newState
    case GET_SpotsDetails:
        newState = {...state, singleSpot:{...state.singleSpot}}
        // const newObjforDetails = {...action.detail[0]}
        // console.log("spotsReducer wih Get SpotsDetails data: ", newObjforDetails)
        newState.singleSpot = action.detail[0]
        console.log("newState: ", newState)
        return newState
    default:
      return state;
  }
};



export default spotsReducer;
