"use client";

import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../Components/Loader/Loader";
import "../Components/LoginSignUp/LoginSignUp.css";

const DeliveryPartner = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  });
  const router = useRouter();
  const [error, setError] = useState(false);
  const [state, setState] = useState("Sign In");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    // console.log("login", formData);
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      return setError(true);
    }
    setError(false);

    const body = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    // console.log("🚀 ~ Signup ~ user:", user);

    setLoading(true);
    //Form Validation
    if (
      !formData.email ||
      !formData.password ||
      !formData.city ||
      !formData.name ||
      !formData.address ||
      !formData.phone
    ) {
      return setError(true);
    }
    setError(false);

    const body = JSON.stringify(formData);
  };

  return (
    <div>
      <h1>Delivery Partner</h1>
      <div className="authContainer">
        <div>
          {loading && <Loader />}
          <div className="formContainer">
            <form
              className="form"
              onSubmit={(e) => {
                state === "Sign In" ? loginHandler(e) : signUpHandler(e);
              }}
            >
              <p className="title">{state}</p>
              <p className="message">{state} now and get access to our app.</p>

              {state == "Sign Up" && (
                <>
                  <label>
                    <input
                      className="input"
                      type="text"
                      placeholder=""
                      required
                      name="name"
                      value={formData.name}
                      onChange={changehandler}
                    />

                    {error && !formData.name ? (
                      <span className="inputError">*Please Enter Name</span>
                    ) : (
                      <span>Enter name</span>
                    )}
                  </label>
                  <label>
                    <input
                      className="input"
                      type="text"
                      placeholder=""
                      required
                      name="city"
                      value={formData.city}
                      onChange={changehandler}
                    />
                    {error && !formData.city ? (
                      <span className="inputError">*Please Enter City</span>
                    ) : (
                      <span>Enter City</span>
                    )}
                  </label>

                  <label>
                    <input
                      className="input"
                      type="text"
                      placeholder=""
                      required
                      name="address"
                      value={formData.address}
                      onChange={changehandler}
                    />
                    {error && !formData.address ? (
                      <span className="inputError">*Please Enter address</span>
                    ) : (
                      <span>Enter address</span>
                    )}
                  </label>
                  <label>
                    <input
                      className="input"
                      type="email"
                      placeholder=""
                      required
                      name="email"
                      value={formData.email}
                      onChange={changehandler}
                    />
                    {error && !formData.email ? (
                      <span className="inputError">*Please Enter Email</span>
                    ) : (
                      <span>Enter Email</span>
                    )}
                  </label>
                </>
              )}

              <label>
                <input
                  className="input"
                  type="number"
                  placeholder=""
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={changehandler}
                />
                {error && !formData.phone ? (
                  <span className="inputError">*Please Enter Contact No.</span>
                ) : (
                  <span>Enter Contact No.</span>
                )}
              </label>

              <label>
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  required
                  name="password"
                  value={formData.password}
                  onChange={changehandler}
                />
                {error && !formData.password ? (
                  <span className="inputError">*Please Enter Password</span>
                ) : (
                  <span>Enter Password</span>
                )}

                <button
                  type="button"
                  className="toggle-button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoEye size={"1.5rem"} color="gray" />
                  ) : (
                    <IoMdEyeOff size={"1.5rem"} color="gray" />
                  )}
                </button>
              </label>

              <button className="submit" type="submit">
                Submit
              </button>

              {state === "Sign Up" ? (
                <p className="signin">
                  Already have an account?
                  <span onClick={() => setState("Login")}>Signin</span>
                </p>
              ) : (
                <p className="signin">
                  Create an account?
                  <span onClick={() => setState("Sign Up")}>Register</span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;