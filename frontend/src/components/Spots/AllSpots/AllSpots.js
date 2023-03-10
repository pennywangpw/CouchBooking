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
  // console.log("ths is AllSpots functional component spots: ", spots)

  //convert into array
  const spotsArr = Object.values(spots)
  // console.log("AllSpots with spotsArr: ", spotsArr)

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
        // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
        <div className="spotImgOutter" key={spot.id}>
          <NavLink to={`/spots/${spot.id}`}>
            <img className="spotImg" src={spot.previewImage} alt="spotPreviewImg" />
          </NavLink>
          <SpotInfo spotObj={spot} />
        </div>
      ))
      }
    </div>
  )

  // //practice
  // const generateSpot = ()=>{
  //     <button>hello</button>
  //     dispatch(getAllSpots())
  // }


  // return(
  //     <button onClick={generateSpot}>hello</button>

  // )
}






export default AllSpots;
