import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCurrentSpots, getAllSpots } from "../../../store/spots";
import { useHistory } from "react-router-dom";
import DeleteFormModal from '../../DeleteConfirmationModal';
import OpenModalButton from "../../OpenModalButton";

import './CurrentSpot.css';

//get the all spots data from db
//check if the the ownerId equals to userId and add it into the array
//display on the browser

const CurrentSpot = () => {

    //define dispatch & history
    const dispatch = useDispatch()
    const history = useHistory()

    //get all spots
    const spots = useSelector(state => state.spots.allSpots)

    //get user data from Store
    const user = useSelector(state => state.session.user)

    //convert obj into arr
    const spotsArr = Object.values(spots)

    //get the spot which spot's ownerId === userId
    const userSpots = []
    spotsArr.forEach(spot => {
        if (spot.ownerId === user.id) {
            userSpots.push(spot)
        }
    })


    //to get other images from db, those are not in spot
    //userEffect will happend after 1st render
    useEffect(() => {
        dispatch(getCurrentSpots());
    }, [dispatch]);


    return (
        <div>
            <div className="manageSpot">Manage Your Spots</div>
            <div className='currentallSpotImg'>
                {userSpots.length === 0 ? (<NavLink to="/spots/new" style={{ textDecoration: 'none', color: 'black' }}><div id="creatBtn">Create a New Spot</div></NavLink>) : userSpots.map(({ id, previewImage, city, price, avgRating, state }) => (
                    // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
                    <div id="currentSpot">
                        <NavLink to={`/spots/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className="spotImgOutter" key={id} >
                                <img className="spotImg" src={previewImage} alt="spot" />
                                <div className="cityNpriceNrate">
                                    <div className="location">{city},{state}</div>
                                    <div className="rate"><i class="fa-solid fa-star"></i> {typeof avgRating === "number" ? avgRating.toFixed(2) : "0"}</div>
                                    {/* <div className="priceNbtn"> */}
                                    <div className="price">${price} night</div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </NavLink>
                        <div className="actionBtn">
                            <button type="button" className="button-13" onClick={() => { history.push(`/spots/${id}/edit`) }}>Update</button>

                            <OpenModalButton
                                buttonText="delete"
                                className="button-13"
                                modalComponent={<DeleteFormModal spotId={id} type="spot" />}
                            />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default CurrentSpot;
