//reducer . action creators
//import the token
import AllSpots from '../components/Spots/AllSpots';
import { csrfFetch } from './csrf';


//action creator
const GET_AllSpots = 'spots/getAllSpots'


const getSpots = (spot) =>{
    return{
        type: GET_AllSpots,
        spot
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
    default:
      return state;
  }
};



export default spotsReducer;
