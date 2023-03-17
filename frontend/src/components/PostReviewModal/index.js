
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots"
import { createAReview } from "../../store/reviews"
import { NavLink, useParams } from "react-router-dom";
import './PostReview.css'

//create a review
//submit review click -> dispatch create a review ({{url}}/spots/1/reviews)
//grab spotId by using params
//HINT: modal component doesn't have frontend route, therefore, you don't have access to params.

function PostReviewModal({ id }) {

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  // const {id} = useParams()
  console.log("POSTREVIEWMODAL 有接收到ID: ", typeof id)


  const [review, setReview] = useState("")
  const [stars, setStars] = useState("")



  let newReview = { review, stars }
  //get the star rating value
  //once it clicks, setReview change to star rating value

  return (
    <>

      <div className="postReviewForm">
        <h1>How was your stay?</h1>

        <textarea placeholder="Leave your review here...." onChange={(e) => setReview(e.target.value)}></textarea>


        <ul className="rate-area">
          <input type="radio" id="5-star" name="crating" value="5" onChange={(e) => setStars(e.target.value)} />
          <label for="5-star" title="Amazing">5 stars</label>

          <input type="radio" id="4-star" name="crating" value="4" onChange={(e) => setStars(e.target.value)} />
          <label for="4-star" title="Good">4 stars</label>

          <input type="radio" id="3-star" name="crating" value="3" onChange={(e) => setStars(e.target.value)} />
          <label for="3-star" title="Average">3 stars</label>

          <input type="radio" id="2-star" name="crating" value="2" onChange={(e) => setStars(e.target.value)} />
          <label for="2-star" title="Not Good">2 stars</label>

          <input type="radio" id="1-star" required="" name="crating" value="1" aria-required="true" onChange={(e) => setStars(e.target.value)} />
          <label for="1-star" title="Bad">1 star</label>

        </ul>




        <div>
          <button className="button" type="button" onClick={() => {
            if (review.length >= 10) {
              dispatch(createAReview({ id, newReview })).then(dispatch(getSpotDetails(id))).then(closeModal)
            }
          }}
            disabled={review.length < 10}>Submit Your Review</button>
        </div>

      </div>

    </>

  );
}

export default PostReviewModal;
