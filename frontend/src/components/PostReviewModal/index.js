
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {createAReview} from "../../store/reviews"
import { NavLink, useParams } from "react-router-dom";
// import './PostReview.css'

//create a review
//submit review click -> dispatch create a review ({{url}}/spots/1/reviews)
//grab spotId by using params
//HINT: modal component doesn't have frontend route, therefore, you don't have access to params.

function PostReviewModal({id}) {

const dispatch = useDispatch();
const { closeModal } = useModal();

// const {id} = useParams()
console.log("POSTREVIEWMODAL 有接收到ID: ", typeof id)


const [review, setReview] = useState("")
const [stars, setStars] = useState("")


let newReview = {review, stars}
//get the star rating value
//once it clicks, setReview change to star rating value

return (
    <>

  <div className="postReviewForm">
    <h1>How was your stay?</h1>

    <textarea placeholder="Leave your review here...." onChange={(e)=>setReview(e.target.value)}></textarea>

    <div>
        <lable for ="star">Rate (1-5)</lable>
        <input type = "number" id="star" min="1" max="5" onChange={(e)=>setStars(e.target.value)}/>
    </div>

    {/* <div class="star">
        <input type="radio" name="item" id="item01" checked />
        <label class="star-item" for="item01" value="1"></label>

        <input type="radio" name="item" id="item02" />
        <label class="star-item" for="item02" value="2"></label>

        <input type="radio" name="item" id="item03" />
        <label class="star-item" for="item03" value="3"></label>

        <input type="radio" name="item" id="item04" />
        <label class="star-item" for="item04" value="4"></label>

        <input type="radio" name="item" id="item05" />
        <label class="star-item" for="item05" value="5"></label>
    </div> */}

      {/* <div>
        <button type="button" value={star} onClick={(e)=>{
            dispatch(createAReview({id,review})).then(closeModal)
        }}>Submit Your Review</button>
      </div> */}


    <div>
        <button type="button" onClick={()=>{
            dispatch(createAReview({id,newReview})).then(closeModal)
        }}>Submit Your Review</button>
    </div>


    </div>

    </>

    );
}

export default PostReviewModal;
