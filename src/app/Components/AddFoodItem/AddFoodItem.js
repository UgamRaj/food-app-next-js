import { useState } from "react";
import "../LoginSignUp/LoginSignUp.css";
// import axios from "axios";
// import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addFoodHandler } from "@/app/redux/restroSlice";

const AddFoodItem = ({ setAddItem }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imagePath: "",
    description: "",
  });
  const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const { isLoading } = useSelector((state) => state.restroData);
  const dispatch = useDispatch();

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onAddFoodHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);
    if (
      !formData.name ||
      !formData.price ||
      !formData.imagePath ||
      !formData.description
    ) {
      return setError(true);
    }
    setError(false);
    // setLoading(true);
    //! add new Food
    // dispatch(addFoodHandler(formData));

    //! go to dashboard
    // setAddItem(false);

    const resultAction = await dispatch(addFoodHandler(formData));
    // console.log("🚀 ~ onAddFoodHandler ~ resultAction:", resultAction);

    if (addFoodHandler.fulfilled.match(resultAction)) {
      setAddItem(false); // Go to dashboard or desired state
    } else {
      // Handle API call failure
      console.error("Failed to add food item:", resultAction.error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="formContainer">
        <form className="form" onSubmit={onAddFoodHandler}>
          <p className="title">Add New Food Item</p>

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
              <span>Enter Name</span>
            )}
          </label>

          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="price"
              value={formData.price}
              onChange={changehandler}
            />
            {error && !formData.price ? (
              <span className="inputError">*Please Enter Price</span>
            ) : (
              <span>Enter Price</span>
            )}
          </label>

          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="imagePath"
              value={formData.imagePath}
              onChange={changehandler}
            />
            {error && !formData.imagePath ? (
              <span className="inputError">*Please Enter Path</span>
            ) : (
              <span>Enter Path</span>
            )}
          </label>

          <label>
            <input
              className="input"
              type="text"
              placeholder=""
              required
              name="description"
              value={formData.description}
              onChange={changehandler}
            />
            {error && !formData.description ? (
              <span className="inputError">*Please Enter Description</span>
            ) : (
              <span>Enter Description</span>
            )}
          </label>

          <button className="submit" type="submit">
            Add Food
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFoodItem;
