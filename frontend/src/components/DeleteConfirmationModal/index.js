
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllSpots, deleteASpot } from "../../store/spots"
import { getReviews, deleteAReview } from "../../store/reviews"
import "./DeleteConfirmation.css"



const DeleteFormModal = ({ id, type }) => {
  console.log("DeleteFORModal裡面的id: ", id)
  console.log("DeleteFORModal裡面的reviews: ", id)
  const dispatch = useDispatch();

  const { closeModal } = useModal();


  let item = "";
  if (type === "spot") {
    item = "spot"
  } else if (type === "review") {
    item = "review"
  }

  //deleteHandler
  //keepHandler(do not delete)
  //check if type === spot
  //delete spot
  //check if type === review
  //delete review

  const deleteHandler = (id) => {
    if (type === "spot") {
      console.log("落入spot和傳入的id: ", id)
      dispatch(deleteASpot(id)).then(closeModal)
    } else if (type === "review") {
      console.log("落入review")
      dispatch(deleteAReview(id)).then(closeModal)
    }

  }

  const keepHandler = () => {
    if (type === "spot") {
      dispatch(getAllSpots()).then(closeModal)
    } else if (type === "review") {
      dispatch(getReviews()).then(closeModal)
    }
  }

  //if no, close the modal and do nothing
  //if yes
  //dispatch--delete
  //close Modal
  return (
    <div className="deleteForm">
      <h1>Confirm Delete</h1>
      <div className="actionbox">
        <h3 className="question">Are you sure you want to remove this {item} from the listings?</h3>

        <div className="buttonbox">

          <button type="button" className="button yes" onClick={() => deleteHandler(id)}>Yes -Delete {item}</button>


          <button type="button" className="button no" onClick={() => keepHandler()}>No -Keep {item}</button>




          {/* <button type="button" onClick={() => {
            dispatch(deleteASpot(id)).then(closeModal)
          }}>Yes -Delete Spot</button>


          <button type="button" onClick={() => {
            dispatch(getAllSpots()).then(closeModal)
          }}>No -Keep Spot</button> */}

        </div>
      </div>
    </div>
  );
}

export default DeleteFormModal;
