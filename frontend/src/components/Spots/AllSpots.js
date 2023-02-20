import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Spots.css';
import SpotInfo from "./SpotInfo";

const AllSpots = () => {
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots.allSpots)
  console.log("ths is AllSpots functional component spots: ", spots)
  //convert into array cause we will work on component by JS
  const spotsArr = Object.values(spots)
  console.log("AllSpots with spotsArr: ", spotsArr)
  // console.log("ths is AllSpots functional component spots. Spots: ", spots.allSpots)
  // const spotsArr = spots.allSpots

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // return null

  if (spotsArr.length === 0) return (

    <div>
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      "Unable to retrieve spots. Please try again shortly".</div>)


  return (
    <div className='allSpotImg'>
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      {spotsArr.map((spot) => (
        // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
        <div className="spotImgOutter" key={spot.id} >
          <NavLink to={`/spots/${spot.id}`}>
            <img className="spotImg" src={spot.previewImage} alt="spot" />
          </NavLink>
          <SpotInfo spotObj={spot} />
        </div>
      ))}
    </div>
    // <div className='allSpotImg'>
    //     {spotsArr.map(({id, previewImage,city,price,avgRating})=>(
    //           // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
    //           <div className="spotImgOutter" key={id} >
    //             <NavLink to ={`/spots/${id}`}>
    //               <img className="spotImg" src={previewImage} alt="spot"/>
    //             </NavLink>
    //             <SpotInfo spotsArr={spotsArr}/>
    //             {/* <div className="cityNpriceNrate">
    //               <div className="city">City, {city}</div>
    //               <div className="rate">{avgRating}</div>
    //               <div className="price">${price} night</div>
    //             </div> */}
    //           </div>
    //       ))}+
    // </div>
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
