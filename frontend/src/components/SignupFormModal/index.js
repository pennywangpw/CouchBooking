import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState("")
  const { closeModal } = useModal();

  //frontend check validation > if no, disable the butn
  //backend check validation > if no, show up on the modal

  //validation
  let frontendValidation = []
  useEffect(() => {
    if (email.length === 0) frontendValidation.push("invalid")
    if (username.length < 4) frontendValidation.push("invalid")
    if (firstName.length === 0) frontendValidation.push("invalid")
    if (lastName.length === 0) frontendValidation.push("invalid")
    if (password.length < 6) frontendValidation.push("invalid")
    if (confirmPassword !== password || confirmPassword.length === 0) frontendValidation.push("invalid")
    setFrontendErrors(frontendValidation)
  }, [email, username, firstName, lastName, password, confirmPassword])
  console.log("這裡是e: ", frontendValidation)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <form className="signupform" onSubmit={handleSubmit}>
          <div className="signup__field__container">
            <ul className="signupError">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className="signup__field">
              <label>
                Email
                <br /><input
                  class="signup__input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup__field">
              <label>
                Username
                <br /><input
                  class="signup__input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup__field">
              <label>
                First Name
                <br /><input
                  class="signup__input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup__field">
              <label>
                Last Name
                <br /><input
                  class="signup__input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="signup__field">
              <label>
                Password
                <br /><input
                  class="signup__input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signup__field'>
              <label>
                Confirm Password
                <br /><input
                  class="signup__input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signup__submit'>
              <button type="submit" className="signup__submit" disabled={frontendErrors.length > 0}>
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
