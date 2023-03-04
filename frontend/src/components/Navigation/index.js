import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import CreateASpotForm from '../Spots/CreateASpot/CreateASpot';

import logo from "../../assets/couch.png";
import OpenModalButton from "../OpenModalButton";

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu])


    const closeMenu = () => setShowMenu(false);
    return (
        <nav className="Navigation-container">
            <ul className="Navigation-list">
                <li>
                    <NavLink exact to="/" className="Navigation-links">
                        <div className="Navigation-logo-container">
                            <img src={logo} className="Navigation-logo" alt="logo" />
                            CouchBooking
                        </div>
                    </NavLink>
                </li>


                <div className="Navigation-list-right">
                    {sessionUser &&
                        <li className="Navigation-list-modal">
                            <NavLink exact to='/spots/new'>
                                <button className="newSpot"> Create A New Spot </button>

                                {/* i don't use this because of navigating to the new path */}
                                {/* <OpenModalButton
                                    buttonText="Creat A New Spot"
                                    onButtonClick={closeMenu}
                                    modalComponent={<CreateASpotForm />}
                                /> */}

                            </NavLink>

                        </li>
                    }
                    {isLoaded && (
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    )
}
