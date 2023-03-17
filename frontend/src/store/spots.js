//reducer . action creators
//import the token
import { csrfFetch } from './csrf';


//action creator
const GET_AllSpots = 'spots/getAllSpots'
const GET_SpotsDetails = 'spots/getSpotsDetails'
const POST_CreateSpot = 'spots/createSpot'
const POST_newImg = 'spots/newImg'
const GET_CurrentSpots = 'spots/getCurrentSpots'
const PUT_EditSpot = 'spots/editSpot'
const DELETE_deleteSpot = 'spots/deleteSpot'


export const getSpots = (spot) => {
    return {
        type: GET_AllSpots,
        spot
    }
}


export const getDetails = (detail) => {
    console.log("this is getDetails")
    return {
        type: GET_SpotsDetails,
        detail
    }
}


export const createSpot = (newspot) => {
    console.log("this is createSpot function")
    return {
        type: POST_CreateSpot,
        newspot
    }
}


export const createImgs = (newImg) => {
    console.log("this is createTmgs: ", newImg)
    return {
        type: POST_newImg,
        newImg
    }
}

export const getUserSpots = (spot) => {
    return {
        type: GET_CurrentSpots,
        spot
    }
}


export const editSpot = (editedSpot) => {
    return {
        type: PUT_EditSpot,
        editedSpot
    }
}


export const deleteSpot = (id) => {
    return {
        type: DELETE_deleteSpot,
        id
    }
}


//thunk action creator
export const getAllSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/spots?')
        console.log("&&&response: ", response)
        const data = await response.json()
        console.log("from getAllSpots thunk: ", data)
        dispatch(getSpots(data))
        return data

    } catch (error) {
        console.log("Unable to retrieve spots. Please try again shortly")
        throw error
    }
    // if(response.ok){
    //     dispatch(getSpots(data))
    // }
}

export const getSpotDetails = (spotId) => async (dispatch) => {
    console.log("getSpotDetails thunk --- spotID: ", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json()
    console.log("getSpotDetils data: ", data)
    dispatch(getDetails(data))
    return data
}

export const createASpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const newSpot = await response.json()
        console.log("createASpot thunk--newSpot: ", newSpot)

        //update store
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

//request an img from db
export const createNewImgs = ({ newUrl, spotId }) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "url": newUrl,
            "preview": true
        })
    })
    if (response.ok) {
        const newImg = await response.json()
        //update store
        dispatch(createImgs(newImg))
        return newImg
    }


    console.log("createASpot thunk---responseImg: ", response)
}

//get Current user's spots thunk
export const getCurrentSpots = () => async (dispatch) => {
    console.log("有道thunk?")
    const response = await csrfFetch('/api/spots/current')
    const data = await response.json()
    console.log("getCurrentSpots data: ", data)
    dispatch(getSpots(data))
    return data
}


export const editASpot = (spot) => async (dispatch) => {
    console.log("Thunk--editASpot with passed in :", spot)
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(editSpot(updatedSpot))
        console.log("editASpot---editSpot: ", updatedSpot)
        return updatedSpot
    }

}



export const deleteASpot = (id) => async (dispatch) => {
    console.log("這裡是thunk 傳入的id: ", id)
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteSpot(id))

    }
}




//Reducer
const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    console.log("SpotsReducer---action: ", action)
    let newState;
    let allSpots;
    switch (action.type) {
        case GET_AllSpots:
            //follow store shape
            //normoziling data
            newState = { ...state }
            const newObj = {}
            action.spot.Spots.forEach(spot => newObj[spot.id] = spot)
            newState.allSpots = newObj

            // console.log("spotsReducer with newState: ", newState)
            return newState
        case GET_SpotsDetails:
            newState = { ...state, singleSpot: { ...action.detail[0] } }
            // newState = { ...state, singleSpot: { ...state.singleSpot } }
            // const newObjforDetails = {...action.detail[0]}
            // console.log("spotsReducer wih Get SpotsDetails data: ", newObjforDetails)
            console.log("Reducer with ACTION DETAIL: ", action.detail[0])
            // newState.singleSpot = action.detail[0]
            console.log("SpotsDetails---action.detail: ", action.detail)
            console.log("這個是spotsDetails newState: ", newState)
            return newState

        //we could use getallspots instead
        // case GET_CurrentSpots:
        //     console.log("hello~~~")
        //     newState ={...state}
        //     const newObj2 ={}
        //     action.spot.Spots.forEach(spot => newObj2[spot.id] = spot)
        //     newState.allSpots = newObj2
        //     return newState

        case PUT_EditSpot:
            newState = { ...state }
            const newObj3 = {}
            console.log("SpotReducer---EditSpot action: ", action.editedSpot)
        // newState.allSpots = newObj3
        // return newState

        case DELETE_deleteSpot:
            allSpots = { ...state.allSpots }
            delete allSpots[action.id]
            return { ...state, allSpots }
            console.log("delete spot: ", newState)
            console.log("SpotReducer-----DeleteSpot action: ", action)

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
            console.log("HIT DEFAULT")
            return state;
    }
};


export default spotsReducer;
