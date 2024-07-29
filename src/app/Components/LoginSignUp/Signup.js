import { useState } from "react";
import "./LoginSignUp.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
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
    } else {
      setError(false);
    }
    // console.log(formData);
    const body = JSON.stringify(formData);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/restaurant",
        body
      );

      if (data.success) {
        setLoading(false);
        const { result } = data;
        console.log("🚀 ~ signUpHandler ~ result:", result);
        delete result.password;
        localStorage.setItem("foodData", JSON.stringify(result));
        router.push("/restaurant/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ signUpHandler ~ error:", error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="formContainer">
        <form className="form">
          <p className="title">Sign Up</p>
          <p className="message">Sign Up now and get full access to our app.</p>

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
              <span className="inputError">*Please Enter Restaurant Name</span>
            ) : (
              <span>Enter restaurant name</span>
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
              <span className="inputError">*Please Enter full address</span>
            ) : (
              <span>Enter full address</span>
            )}
          </label>
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

          <button className="submit" onClick={signUpHandler}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
