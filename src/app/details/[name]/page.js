"use client";

import Header from "@/app/Components/CustomerHeader/Header";
import "./restro.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/app/Components/RestroFooter/Footer";

const DetailsPage = ({ params, searchParams }) => {
  const { name } = params;

  const [restroDetails, setRestroDetails] = useState({});
  const [foodItems, setFoodItems] = useState([]);

  const getRestroDetails = async () => {
    const { id } = searchParams;
    // console.log("🚀 ~ getRestroDetails ~ id:", id);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/customer/${id}`
      );
      console.log("🚀 ~ getRestroDetails ~ data:", data);
      if (data.success) {
        const { foodItems, details } = data;
        setRestroDetails(details);
        setFoodItems(foodItems);
      }
    } catch (error) {
      console.log("🚀 ~ getRestroDetails ~ error:", error);
    }
  };

  useEffect(() => {
    getRestroDetails();
  }, []);

  const addToCart = (item) => {};

  const removeFromCart = (id) => {};

  return (
    <div>
      <Header />
      <div className="restroPageBanner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="restroDetails">
        <p>Contact : {restroDetails?.phone}</p>
        <p>City : {restroDetails?.city}</p>
        <p>Address : {restroDetails?.address}</p>
        <p>Email : {restroDetails?.email}</p>
      </div>
      <div className="foodItemDetails">
        {foodItems.length > 0 ? (
          foodItems?.map(({ _id, name, price, description, imagePath }) => (
            <div key={_id} className="foodItemList">
              <div className="foodImage">
                <img src={imagePath} alt="food" />
              </div>

              <div className="foodItemDetailsText">
                <p>Dish : {name}</p>
                <p>Price : {price}</p>
                <p className="foodItemDescription">{description}</p>

                <div className="foodDetailsBtnContainer">
                  <button
                    className="CartBtn"
                    onClick={() =>
                      addToCart({ _id, name, price, description, imagePath })
                    }
                  >
                    <span className="IconContainer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                        fill="rgb(17, 17, 17)"
                        className="cart"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </span>
                    <p className="text">Add to Cart</p>
                  </button>

                  <button
                    className="button"
                    onClick={() => removeFromCart(_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 69 14"
                      className="svgIcon bin-top"
                    >
                      <g clip-path="url(#clip0_35_24)">
                        <path
                          fill="black"
                          d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_35_24">
                          <rect fill="white" height="14" width="69"></rect>
                        </clipPath>
                      </defs>
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 69 57"
                      className="svgIcon bin-bottom"
                    >
                      <g clip-path="url(#clip0_35_22)">
                        <path
                          fill="black"
                          d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_35_22">
                          <rect fill="white" height="57" width="69"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No Foo Item Added For Now</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailsPage;
