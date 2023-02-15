import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import './Spots.css';

const AllSpots = () =>{
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
    return(
        <div className='allSpotImg'>
            {spotsArr.map(({id, previewImage,city,price,avgRating})=>(
                  // <div key={id}><NavLink to ={`/spots/${id}`}>{previewImage}</NavLink></div>
                  <div className="spotImgOutter" key={id} >
                    <NavLink to ={`/spots/${id}`}>
                      <img className="spotImg" src={previewImage}/>
                    </NavLink>
                    <div className="cityNpriceNrate">
                      <div className="city">City, {city}</div>
                      <div className="rate">{avgRating}</div>
                      <div className="price">${price} night</div>
                    </div>

                  </div>
              ))}
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
