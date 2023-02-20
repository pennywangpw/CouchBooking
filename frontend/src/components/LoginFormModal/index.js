//1.React functional component --LoginFormPage
//2.import css

import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

//demo user --when click it, it will log in successfully

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState("")
  const { closeModal } = useModal();



  //validation
  let frontendValidation = []
  useEffect(() => {
    if (credential.length < 4) frontendValidation.push("invalid")
    if (password.length < 6) frontendValidation.push("invalid")
    setFrontendErrors(frontendValidation)
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo2023", password: "demopassword" }))
      .then(closeModal)
  }



  return (
    <>
      <div class="mother">
        <div className="Login-text">
          <h1 >Log In</h1>
        </div>
        <div class="login-From">
          <div className="login-ModelGroup">
            {errors.map((error, idx) => (
              <div className="divError" key={idx}>{error}</div>
            ))}
            <form class="formType" onSubmit={handleSubmit}>
              <div className="acCount">
                <input
                  type="text"
                  className="inpupBox"
                  placeholder="Username or Email"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </div>
              <div className="passWord">
                <input
                  className="inpupBox"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="buttonDiv">
                <button className="buttonType" type="submit">Log In</button>
              </div>
              <div className="demoUser" type="submit" onClick={demoLogin}><a href="">Demo User</a></div>
            </form>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div class="mother">

    //     <h2 >Log In</h2>
    //     <div class="login-From">
    //       <div className="login-ModelGroup">
    //         {errors.map((error, idx) => (
    //           <div className="divError" key={idx}>{error}</div>
    //         ))}
    //         <form class="formType" onSubmit={handleSubmit}>
    //           <div className="acCount">
    //             <input
    //               type="text"
    //               className="inpupBox"
    //               placeholder="Username or Email"
    //               value={credential}
    //               onChange={(e) => setCredential(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="passWord">
    //             <input
    //               className="inpupBox"
    //               placeholder="Password"
    //               type="password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //               required
    //             />
    //           </div>
    //           <div className="buttonDiv">
    //             <button className="buttonType" type="submit">Log In</button>
    //           </div>
    //           <div className="demoUser" type="submit" onClick={demoLogin}><a href="">Log in as Demo User</a></div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </>

  );
}

export default LoginFormModal;
