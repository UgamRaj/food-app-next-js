import { useEffect, useState } from "react";
import "./FoodItemList.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodList } from "@/app/redux/restroSlice";

const FoodItemList = () => {
  // const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoading, foodItems } = useSelector((state) => state.restroData);
  const dispatch = useDispatch();

  const getFoodItem = async () => {
    // setLoading(true);

    dispatch(getAllFoodList());
  };

  useEffect(() => {
    getFoodItem();
  }, []);

  const onDeleteHandler = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/restaurant/foods/${id}`
      );
      console.log("🚀 ~ onDeleteHandler ~ data:", data);

      if (data.success) {
        setLoading(false);
        getFoodItem();
        toast.success("Item Deleted Successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
      console.log("🚀 ~ onDeleteHandler ~ error:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="foodItemList">
        <h2>Food Items</h2>
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {foodItems?.map(
              ({ name, price, _id, imagePath, description }, i) => (
                <tr key={_id}>
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{price}</td>
                  <td>{description}</td>
                  <td className="imageContainer">
                    <img src={imagePath} alt="Food image" />
                  </td>
                  <td className="operationBtn">
                    <button
                      className="deleteBtn"
                      onClick={() => onDeleteHandler(_id)}
                    >
                      Delete
                    </button>
                    <button
                      className="editBtn"
                      onClick={() => router.push(`dashboard/${_id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodItemList;
