
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {getAllSpots, deleteASpot} from "../../store/spots"


function DeleteFormModal({id}) {
  console.log("DeleteFORModal: ", id)
  const dispatch = useDispatch();

  const { closeModal } = useModal();



  //if no, close the modal and do nothing
  //if yes
    //dispatch--delete
    //close Modal
  return (
    <>
      <h1>Confirm Delete</h1>

      <div>

        <button type="button" onClick={()=>{
          dispatch(deleteASpot(id)).then(closeModal)
        }}>Yes -Delete Spot</button>


        <button type="button" onClick={()=>{
          dispatch(getAllSpots()).then(closeModal)
        }}>No -Keep Spot</button>

      </div>
    </>
  );
}

export default DeleteFormModal;
