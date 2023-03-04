import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotDetails } from "../../../store/spots";
import { getReviews } from "../../../store/reviews";
import { useParams } from "react-router-dom";
import AllReviews from "../../Reviews/AllReviews";
import ReviewSummaryInfo from "../ReviewSummaryInfo"
import './SpotsDetails.css'

//1.fetch spotDetails by spotId
//2.fetch allreveiws by spotId
//3.display spotDetails and allreviews by iterating allreviews

//SpotDetails--
//previewImg ({{url}}/spots/:id)
//price, review count, avg rating, spot img ({{url}}/spots/:id)
//reviews ('/:spotId/reviews')
//add reserve button

const SpotsDetails = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews)

    // console.log("SpotsDetails with spot: ")
    // console.log(spot)
    // console.log("SpotsDetails with reviews: ")
    // console.log(reviews)
    // console.log("SpotsDeails with spotImages url: ",spot.SpotImages[0].url)

    //get the spotId from the path and fetch the data from db
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

    //shows "Unable to retrieve details. Please try again shortly" when the page doesn't render successfully
    if (!spot || !spot.SpotImages) return (
        <div>
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <div className="warning">Unable to retrieve details. Please try again shortly.</div>
        </div>
    )

    // if(spot.SpotImages.length === 0) return null
    // console.log("HEREEE URL: ",spot.SpotImages[0].url)

    // //reviewChecker & divider(dot)
    // let avgStars = spot.avgRating;
    // let divider = " ";
    // let reviewNum = spot.numReviews
    // let reviewChecker;
    // if (reviewNum === 1) {
    //     reviewChecker = "review"
    //     avgStars = avgStars.toFixed(2)
    //     divider = "·"
    // } else if (reviewNum === 0) {
    //     reviewChecker = "New"
    //     avgStars = ""
    //     reviewNum = ""
    // } else {
    //     reviewChecker = ' reviews'
    //     avgStars = avgStars.toFixed(2)
    //     divider = "·"
    // }
    // console.log("會顯示 reviewNum, reviewChecker, divider2: ", reviewNum, reviewChecker, divider)


    // console.log("列印前的reviewNum: ", reviewNum)

    //to display the images we have to make a loop to create div to store it
    return (

        <div className="details">
            <h1>
                <div className="name">{spot.name}</div>
            </h1>
            <h2>
                <div className="city">{spot.city}, {spot.state}, {spot.country}</div>
            </h2>

            <div className="imgContainer">

                {spot.SpotImages.map(img =>
                    <img className="sImgSize" src={img.url} alt='image' key={img.id} />
                )}

                {/* <div className="bigImg">
                    <img className="bimgSize" src={spot.SpotImages[0].url} alt='previewImg' />
                </div>


                <div className="smallImg1">
                    {!spot.SpotImages[1] || spot.SpotImages[1] === undefined ? "" : <img className="sImgSize" src={spot.SpotImages[1].url} alt='otherImg' />}
                </div>
                <div className="smallImg2">
                    {!spot.SpotImages[2] || spot.SpotImages[2] === undefined ? "" : <img className="sImgSize" src={spot.SpotImages[2].url} alt='otherImg' />}
                </div>
                <div className="smallImg3">
                    {!spot.SpotImages[3] || spot.SpotImages[3] === undefined ? "" : <img className="sImgSize" src={spot.SpotImages[3].url} alt='otherImg' />}
                </div>
                <div className="smallImg4">
                    {!spot.SpotImages[4] || spot.SpotImages[4] === undefined ? "" : <img className="sImgSize" src={spot.SpotImages[4].url} alt='otherImg' />}
                </div> */}

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
                            <div className="actPrice">${spot.price}
                                <label className="actLabel">night</label>
                            </div>
                            <div className="actPrice">
                                <ReviewSummaryInfo spot={spot} reviews={reviews} />
                                {/* <label className="actLabel"><i className="fa-solid fa-star"></i>{avgStars} </label>
                                <label className="actLabel">{divider} </label>
                                <label className="actLabel">{reviewNum} {reviewChecker}</label> */}

                            </div>
                        </div>

                        <div>
                            <button type="button" className="actButton" onClick={handleAlert}>Reserve</button>
                        </div>
                    </div>
                </div>

            </div>


            <div className="reviewDetails">
                <div className="numOfcomments">
                    <ReviewSummaryInfo spot={spot} />
                    {/* <div className="rating"><i className="fa-solid fa-star"></i> {avgStars}</div>
                    <div className="reviewsCount">{divider} </div>
                    <div className="reviewsCount">{reviewNum} {reviewChecker}</div> */}
                </div>
                <div>
                    <AllReviews reviews={reviews} />
                </div>
            </div>


        </div>

    )

}


export default SpotsDetails;
