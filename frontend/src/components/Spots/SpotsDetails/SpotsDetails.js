import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams } from "react-router-dom";
import './SpotsDetails.css'


const SpotsDetails = () =>{
    const dispatch = useDispatch()
    // const reviews = useSelector(state => state.spots.singleSpot)
    const spots = useSelector(state => state.spots.singleSpot)
    console.log("SpotsDetails with spots: ")
    console.log( spots)
    // console.log("SpotsDeails with spotImages url: ",spots.SpotImages[0].url)
    const {id} = useParams()
    console.log("id from params: ", id)
    useEffect(() => {
        console.log("SpotsDetails---useEffect")
        dispatch(getSpotDetails(id));
        // dispatch(getReviews(id));
    }, [dispatch]);

    //alert function
    function handleAlert(){
        alert("Feature Coming Soon.....")
    }

    if(!spots  || !spots.SpotImages ) return null

    // if(spots.SpotImages.length === 0) return null
    // console.log("HEREEE URL: ",spots.SpotImages[0].url)

    return(
        <div className="details">
            <br/><br/><br/><br/><br/><br/>
            <div className="name">{spots.name}</div>
            <div className="city">{spots.city}</div>
            <div className="images">
                <img className="img" src={spots.SpotImages[0].url} alt='previewImg'/>
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
