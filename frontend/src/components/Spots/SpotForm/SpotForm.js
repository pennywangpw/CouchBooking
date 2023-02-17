import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpotDetails } from '../../../store/spots';

import {EditASpot} from '../EditASpot/EditASpot'


const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
  console.log("有沒有spot, formType: ", spot)
    const [id, setId] = useState(spot.id)
    const [country, setCountry] = useState(spot.country)
    const [address,setAddress] = useState(spot.address)
    const [city, setCity] = useState("")
    const [state,setState] = useState("")
    const [lat, setLat] = useState(45.2354)
    const [lng, setLng] = useState(-99.123)
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [url1, setUrl1] = useState("")
    const [url2, setUrl2] = useState("")
    const [url3, setUrl3] = useState("")
    const [url4, setUrl4] = useState("")
    const [url5, setUrl5] = useState("")
    const [errors, setErrors]= useState([])



  //validation
    useEffect(()=>{
        let e =[]
        if(country.length === 0) e.push("Country is required")
        if(address.length === 0) e.push("Address is required")
        if(city.length === 0) e.push("City is required")
        if(state.length === 0) e.push("State is required")
        if(description.length < 30) e.push("Description  needs a minimum of 30 characters")
        if(name.length === 0) e.push("Name is required")
        if(price.length === 0) e.push("Price is required")
        if(url1.length === 0) e.push("Preview image is required")
        // if(url2.length === 0) e.push("Image URL must end in .png .jpg, or .jpeg")
        console.log("rerender every time")
        setErrors(e)
    },[country,address,city,state,description,name,price,url1])


    //onChange takes cb function
    const updateCountry = (e)=> setCountry(e.target.value)
    const updateAddress = (e)=> setAddress(e.target.value)
    const updateCity = (e)=> setCity(e.target.value)
    const updateState = (e)=> setState(e.target.value)
    const updateDescription = (e)=> setDescription(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateUrl1 = (e) => setUrl1(e.target.value)
    const updateUrl2 = (e) => setUrl2(e.target.value)
    const updateUrl3 = (e) => setUrl3(e.target.value)
    const updateUrl4 = (e) => setUrl4(e.target.value)
    const updateUrl5 = (e) => setUrl5(e.target.value)


  const handleSubmit = (e) => {
    e.preventDefault();
    //payload
    spot = {country, address,city, state, description, name, price, lat, lng};

    if(formType === "Create Spot") {
      const updatedSpot = dispatch(getSpotDetails(spot));
      if(!updatedSpot) history.push(`/spots/${spot.id}`);

    }
    if(formType === "Edit Spot") {
      const updatedSpot = dispatch(getSpotDetails(spot));
      if(updatedSpot) history.push(`/spots/${spot.id}`);
    }


  };

  return (
    // <div>
    //   <br/><br/><br/><br/><br/><br/>
    //   <form onSubmit={handleSubmit} >
    //     <h2>{formType}</h2>
    //     <label>
    //       Country
    //       <input type="text" value={country} onChange={updateCountry}/>
    //     </label>
    //     <label>
    //       Street Address
    //       <input type="text" value={address} onChange={updateAddress}/>
    //     </label>
    //     <input type="submit" value={formType} />
    //   </form>
    // </div>

      <div className="spotCreation">
         <br/><br/><br/><br/><br/><br/>
            <div>{formType}</div>
            <div>
                <p>Where's your place located?</p>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <section>
                <form className="create-spot-form" onSubmit={handleSubmit}>
                     <ul className="errors">
                         {errors.length > 0 && errors.map(error=>(<li key={error}>{error}</li>))}
                    </ul>
                    <input type="text" placeholder="Country" value={country} onChange={updateCountry}/>
                    <input type="text" placeholder="Address" value={address} onChange={updateAddress}/>
                    <input type="text" placeholder="City" value={city} onChange={updateCity}/>
                    <input type="text" placeholder="State" value={state} onChange={updateState}/>
                    {/* <input type="text" placeholder="lat" value={lat} onChange={updatelat}/>
                    <input type="text" placeholder="lng" value={lng} onChange={updatelng}/> */}

                    <div>
                        <div>Describe your place to guests</div>
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</p>
                        {/* <lable for = "description">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</lable> */}
                        <textarea id="description" value={description} onChange={updateDescription}>Please write at least 30 characters</textarea>

                    </div>

                    <div>
                        <div>Create a title for your spot</div>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input type="text" placeholder="Name of your spot" value={name} onChange={updateName}/>
                    </div>

                    <div>
                        <div>Set a base price for your spot</div>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <lable for = "pricetag">$ </lable>
                        <input id= "pricetag" type="text" placeholder="Price per night(USD)" value={price} onChange={updatePrice}/>
                    </div>

                    <div>
                        <div>Liven up your spot with photos</div>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <input type="text" placeholder="Preview Image URL" value={url1} onChange={updateUrl1}/>
                        <input type="text" placeholder="Image URL" value={url2} onChange={updateUrl2}/>
                        <input type="text" placeholder="Image URL" value={url3} onChange={updateUrl3}/>
                        <input type="text" placeholder="Image URL" value={url4} onChange={updateUrl4}/>
                        <input type="text" placeholder="Image URL" value={url5} onChange={updateUrl5}/>
                    </div>

                    <input type="submit" value={formType} />

                </form>
            </section>
        </div>



  );
}

export default SpotForm;
