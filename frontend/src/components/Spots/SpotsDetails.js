import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Spots.css';


const SpotsDetails = () =>{
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots)
    console.log("SpotsDetails functional component spots: ", spots)
}


export default SpotsDetails;
