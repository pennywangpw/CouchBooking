import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createASpot } from "../../../store/spots";
import { createSpot, createNewImgs } from "../../../store/spots";
import SpotForm from "../SpotForm/SpotForm";


//get the current spot data
//set up the validation
//display the updated form

//get existing data
const EditASpot = () =>{
    const dispatch= useDispatch()
    //get current spotId
    const{id} = useParams()

    //get current spot detail
    const currentSpotDetail = useSelector(state => state.spots.allSpots[id])
    console.log("EditASpot -- currentSpotDetail: ", currentSpotDetail)
    // useEffect(()=>{
    //     const currentSpotDetail = dispatch(getSpotDetails(id))
    // },[dispatch])
    // const currentSpot = useSelector(state => state.singleSpot)
    // console.log("EditASpot -- currentSpotDetail: ", currentSpot)
    // const currentSpot = useSelector(getSpotDetails(id))
    // console.log("EditASpot -- currentSpotDetail: ", currentSpot)

    // const dispatch = useDispatch()
    // const{id} = useParams()
    // console.log("currentSpotId : ", id)
    // const currentSpot= dispatch(getSpotDetails(id))
    // console.log("打印一下currentSpot: ", currentSpot)

//     //setup state
//     const [country, setCountry] = useState("")
//     const [address,setAddress] = useState("")
//     const [city, setCity] = useState("")
//     const [state,setState] = useState("")
//     let lat = 45.2354
//     let lng = -99.123
//     const [description, setDescription] = useState("")
//     const [name, setName] = useState("")
//     const [price, setPrice] = useState("")
//     const [url1, setUrl1] = useState("")
//     const [url2, setUrl2] = useState("")
//     const [url3, setUrl3] = useState("")
//     const [url4, setUrl4] = useState("")
//     const [url5, setUrl5] = useState("")
//     const [errors, setErrors]= useState([])



//     useEffect(()=>{
//         //e will be empty when we run it every time
//         let e =[]
//         if(country.length === 0) e.push("Country is required")
//         if(address.length === 0) e.push("Address is required")
//         if(city.length === 0) e.push("City is required")
//         if(state.length === 0) e.push("State is required")
//         if(description.length < 30) e.push("Description  needs a minimum of 30 characters")
//         if(name.length === 0) e.push("Name is required")
//         if(price.length === 0) e.push("Price is required")
//         if(url1.length === 0) e.push("Preview image is required")
//         // if(url2.length === 0) e.push("Image URL must end in .png .jpg, or .jpeg")
//         console.log("rerender every time")
//         setErrors(e)
//     },[country,address,city,state,description,name,price,url1,url2])


//     //onChange takes cb function
//     const updateCountry = (e)=> setCountry(e.target.value)
//     const updateAddress = (e)=> setAddress(e.target.value)
//     const updateCity = (e)=> setCity(e.target.value)
//     const updateState = (e)=> setState(e.target.value)
//     const updateDescription = (e)=> setDescription(e.target.value)
//     const updateName = (e) => setName(e.target.value)
//     const updatePrice = (e) => setPrice(e.target.value)
//     const updateUrl1 = (e) => setUrl1(e.target.value)
//     const updateUrl2 = (e) => setUrl2(e.target.value)
//     const updateUrl3 = (e) => setUrl3(e.target.value)
//     const updateUrl4 = (e) => setUrl4(e.target.value)
//     const updateUrl5 = (e) => setUrl5(e.target.value)

//     //handles button click
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         if(errors.length) return

//         const payload ={
//             country,
//             address,
//             city,
//             state,
//             lat,
//             lng,
//             description,
//             name,
//             price,
//             ownerId
//         };

//         //get data & img by using createSpot thunk
//         //await --assign to the variable
//         let createdSpot= await dispatch(createASpot(payload));

//         let createImg1;
//         let createImg2;
//         let createImg3;
//         let createImg4;
//         let createImg5;

//         if(url1)createImg1= await dispatch(createNewImgs({newUrl: url1, spotId: createdSpot.id}))
//         if(url2)createImg2= await dispatch(createNewImgs({newUrl: url2, spotId: createdSpot.id}))
//         if(url3)createImg3= await dispatch(createNewImgs({newUrl: url3, spotId: createdSpot.id}))
//         if(url4)createImg4= await dispatch(createNewImgs({newUrl: url4, spotId: createdSpot.id}))
//         if(url5)createImg5= await dispatch(createNewImgs({newUrl: url5, spotId: createdSpot.id}))

//         if(createdSpot){
//             history.push(`/spots/${createdSpot.id}`);
//             //import the modal and closeModal here
//         }

//     }



    return(

        <SpotForm spot={currentSpotDetail} formType="Edit Spot"/>


    )

}



export default EditASpot;
