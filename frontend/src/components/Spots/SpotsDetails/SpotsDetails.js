import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetails } from "../../../store/spots";
import { getReviews } from "../../../store/reviews";
import { NavLink, useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews";
import './SpotsDetails.css'

//SpotDetails--
//previewImg ({{url}}/spots/:id)
//price, review count, avg rating, spot img ({{url}}/spots/:id)
//reviews ('/:spotId/reviews')
//add reserve button

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)
    // console.log("THIS IS SPOTSDETAILS WITH REVIEWS: ", reviews)
    const spots = useSelector(state => state.spots.singleSpot)
    console.log("SpotsDetails with spots: ")
    console.log(spots)
    // console.log("SpotsDeails with spotImages url: ",spots.SpotImages[0].url)

    const { id } = useParams()
    console.log("SD的id from params: ", +id)
    console.log("SD的 id from params TYPE: ", typeof id)
    useEffect(() => {
        console.log("SpotsDetails---useEffect")
        dispatch(getSpotDetails(id));
        dispatch(getReviews(id));
    }, [dispatch, JSON.stringify(reviews)]);

    //alert function
    function handleAlert() {
        alert("Feature Coming Soon.....")
    }

    if (!spots || !spots.SpotImages) return (
        <div>
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <div>"Unable to retrieve details. Please try again shortly".</div>

        </div>)

    // if(spots.SpotImages.length === 0) return null
    // console.log("HEREEE URL: ",spots.SpotImages[0].url)

    //Re-assign numReviews
    let reviewChecker;
    let divider;
    let reviewNum = spots.numReviews;
    if (reviewNum === 1) {
        reviewChecker = "review"
        divider = <i class="fa-solid fa-circle-dot"></i>
    } else if (reviewNum === 0) {
        reviewChecker = "New"
        reviewNum = ""
    } else {
        reviewChecker = ' reviews'
        divider = <i class="fa-solid fa-circle-dot"></i>
    }


    // const noReviewsYet = () => {
    //     if (reviewChecker === "New" && user) {
    //         return (
    //             <div>
    //                 Be the first to post a review!
    //             </div>
    //         )
    //     }
    // }



    //to display the images we have to make a loop to create div to store it
    return (
        <div className="BodyContainer">
            <div className="details">
                <h1>
                    <div className="name">{spots.name}</div>
                </h1>
                <h2>
                    <div className="city">{spots.city}, {spots.state}, {spots.country}</div>
                </h2>

                <div class="container">

                    <div class="bigImg">
                        <img className="bimgSize" src={spots.SpotImages[0].url} alt='previewImg' />
                    </div>


                    <div class="sImg1">
                        {!spots.SpotImages[1] || spots.SpotImages[1] === undefined ? "" : <img className="sImgSize" src={spots.SpotImages[1].url} alt='otherImg' />}


                    </div>
                    <div class="sImg2">
                        {!spots.SpotImages[2] || spots.SpotImages[2] === undefined ? "" : <img className="sImgSize" src={spots.SpotImages[2].url} alt='otherImg' />}
                    </div>
                    <div class="sImg3">
                        {!spots.SpotImages[3] || spots.SpotImages[3] === undefined ? "" : <img className="sImgSize" src={spots.SpotImages[3].url} alt='otherImg' />}
                    </div>
                    <div class="sImg4">
                        {!spots.SpotImages[4] || spots.SpotImages[4] === undefined ? "" : <img className="sImgSize" src={spots.SpotImages[4].url} alt='otherImg' />}
                    </div>


                    {/* <div class="sImg1">
                        <img className="sImgSize" src={!spots.SpotImages[1] || spots.SpotImages[1] === undefined ? "" : spots.SpotImages[1].url} alt='otherImg' />
                    </div>
                    <div class="sImg2">
                        <img className="sImgSize" src={!spots.SpotImages[2] || spots.SpotImages[2] === undefined ? "" : spots.SpotImages[2].url} alt='otherImg' />
                    </div>
                    <div class="sImg3">
                        <img className="sImgSize" src={!spots.SpotImages[3] || spots.SpotImages[3] === undefined ? "" : spots.SpotImages[3].url} alt='otherImg' />
                    </div>
                    <div class="sImg4">
                        <img className="sImgSize" src={!spots.SpotImages[4] || spots.SpotImages[4] === undefined ? "" : spots.SpotImages[4].url} alt='otherImg' />
                    </div> */}
                </div>


                <div className="descriptionNbtn">
                    <div className="description">
                        <h3><div>
                            Hosted by {spots.Owner.firstName}{spots.Owner.lastName}
                        </div>
                        </h3>
                        <div className="description">{spots.description}</div>
                    </div>
                    <div className="actionContainer">
                        <div className="actFormat">
                            <div className="actText">
                                <div class="actPrice">${spots.price}
                                    <label className="actLabel">night</label>
                                </div>
                                <div class="actPrice">

                                    <label className="actLabel">★{spots.avgRating}{divider}</label>
                                    <label className="actLabel">{spots.numReviews} </label>
                                    <label className="actLabel">{reviewChecker}</label>

                                </div>
                            </div>
                            <div>
                                <button type="button" className="actButton" onClick={handleAlert}>Reserve</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="reviewDetails">
                        <div className="numOfcomments">
                            <div className="rating">★ {spots.avgRating}</div>
                            <div className="reviewsCount">{spots.numReviews} {reviewChecker}</div>
                        </div>
                        <div>
                            <AllReviews reviews={reviews} />
                        </div>
                    </div>
                </div>

                {/* <div className="descriptionNbtn">
                    <div className="description">
                        <div>Hosted by {spots.Owner.firstName}{spots.Owner.lastName}</div>
                        <div className="description">{spots.description}</div>
                    </div>
                    <div className="actionBtn">
                        <div>
                            <div class="price">${spots.price}</div>
                            <lable class="price">night</lable>
                        </div>
                        <div>★{spots.avgRating}{divider} </div>
                        <div>{spots.numReviews} {reviewChecker}</div>
                        <button type="button" onClick={handleAlert}>Reserve</button>
                    </div>
                </div>
                <div>
                    <div className="reviewDetails">
                        <div className="numOfcomments">
                            <div className="rating">★ {spots.avgRating}</div>
                            <div>{spots.numReviews}</div>
                        </div>


                        <AllReviews reviews={reviews} spots={spots} />

                    </div>
                </div> */}


            </div>
        </div>
    )

}


export default SpotsDetails;
