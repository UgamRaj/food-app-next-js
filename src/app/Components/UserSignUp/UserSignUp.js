import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import "../LoginSignUp/LoginSignUp.css";
import axios from "axios";
import { toast } from "react-toastify";

const UserSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    email: "",
    name: "",
    city: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    // console.log("🚀 ~ Signup ~ user:", user);

    // setLoading(true);
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
    try {
      const { data } = await axios.post("http://localhost:3000/api/user", body);

      console.log("🚀 ~ signUpHandler ~ data:", data);
      if (data.success) {
        toast.success("user signup successfully");
      }
    } catch (error) {
      toast.error("user signup failed");
      console.log("🚀 ~ signUpHandler ~ error:", error);
    }
  };

  return (
    <div>
      <div className="formContainer">
        <form className="form" action="">
          <p className="title">Sign Up</p>
          <p className="message">Sign Up now and get access to our app.</p>

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
    </div>
  );
};

export default UserSignUp;
