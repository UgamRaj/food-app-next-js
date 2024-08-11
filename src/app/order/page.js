"use client";

import { useEffect, useState } from "react";
import DeleteButton from "../Components/Button/DeleteButton";
import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import "../cart/cart.css";
import { DELIVERY_CHARGES, TAX } from "../lib/Constant";

const OrderNow = () => {
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("foodCart")) || []
  );
  const [userStorgae, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [total, setTotal] = useState({
    foodPrice: 0,
    totalTax: 0,
    totalPrice: 0,
  });

  const getTotal = () => {
    const foodPrice = cartStorage.reduce((acc, item) => acc + +item.price, 0);
    // console.log("🚀 ~ getTotal ~ foodPrice:", foodPrice);
    const totalTax = +((foodPrice * TAX) / 100).toFixed(2);
    // console.log("🚀 ~ getTotal ~ totalTax:", totalTax);
    const totalPrice = foodPrice + DELIVERY_CHARGES + totalTax;
    // console.log("🚀 ~ getTotal ~ totalPrice:", totalPrice);
    setTotal({ foodPrice, totalTax, totalPrice });
  };

  useEffect(() => {
    getTotal();
  }, [cartStorage]);

  const removeFromCart = () => {};

  return (
    <>
      <Header />
      <div className="mainCart">
        <h1>User Details</h1>
        <div className="cartTotalPriceContainer">
          <div className="cartPrice">
            <span>Name : </span>
            <span>{userStorgae.name} </span>
          </div>
          <div className="cartPrice">
            <span>Address : </span>
            <span>{userStorgae.address} </span>
          </div>
          <div className="cartPrice">
            <span>Phone : </span>
            <span>{userStorgae.phone} </span>
          </div>
        </div>
        <h1>Amount Details</h1>
        <div className="cartTotalPriceContainer">
          <div className="cartPrice">
            <span>Food Price : </span>
            <span>{total.foodPrice} ₹</span>
          </div>
          <div className="cartPrice">
            <span>Tax : </span>
            <span>{total.totalTax} ₹</span>
          </div>
          <div className="cartPrice">
            <span>Delivery Charges : </span>
            <span>{DELIVERY_CHARGES} ₹</span>
          </div>
          <div className="cartPrice topBorder">
            <span>Total Price : </span>
            <span>{total.totalPrice} ₹</span>
          </div>
        </div>
        <h1>Payment Method</h1>
        <div className="cartTotalPriceContainer">
          <div className="cartPrice">
            <span>Cash on Delivery : </span>
            <span>{total.totalPrice} ₹</span>
          </div>
        </div>
        <div className="orderNowBtn">
          <button class="orderBtn">
            <span>Place Your Order Now</span>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderNow;
