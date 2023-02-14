import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams } from "react-router-dom";
import './SpotsDetails.css'


const SpotsDetails = () =>{
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.singleSpot)
    console.log("SpotsDetails with spots", spots)
    // console.log("SpotsDeails with spotImages url: ",spots.SpotImages[0].url)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getSpotDetails(id));
    }, [dispatch]);

    function handleAlert(){
        alert("Feature Coming Soon.....")
    }


    if(!spots.SpotImages) return null

    return(
        <div className="details">
            <div className="name">{spots.name}</div>
            <div className="city">{spots.city}</div>
            <div className="images">
                <img className="img" src={spots.SpotImages[0].url}/>
            </div>
            <div className="descriptionNbtn">
                <div className="description">{spots.description}</div>
                <div className="actionBtn">
                    <div>{spots.price}</div>
                    <div>{spots.avgRating}</div>
                    <div>{spots.numReviews}</div>
                    <button type="button" onClick={handleAlert}>Reserve</button>
                </div>
            </div>
            <div>
                <div className="reviewDetails">
                    <div className="numOfcomments">
                        <div className="rating">{spots.avgRating}</div>
                        <div>{spots.numReviews}</div>
                    </div>

                    <div>reviews....</div>

                </div>
            </div>
        </div>

    )

}


export default SpotsDetails;
