import { useState } from "react";
import "./LoginSignUp.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError(true);
    } else {
      setError(false);
    }

    try {
      const body = JSON.stringify({ ...formData, login: true });
      // console.log("🚀 ~ loginHandler ~ body:", body);

      const { data } = await axios.post(
        "http://localhost:3000/api/restaurant",
        body
      );

      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("foodData", JSON.stringify(result));

        router.push("/restaurant/dashboard");
      }
    } catch (error) {
      console.log("🚀 ~ loginHandler ~ error:", error);
    }
  };

  return (
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
  );
};

export default Login;
