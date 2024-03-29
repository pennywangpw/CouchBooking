import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpotDetails } from "../../../store/spots";
import { getReviews } from "../../../store/reviews";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews";
import ReviewSummaryInfo from "../ReviewSummaryInfo";
import ImageCreator from "../SpotImages";
import './SpotsDetails.css';

//1.fetch spotDetails by spotId
//2.fetch allreveiws by spotId
//3.display spotDetails and allreviews by iterating allreviews

//SpotDetails--
//previewImg ({{url}}/spots/:id)
//price, review count, avg rating, spot img ({{url}}/spots/:id)
//reviews ('/:spotId/reviews')
//add reserve button

const defaultUrl = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const reviewsbyspotId = useSelector(state => state.reviews)


    //get the spotId from the path and fetch the data from db
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        dispatch(getReviews(spotId));
    }, [spotId]);



    //alert function for Reserve button
    function handleAlert() {
        alert("Feature Coming Soon.....")
    }


    //shows "Unable to retrieve details. Please try again shortly" when the page doesn't render successfully
    if (!spot || !spot.SpotImages) return (
        <div>
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <div className="warning">Unable to retrieve details. Please try again shortly.</div>
        </div>
    )


    return (
        <div className="detailspage">
            <div className="details">
                <h2>
                    <div className="name">{spot.name}</div>
                </h2>
                <h3>
                    <div className="city">{spot.city}, {spot.state}, {spot.country}</div>
                </h3>

                <div className="imgContainer">

                    {[...spot.SpotImages, ...Array(5 - spot.SpotImages.length).fill({ url: defaultUrl })].map(img => {
                        return <ImageCreator spotImg={img.url} />
                        // return <img className="sImgSize" src={img.url} alt='image' key={img.id} />
                    })}

                </div>

                <div className="descriptionNbtn">

                    <div className="description">
                        <h3>
                            <div>
                                Hosted by {spot.Owner.firstName}{spot.Owner.lastName}
                            </div>
                        </h3>
                        <div className="description">{spot.description}</div>
                    </div>

                    <div className="actionContainer">
                        <div className="actFormat">
                            <div className="actText">
                                <div className="actInfo">${spot.price}
                                    <label htmlFor="actInfo" className="actLabel">night</label>
                                    {/* <label className="actLabel">night</label> */}
                                </div>
                                <div className="actInfo2">
                                    <ReviewSummaryInfo spot={spot} reviews={reviewsbyspotId} />
                                </div>
                            </div>

                            <div>
                                <button type="button" className="button-14 " onClick={handleAlert}>Reserve</button>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="reviewDetails">
                    <div className="numOfcomments">
                        <ReviewSummaryInfo spot={spot} />
                    </div>
                    <div>
                        <AllReviews reviews={reviewsbyspotId} />
                    </div>
                </div>


            </div>
        </div>

    )

}


export default SpotsDetails;
