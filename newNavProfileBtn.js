import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
// import Profile from "../Profile";
import SignupFormModal from "../SignupFormModal";
// import CreateSpotForm from "../Spots/CreateSpot";
import CreateASpotForm from "../Spots/CreateASpot/CreateASpot.js";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

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

    const logout = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout());
        history.push("/");
        closeMenu();
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    console.log("THIS IS USER: ", user)
    return (
        <div className="ProfileButton-dropdown-container">
            <button onClick={openMenu} className="ProfileButton-icons">
                <i className="fa-sharp fa-solid fa-bars hamburger"></i>

                <img src={"https://previews.123rf.com/images/vitechek/vitechek1907/vitechek190700199/126786791-user-login-or-authenticate-icon-human-person-symbol-vector.jpg"} className="ProfileButton-dropdown-profile-pic" />
                {/* {user ? (
                    <img src={user.profileImageUrl} className="ProfileButton-dropdown-profile-pic" />
                ) :
                    <i className="fa-solid fa-circle-user user"></i>
                } */}
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <div>
                        {/* <li className="profile-dropdown-links">{user.username}</li> */}
                        <li className="profile-dropdown-links">
                            <div>
                                Hello, {user.firstName} {user.lastName}<br />
                                {user.email}
                            </div>
                            <div className="profile-dropdown-divide"></div>
                            {/* <NavLink
                                exact to={`/user/${user.id}`}
                                className="profile-dropdown-user-profile"
                            >
                                {user.firstName} {user.lastName}
                            </NavLink> */}
                        </li>
                        <li className="profile-dropdown-links">
                            <NavLink
                                exact to="/my-spots"
                                className="profile-dropdown-my-spots"
                            >
                                Manage Spots
                            </NavLink>
                        </li>

                        {/* <li className="profile-dropdown-links">{user.email}</li> */}
                        <div className="profile-dropdown-divide"></div>
                        <li className="profile-dropdown-links">
                            <button onClick={logout} className="profile-dropdown-logout">Log Out</button>
                        </li>
                    </div>
                ) : (
                    <div>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Log In"
                                onButtonClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                        </li>
                        <li className="profile-dropdown-links">
                            <OpenModalButton
                                buttonText="Sign Up"
                                onButtonClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </li>
                    </div>
                )}

            </ul>
        </div>
    )
}
