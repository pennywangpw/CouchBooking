import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllSpots, deleteASpot } from "../../store/spots"
import { getReviews, deleteAReview } from "../../store/reviews"
import "./DeleteConfirmation.css"


const DeleteFormModal = ({ reviewid, type, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();


  //deleteHandler
  //check if type is "spot" delete the spot
  //check if type is "review" delete review
  //closeModal
  const deleteHandler = () => {
    if (type === "spot") {
      dispatch(deleteASpot(spotId)).then(closeModal)
    } else if (type === "review") {
      dispatch(deleteAReview(reviewid, spotId)).then(closeModal)
      // dispatch(deleteAReview(reviewid)).then(dispatch(getSpotDetails(spot.id))).then(closeModal)
    }

  }

  //keepHandler(do not delete)
  //closeModal
  const keepHandler = () => {
    if (type === "spot") {
      dispatch(getAllSpots()).then(closeModal)
    } else if (type === "review") {
      dispatch(getReviews(spotId)).then(closeModal)
    }
  }

  return (
    <div className="deleteForm">
      <h1>Confirm Delete</h1>
      <div className="actionbox">
        <h3 className="question">Are you sure you want to remove this {type} from the listings?</h3>

        <div className="buttonbox">

          <button type="button" className="button yes" onClick={() => deleteHandler()}>Yes (Delete {type[0].toUpperCase() + type.slice(1)})</button>

          <button type="button" className="button no" onClick={() => keepHandler()}>No (Keep {type[0].toUpperCase() + type.slice(1)})</button>

        </div>
      </div>
    </div>
  );
}

export default DeleteFormModal;
