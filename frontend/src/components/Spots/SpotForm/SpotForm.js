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
  const [url1, setUrl1] = useState(spot.previewImage)
  const [url2, setUrl2] = useState("")
  const [url3, setUrl3] = useState("")
  const [url4, setUrl4] = useState("")
  const [url5, setUrl5] = useState("")
  const [errors, setErrors] = useState([])



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
    // if(url1.length === 0) e.push("Preview image is required")
    // if(url2.length === 0) e.push("Image URL must end in .png .jpg, or .jpeg")
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

    //1.createASpot
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
    <div className="classFather">
      <div className='spotCreation'>
        <br /><br /><br /><br /><br /><br />

        <div><h2>{formType}</h2></div>

        <div>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </div>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              Country {
                country.length === 0 && <label className="errorLabel"> Country is required</label>}
            </div>
            <div>
              <input type="text" className="inputBoxBottom" placeholder="Country" value={country} onChange={updateCountry} />
            </div>

            <div>
              Address {
                address.length === 0 && <label className="errorLabel"> Address is required</label>}
            </div>
            <div>
              <input type="text" className="inputBoxBottom" placeholder="Address" value={address} onChange={updateAddress} />
            </div>

            <div>
              City {
                city.length === 0 && <label className="errorLabel"> City is required</label>}
            </div>
            <div>
              <input type="text" className="inputBoxBottom" placeholder="City" value={city} onChange={updateCity} />
            </div>

            <div>
              State {
                state.length === 0 && <label className="errorLabel"> State is required</label>}
            </div>
            <div>
              <input type="text" className="inputBoxBottom" placeholder="State" value={state} onChange={updateState} />
            </div>

            <div className='divGap'><hr /></div>

            {/* <input type="text" placeholder="lat" value={lat} onChange={updatelat}/>
            <input type="text" placeholder="lng" value={lng} onChange={updatelng}/> */}

            <div>
              <h3> Describe your place to guests </h3>
              <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</p>
              {/* <lable for = "description">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neightborhood.</lable> */}
              <textarea id="description" className="labelBox" value={description} onChange={updateDescription}>Please write at least 30 characters</textarea>
            </div>
            {
              description.length < 30 && <label className="errorLabel"> Description needs a minimum of 30 characters</label>
            }
            <div className='divGap'><hr /></div>
            <div>
              <h3>Create a title for your spot</h3>
              <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
              <input type="text" className="inputBoxTop" placeholder="Name of your spot" value={name} onChange={updateName} />
              <div>
                {
                  name.length === 0 && <label className="errorLabel"> Name is required</label>
                }
              </div>
            </div>

            <div className='divGap'><hr /></div>

            <div>
              <h3>Set a base price for your spot</h3>
              <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
              <div className='priceDiv'>
                <lable for="pricetag">$</lable>
                <input id="pricetag" className="priceBox" type="text" placeholder="Price per night(USD)" value={price} onChange={updatePrice} />
              </div>
            </div>
            <div>
              {
                price.length === 0 && <label className="errorLabel"> Price is required</label>
              }
            </div>
            <div className='divGap'><hr /></div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <div className='urlDiv'><input type="text" className="inputURL" placeholder="Preview Image URL" value={url1} onChange={updateUrl1} /></div>
            {
              (!url1 || url1 === undefined)
              && <label className="errorLabel">Preview image is required</label>
            }

            <div className='urlDiv'><input type="text" className="inputURL" placeholder="Image URL" value={url2} onChange={updateUrl2} /></div>
            {
              (!url1 || url1 === undefined)
              && <label className="errorLabel">Image URL must end in .png .jpg, or .jpeg</label>
            }
            <div className='urlDiv'><input type="text" className="inputURL" placeholder="Image URL" value={url3} onChange={updateUrl3} /></div>
            <div className='urlDiv'><input type="text" className="inputURL" placeholder="Image URL" value={url4} onChange={updateUrl4} /></div>
            <div className='urlDiv'><input type="text" className="inputURL" placeholder="Image URL" value={url5} onChange={updateUrl5} /></div>
            <div className='divGap'><hr /></div>

            <input type="submit" value={"Create"} />

          </form>
        </section>
      </div>
    </div>


  );

}

export default SpotForm;
