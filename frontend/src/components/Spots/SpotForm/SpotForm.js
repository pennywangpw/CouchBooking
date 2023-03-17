import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createASpot, editASpot, createNewImgs } from '../../../store/spots';
import './SpotForm.css';


//目前只有previewImage,
const SpotForm = ({ spot, formType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("有沒有spot, formType: ", spot)
  const [id, setId] = useState(spot.id)
  const [country, setCountry] = useState(spot.country)
  const [address, setAddress] = useState(spot.address)
  const [city, setCity] = useState(spot.city)
  const [state, setState] = useState(spot.state)
  const [lat, setLat] = useState(45.2354)
  const [lng, setLng] = useState(-99.123)
  const [description, setDescription] = useState(spot.description)
  const [name, setName] = useState(spot.name)
  const [price, setPrice] = useState(spot.price)
  // const [url1, setUrl1] = useState(spot.previewImage)
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [url5, setUrl5] = useState("")
  const [errors, setErrors] = useState([])
  // const [formatcheck, setFormatcheck] = useState("")



  //validation
  useEffect(() => {
    let e = []
    if (country.length === 0) e.push("Country is required")
    if (address.length === 0) e.push("Address is required")
    if (city.length === 0) e.push("City is required")
    if (state.length === 0) e.push("State is required")
    if (description.length < 30) e.push("Description  needs a minimum of 30 characters")
    if (name.length === 0) e.push("Name is required")
    if (price.length === 0) e.push("Price is required")
    if (url1.length === 0) e.push("Preview image is required")
    if (url2.length === 0) e.push("Image URL must end in .png .jpg, or .jpeg")
    console.log("rerender every time")
    setErrors(e)
  }, [country, address, city, state, description, name, price, url1])


  //onChange takes cb function
  const updateCountry = (e) => setCountry(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateName = (e) => setName(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updateUrl1 = (e) => setUrl1(e.target.value)
  const updateUrl2 = (e) => setUrl2(e.target.value)
  const updateUrl3 = (e) => setUrl3(e.target.value)
  const updateUrl4 = (e) => setUrl4(e.target.value)
  const updateUrl5 = (e) => setUrl5(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    //payload
    // issue-- create a spot we don't need previewImg, however when we want to display it we need it
    const payload = { ...spot, country, address, city, state, description, name, price, lat, lng, url1, url2, url3, url4, url5 };
    console.log("這裡是payload: ", payload)




    // //checking url format
    // //if it's not .png .jpg .jpeg then we set Url
    // if ((url1.length > 0) && (!url1.endsWith(".png") && !url1.endsWith(".jpg") && !url1.endsWith(".jpeg"))) {
    //   setUrl1("pls provide the valid")
    //   console.log("url1 yes")
    // }
    // if ((url2.length > 0) && (!url2.endsWith(".png") && !url2.endsWith(".jpg") && !url2.endsWith(".jpeg"))) {
    //   // console.log("url2 yes", formatcheck)
    //   setUrl2("pls provide the valid")
    // }
    // if ((url3.length > 0) && (!url3.endsWith(".png") && !url3.endsWith(".jpg") && !url3.endsWith(".jpeg"))) {

    //   setUrl3("pls provide the valid")
    //   console.log("url3 yes")
    // }
    // if ((url4.length > 0) && (!url4.endsWith(".png") && !url4.endsWith(".jpg") && !url4.endsWith(".jpeg"))) {

    //   setUrl4("pls provide the valid")
    // }
    // if ((url5.length > 0) && (!url5.endsWith(".png") && !url5.endsWith(".jpg") && !url5.endsWith(".jpeg"))) {

    //   setUrl5("pls provide the valid")
    // }
    // console.log("確認現在的url1: ", url1)
    // console.log("確認現在的url2: ", url2)
    // console.log("確認現在的url3: ", url3)
    // console.log("確認現在的url4: ", url4)
    // console.log("確認現在的url5: ", url5)


    // if (url1 === "pls provide the valid" || url2 === "pls provide the valid" || url3 === "pls provide the valid" || url4 === "pls provide the valid" || url5 === "pls provide the valid") {
    //   console.log("url2印出來: ", url1, url2, url3, url4, url5)
    //   return
    // }


    //FormType is CreateASpot
    //1.CreateASpot
    //2.make sure there's url in Store
    if (formType === "Create a New Spot") {

      let createdSpot = await dispatch(createASpot(payload));
      console.log("SpotForm---createdSpot: ", createdSpot)


      let createImg1;
      let createImg2;
      let createImg3;
      let createImg4;
      let createImg5;

      if (url1) createImg1 = await dispatch(createNewImgs({ newUrl: url1, spotId: createdSpot.id }))
      if (url2) createImg2 = await dispatch(createNewImgs({ newUrl: url2, spotId: createdSpot.id }))
      if (url3) createImg3 = await dispatch(createNewImgs({ newUrl: url3, spotId: createdSpot.id }))
      if (url4) createImg4 = await dispatch(createNewImgs({ newUrl: url4, spotId: createdSpot.id }))
      if (url5) createImg5 = await dispatch(createNewImgs({ newUrl: url5, spotId: createdSpot.id }))


      if (createASpot) {
        history.push(`/spots/${createdSpot.id}`);
      }

    }

    //FormType is Edit Spot
    //find the spot === parmas id (in EditAspot)
    //update the current spot
    if (formType === "Edit Spot") {
      console.log("HIT EDIT SPOT with passed in exsiting spot: ", spot)
      console.log("HIT EDIT SPOT with revised spot: ", payload)
      const updatedSpot = dispatch(editASpot(payload));
      if (updatedSpot) history.push(`/spots/${spot.id}`);
    }




  };

  return (
    <div className="classFather">
      <div className='spotCreation'>
        <br /><br />

        <div><h2>{formType}</h2></div>

        <div>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </div>
        <section>
          <form onSubmit={handleSubmit}>

            <div>
              <label htmlFor='country'>
                Country
                {errors.includes("Country is required") ? <label htmlFor='country' className="errorLabel"> Country is required</label> : null}
                {/* {country.length === 0 && <label htmlFor='country' className="errorLabel"> Country is required</label>} */}
              </label>

              <input id="country" type="text" className="inputBoxBottom" placeholder="Country" value={country} onChange={updateCountry} />
            </div>

            <div>
              <label htmlFor='address'>
                Address
                {errors.includes("Address is required") ? <label htmlFor='address' className="errorLabel"> Address is required</label> : null}
                {/* {address.length === 0 && <label htmlFor='address' className="errorLabel"> Address is required</label>} */}
              </label>
              <input id="address" type="text" className="inputBoxBottom" placeholder="Address" value={address} onChange={updateAddress} />
            </div>

            <div>
              <label htmlFor='city'>
                City
                {errors.includes("City is required") ? <label htmlFor='city' className="errorLabel"> City is required</label> : null}
                {/* {city.length === 0 && <label htmlFor='city' className="errorLabel"> City is required</label>} */}
              </label>
              <input id="city" type="text" className="inputBoxBottom" placeholder="City" value={city} onChange={updateCity} />
            </div>

            <div>
              <label htmlFor='state'>
                State
                {errors.includes("State is required") ? <label htmlFor='state' className="errorLabel"> State is required</label> : null}
                {/* {state.length === 0 && <label htmlFor='state' className="errorLabel"> State is required</label>} */}
              </label>
              <input id="state" type="text" className="inputBoxBottom" placeholder="State" value={state} onChange={updateState} />
            </div>


            <div className='divGap'><hr /></div>

            {/* <input type="text" placeholder="lat" value={lat} onChange={updatelat}/>
            <input type="text" placeholder="lng" value={lng} onChange={updatelng}/> */}

            <div>
              <h3> Describe your place to guests </h3>
              <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</p>
              {/* <lable for = "description">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</lable> */}
              <textarea id="description" className="labelBox" value={description} onChange={updateDescription} placeholder="Please write at least 30 characters">Please write at least 30 characters</textarea>
            </div>

            {errors.includes("Description  needs a minimum of 30 characters") ? <label htmlFor="description" className="errorLabel"> Description needs a minimum of 30 characters</label> : null}
            {/* {
              description.length < 30 && <label className="errorLabel"> Description needs a minimum of 30 characters</label>
            } */}
            <div className='divGap'><hr /></div>
            <div>
              <h3>Create a title for your spot</h3>
              <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
              <input type="text" id="title" className="inputBoxTop" placeholder="Name of your spot" value={name} onChange={updateName} />
              <div>
                {errors.includes("Name is required") ? <label htmlFor='title' className="errorLabel"> Name is required</label> : null}
                {/* {
                  name.length === 0 && <label className="errorLabel"> Name is required</label>
                } */}
              </div>
            </div>

            <div className='divGap'><hr /></div>

            <div>
              <h3>Set a base price for your spot</h3>
              <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
              <div className='priceDiv'>
                {/* <lable for="pricetag">$</lable> */}
                <input id="pricetag" className="priceBox" type="text" placeholder="Price per night(USD)" value={price} onChange={updatePrice} />
              </div>
            </div>
            <div>
              {errors.includes("Price is required") ? <label htmlFor='pricetag' className="errorLabel"> Price is required</label> : null}
              {/* {
                price.length === 0 && <label className="errorLabel"> Price is required</label>
              } */}
            </div>
            <div className='divGap'><hr /></div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>

            <div className='urlDiv'>
              <input type="url" className="inputURL" id="url1" placeholder="Preview Image URL" value={url1} onChange={updateUrl1} />
              {errors.includes("Preview image is required") ? <label htmlFor='url1' className="errorLabel"> Preview image is required</label> : null}
            </div>

            {/* {
              (!url1 || url1 === undefined)
              && <label className="errorLabel">Preview image is required</label>
            } */}

            <div className='urlDiv'>
              <input type="url" className="inputURL" placeholder="Image URL" id="url2" value={url2} onChange={updateUrl2} />
              {/* {url2 === "pls provide the valid" ? <label htmlFor='url2' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
              {/* {url2 === "" ? <label htmlFor='url2' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
              {/* {errors.includes("Image URL must end in .png .jpg, or .jpeg") ? <label htmlFor='url2' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
            </div>

            {/* {
              (!url1 || url1 === undefined)
              && <label className="errorLabel">Image URL must end in .png .jpg, or .jpeg</label>
            } */}
            <div className='urlDiv'>
              <input type="url" className="inputURL" placeholder="Image URL" value={url3} onChange={updateUrl3} />
              {/* {url3 === "pls provide the valid" ? <label htmlFor='url3' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
            </div>

            <div className='urlDiv'>
              <input type="url" className="inputURL" placeholder="Image URL" value={url4} onChange={updateUrl4} />
              {/* {url4 === "pls provide the valid" ? <label htmlFor='url4' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
            </div>
            <div className='urlDiv'>
              <input type="url" className="inputURL" placeholder="Image URL" value={url5} onChange={updateUrl5} />
              {/* {url5 === "pls provide the valid" ? <label htmlFor='url5' className="errorLabel"> Image URL must end in .png .jpg, or .jpeg</label> : null} */}
            </div>
            <div className='divGap'><hr /></div>

            <input type="submit" value={"Create Spot"} />
            <br /><br /><br />
          </form>
        </section>
      </div>
    </div>


  );

}

export default SpotForm;
