import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots, getSpotDetails } from "../../../store/spots";
import { NavLink, useParams } from "react-router-dom";



// dispatch all the reviews
const allReviews = () =>{
    const dispatch = useDispatch()


    return(
        <div>
            <br/><br/><br/><br/><br/><br/>
            <div>Here</div>

        </div>
    )


}


export default allReviews
