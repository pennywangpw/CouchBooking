import React from 'react';
import { useModal } from '../../context/Modal';
import Navigation from './index'

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonText,
  onButtonClick,
  icon
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);

    setModalContent(modalComponent);
}

const buttonClass = buttonText.replace(/\s/g,"");

if (icon === "delete") {
    return (
        <button
            onClick={onClick}
            className={`OpenModalButton-button ${buttonClass}`}
        >
            <i className="fa-solid fa-trash icon"></i>
            {buttonText}
        </button>
    )
} else if (icon === "edit") {
    return (
        <button
            onClick={onClick}
            className={`OpenModalButton-button ${buttonClass}`}
        >
            <i className="fa-regular fa-pen-to-square"></i>
            {buttonText}
        </button>
    )
}

return (
    <div className="OpenModalButton-container">
        <button
            onClick={onClick}
            className={`OpenModalButton-button ${buttonClass}`}
        >
            {buttonText}
        </button>
    </div>
)
}

export default OpenModalMenuItem;
