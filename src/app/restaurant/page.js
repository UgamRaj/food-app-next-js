"use client";

import { useState } from "react";
import Login from "../Components/LoginSignUp/Login";
import Signup from "../Components/LoginSignUp/Signup";
import Header from "../Components/RestroHeader/Header";
import Footer from "../Components/RestroFooter/Footer";

const Restaurant = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mainContainer">
      <Header />
      <h1>Restaurant Page/log</h1>
      {isLogin ? <Login /> : <Signup />}
      <div className="loginBtnContainer">
        <p>{isLogin ? "Do not have account ?" : "Already have account ? "}</p>
        <button className="loginBtn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Restaurant;

// {state === "Sign Up" ? (
//           <p className="signin">
//             Already have an account?
//             <span onClick={() => setState("Login")}>Signin</span>
//           </p>
//         ) : (
//           <p className="signin">
//             Create an account?
//             <span onClick={() => setState("Sign Up")}>Register</span>
//           </p>
//         )}
