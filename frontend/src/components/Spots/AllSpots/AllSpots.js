import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../../store/spots";
import { NavLink } from "react-router-dom";
import SpotInfo from "../SpotInfo";
import './Spots.css';

//1.fetch getallspot
//2.iterate through allspots to create tiles with spotInfo

const AllSpots = () => {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.allSpots)


  //convert into array
  const spotsArr = Object.values(spots)


  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  //if there's no spots can be shown
  if (spotsArr.length === 0) return (
    <div className="warning">
      "Unable to retrieve spots. Please try again shortly".
    </div>
  )


  return (
    <div className='allSpotImg'>
      {spotsArr.map((spot) => (
        <div className="spotImgOutter">
          <NavLink to={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }} className="tooltip">
            <div className="img" key={spot.id}>
              <span class="tooltiptext">{spot.name}</span>
              <img className="spotImg" src={spot.previewImage} alt="spotPreviewImg" />
              <SpotInfo spotObj={spot} />
            </div>
          </NavLink>
        </div>
      ))
      }
    </div >
  )

}






export default AllSpots;
