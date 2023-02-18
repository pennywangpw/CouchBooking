import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { getReviews } from "../../../store/reviews";
import { NavLink, useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews";
import './SpotsDetails.css'

//SpotDetails--
//previewImg ({{url}}/spots/:id)
//price, review count, avg rating, spot img ({{url}}/spots/:id)
//reviews ('/:spotId/reviews')
//add reserve button

const SpotsDetails = () =>{
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)
    // console.log("THIS IS SPOTSDETAILS WITH REVIEWS: ", reviews)
    const spots = useSelector(state => state.spots.singleSpot)
    console.log("SpotsDetails with spots: ")
    console.log(spots)
    // console.log("SpotsDeails with spotImages url: ",spots.SpotImages[0].url)

    const {id} = useParams()
    console.log("SD的id from params: ", +id)
    console.log("SD的 id from params TYPE: ", typeof id)
    useEffect(() => {
        console.log("SpotsDetails---useEffect")
        dispatch(getSpotDetails(id));
        dispatch(getReviews(id));
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
            <div className="city">{spots.city}, {spots.state}, {spots.country}</div>
            <div className="images">
                <img className="img" src={spots.SpotImages[0].url} alt='previewImg'/>
            </div>
            <div className="descriptionNbtn">
                <div>Hosted by {spots.Owner.firstName}{spots.Owner.lastName}</div>
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


                    <AllReviews reviews={reviews}/>

                </div>
            </div>
        </div>

    )

}


export default SpotsDetails;
