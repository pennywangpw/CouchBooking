import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

//create A spot info -- city, avgRating, price
const SpotInfo = ({ spotObj }) => {

    if (spotObj.avgRating === undefined) {
        spotObj.avgRating = "New"
    } else {
        if (typeof spotObj.avgRating === "number") {
            spotObj.avgRating = (spotObj.avgRating.toFixed(2))

        }
    }

    // const avgRatingCaculator = ()=>{
    //     if(spotObj.avgRating ===undefined){
    //         // spotObj.avgRating = "New"
    //         return "New"
    //     }else{
    //         if(typeof spotObj.avgRating === "number"){
    //             spotObj.avgRating = spotObj.avgRating.toFixed(2)
    //             return ("★",spotObj.avgRating)
    //         }
    //     }
    // }


    return (
        <div className="cityNpriceNrate">
            <div className="city">{spotObj.city},{spotObj.state}</div>
            {/* <div className="rate">{spotObj.avgRating}</div> */}
            <div className="rate"><i class="fa-solid fa-star"></i> {spotObj.avgRating}</div>
            <div className="price">${spotObj.price} night</div>
        </div>
    )

}
export default SpotInfo;
