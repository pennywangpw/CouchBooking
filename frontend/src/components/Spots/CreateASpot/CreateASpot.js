import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { createASpot } from "../../../store/spots";
import { createSpot, createNewImgs } from "../../../store/spots";
import SpotForm from "../SpotForm/SpotForm";

const CreateASpotForm = () =>{

    const spot= {
        country:"",
        address:"",
        city:"",
        state:"",
        description:"",
        name:"",
        price:"",
        url1:"",
        url2:"",
        url3:"",
        url4:"",
        url5:"",
        lat:"",
        lng:""

    }
    // console.log("CreateASpotForm is running")
    // const dispatch = useDispatch()
    // const history = useHistory()
    // //get user data from Store
    // const user = useSelector(state => state.session.user)
    // console.log("CreateASpotForm-- user: ", user)
    // const ownerId = user.id
    // console.log("CreatedASpotForm --ownerId: ", ownerId)

    // const spots = useSelector(state=> state.spots)

    // //setup state
    // const [country, setCountry] = useState("")
    // const [address,setAddress] = useState("")
    // const [city, setCity] = useState("")
    // const [state,setState] = useState("")
    // let lat = 45.2354
    // let lng = -99.123
    // // const [lat,setLat] = useState("")
    // // const [lng, setLng] = useState("")
    // const [description, setDescription] = useState("")
    // const [name, setName] = useState("")
    // const [price, setPrice] = useState("")
    // const [url1, setUrl1] = useState("")
    // const [url2, setUrl2] = useState("")
    // const [url3, setUrl3] = useState("")
    // const [url4, setUrl4] = useState("")
    // const [url5, setUrl5] = useState("")
    // const [errors, setErrors]= useState([])


    // useEffect(()=>{
    //     let e =[]
    //     if(country.length === 0) e.push("Country is required")
    //     if(address.length === 0) e.push("Address is required")
    //     if(city.length === 0) e.push("City is required")
    //     if(state.length === 0) e.push("State is required")
    //     if(description.length < 30) e.push("Description  needs a minimum of 30 characters")
    //     if(name.length === 0) e.push("Name is required")
    //     if(price.length === 0) e.push("Price is required")
    //     if(url1.length === 0) e.push("Preview image is required")
    //     // if(url2.length === 0) e.push("Image URL must end in .png .jpg, or .jpeg")
    //     console.log("rerender every time")
    //     setErrors(e)
    // },[country,address,city,state,description,name,price,url1,url2])

    // //onChange takes cb function
    // const updateCountry = (e)=> setCountry(e.target.value)
    // const updateAddress = (e)=> setAddress(e.target.value)
    // const updateCity = (e)=> setCity(e.target.value)
    // const updateState = (e)=> setState(e.target.value)
    // // const updatelat = (e)=> setLat(e.target.value)
    // // const updatelng = (e)=> setLng(e.target.value)
    // const updateDescription = (e)=> setDescription(e.target.value)
    // const updateName = (e) => setName(e.target.value)
    // const updatePrice = (e) => setPrice(e.target.value)
    // const updateUrl1 = (e) => setUrl1(e.target.value)
    // const updateUrl2 = (e) => setUrl2(e.target.value)
    // const updateUrl3 = (e) => setUrl3(e.target.value)
    // const updateUrl4 = (e) => setUrl4(e.target.value)
    // const updateUrl5 = (e) => setUrl5(e.target.value)



    // //make sure dispatch is in handleSubmit, once it click then we post to db
    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     if(errors.length) return

    //     const payload ={
    //         country,
    //         address,
    //         city,
    //         state,
    //         lat,
    //         lng,
    //         description,
    //         name,
    //         price,
    //         ownerId
    //     };

    //     //get data & img by using createSpot thunk
    //     //await --assign to the variable
    //     let createdSpot= await dispatch(createASpot(payload));

    //     let createImg1;
    //     let createImg2;
    //     let createImg3;
    //     let createImg4;
    //     let createImg5;

    //     if(url1)createImg1= await dispatch(createNewImgs({newUrl: url1, spotId: createdSpot.id}))
    //     if(url2)createImg2= await dispatch(createNewImgs({newUrl: url2, spotId: createdSpot.id}))
    //     if(url3)createImg3= await dispatch(createNewImgs({newUrl: url3, spotId: createdSpot.id}))
    //     if(url4)createImg4= await dispatch(createNewImgs({newUrl: url4, spotId: createdSpot.id}))
    //     if(url5)createImg5= await dispatch(createNewImgs({newUrl: url5, spotId: createdSpot.id}))


    //     // if(createdSpot && createImg){
    //     //     console.log("CreateASpot --createdSpot exsits: ", createdSpot)
    //     //     history.push(`/spots/${createdSpot.id}`)

    //     // }
    //     if(createdSpot){
    //         history.push(`/spots/${createdSpot.id}`);
    //         //import the modal and closeModal here
    //     }

    // }

    return(

        <SpotForm spot={spot} formType="Create Spot"/>
        // <div className="spotCreation">
        //     <div>Create a New Spot</div>
        //     <div>
        //         <p>Where's your place located?</p>
        //         <p>Guests will only get your exact address once they booked a reservation.</p>
        //     </div>
        //     <section>
        //         <form className="create-spot-form" onSubmit={handleSubmit}>
        //              <ul className="errors">
        //                  {errors.length > 0 && errors.map(error=>(<li key={error}>{error}</li>))}
        //             </ul>
        //             <input type="text" placeholder="Country" value={country} onChange={updateCountry}/>
        //             <input type="text" placeholder="Address" value={address} onChange={updateAddress}/>
        //             <input type="text" placeholder="City" value={city} onChange={updateCity}/>
        //             <input type="text" placeholder="State" value={state} onChange={updateState}/>
        //             {/* <input type="text" placeholder="lat" value={lat} onChange={updatelat}/>
        //             <input type="text" placeholder="lng" value={lng} onChange={updatelng}/> */}

        //             <div>
        //                 <div>Describe your place to guests</div>
        //                 <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</p>
        //                 {/* <lable for = "description">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</lable> */}
        //                 <textarea id="description" value={description} onChange={updateDescription}>Please write at least 30 characters</textarea>

        //             </div>

        //             <div>
        //                 <div>Create a title for your spot</div>
        //                 <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
        //                 <input type="text" placeholder="Name of your spot" value={name} onChange={updateName}/>
        //             </div>

        //             <div>
        //                 <div>Set a base price for your spot</div>
        //                 <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        //                 <lable for = "pricetag">$ </lable>
        //                 <input id= "pricetag" type="text" placeholder="Price per night(USD)" value={price} onChange={updatePrice}/>
        //             </div>

        //             <div>
        //                 <div>Liven up your spot with photos</div>
        //                 <p>Submit a link to at least one photo to publish your spot.</p>
        //                 <input type="text" placeholder="Preview Image URL" value={url1} onChange={updateUrl1}/>
        //                 <input type="text" placeholder="Image URL" value={url2} onChange={updateUrl2}/>
        //                 <input type="text" placeholder="Image URL" value={url3} onChange={updateUrl3}/>
        //                 <input type="text" placeholder="Image URL" value={url4} onChange={updateUrl4}/>
        //                 <input type="text" placeholder="Image URL" value={url5} onChange={updateUrl5}/>
        //             </div>

        //             <button>Create Spot</button>

        //         </form>
        //     </section>
        // </div>
    )
}


export default CreateASpotForm;
