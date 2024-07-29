"use client";

import { useEffect, useState } from "react";
import "../../../Components/LoginSignUp/LoginSignUp.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { useRouter } from "next/navigation";

const EditFoodItem = ({ params }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imagePath: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEditFoodHandler = async (e) => {
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
    setLoading(true);

    const body = JSON.stringify(formData);
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/restaurant/foods/edit/${params.id}`,
        body
      );
      if (data.success) {
        setLoading(false);
        // console.log("food item added");
        router.push("../dashboard");
        toast.success("food item updated");
      }
    } catch (error) {
      console.log("🚀 ~ onEditFoodHandler ~ error:", error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const getPerticularFoodItem = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/restaurant/foods/edit/${params.id}`
      );

      if (data.success) {
        // console.log("🚀 ~ getPerticularFoodItem ~ data:", data.result);
        setFormData(data.result);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("🚀 ~ getPerticularFoodItem ~ error:", error);
    }
  };

  useEffect(() => {
    getPerticularFoodItem();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="formContainer">
        <form className="form" onSubmit={onEditFoodHandler}>
          <p className="title">Update Food Item</p>

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
            Update Food Item
          </button>
          <button
            className="submit"
            onClick={() => router.push("../dashboard")}
          >
            Back to Food Item
          </button>
        </form>
      </div>
    </>
  );
};

export default EditFoodItem;
