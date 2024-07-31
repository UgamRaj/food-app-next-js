import { useEffect, useState } from "react";
import "./LoginSignUp.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
// import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, isUserAuthenticated } = useSelector(
    (state) => state.userData
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (!formData.email || !formData.password) {
      return setError(true);
    } else {
      setError(false);
    }

    //! Dispatch Data
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      router.push("/restaurant/dashboard");
    }
  }, [isUserAuthenticated]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="formContainer">
        <form className="form" onSubmit={loginHandler}>
          <p className="title">Login</p>
          <p className="message">Login now and get full access to our app.</p>
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
        </form>
      </div>
    </>
  );
};

export default Login;
