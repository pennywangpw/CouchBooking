import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {getCurrentSpots} from "../../../store/spots";
import { useHistory } from "react-router-dom";
import DeleteFormModal from '../../DeleteConfirmationModal';
import OpenModalButton from "../../OpenModalButton";

import './CurrentSpot.css';

//get the all spots data from db
//check if the the ownerId equals to userId and add it into the array
//display on the browser

const CurrentSpot = () =>{
    //define dispatch & history
    const dispatch = useDispatch()
    const history = useHistory()

    console.log("This is CurrentSpot !!!")
    //get all spots
    const spots = useSelector(state=>state.spots.allSpots)
    console.log("CurrentSpot---spots: ", spots)
    //get user data from Store
    const user = useSelector(state=>state.session.user)
    console.log("CurrentSpot--- user: ",user)
    //convert obj into arr
    const spotsArr = Object.values(spots)
    console.log("spotsArr 在這裡: ", spotsArr)
    //get the spot which spot's ownerId === userId
    const userSpots = []
    spotsArr.forEach(spot=>{
        if(spot.ownerId === user.id){
            userSpots.push(spot)
        }
    })
    console.log("this is userSpots: ", userSpots)

    //to get other images from db, those are not in spot
    //userEffect will happend after 1st render
    useEffect(() => {
        dispatch(getCurrentSpots());
      }, [dispatch]);


    return(
        <div>
            <br/> <br/> <br/> <br/> <br/> <br/>
            <div>Manage Your Spots</div>
            <div className='currentSpotCards'>
                {userSpots.map(({id, previewImage,city,price,avgRating,state})=>(
                    // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
                    <div className="spotImgOutter" key={id} >
                        <NavLink to ={`/spots/${id}`}>
                        <img className="spotImg" src={previewImage} alt="spot"/>
                        </NavLink>
                        <div className="cityNpriceNrate">
                            <div className="location">{state},{city}</div>
                            <div className="rate">{avgRating}</div>
                            <div className="priceNbtn">
                                <div className="price">${price} night</div>
                                <div className="actionBtn">
                                    <button type="button" onClick={()=>{history.push(`/spots/${id}/edit`)}}>Update</button>
                                    <div>
                                    <OpenModalButton
                                        buttonText="delete"
                                        modalComponent={<DeleteFormModal  id={id}/>}
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default CurrentSpot;
