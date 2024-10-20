"use client";

import { useEffect, useState } from "react";
import DeleteButton from "../Components/Button/DeleteButton";
import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import "../cart/cart.css";
import { DELIVERY_CHARGES, TAX } from "../lib/Constant";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader/Loader";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);
  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

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

  const onPlcaeOrderNow = async () => {
    setLoading(true);
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const cart = JSON.parse(localStorage.getItem("foodCart"));
    const restoId = cart[0].restoId;
    const foodItemIds = cart?.map((item) => item._id).toString();

    const deliveryBoyId = "66b43f650558edba8bfa75ca"; // one id for checking

    const orderCollection = {
      restoId,
      userId,
      deliveryBoyId,
      foodItemIds,
      status: "confirm",
      amount: total.totalPrice,
    };
    // console.log("🚀 ~ onPlcaeOrderNow ~ orderCollection:", orderCollection);

    const body = JSON.stringify(orderCollection);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/order",
        body
      );
      if (data.success) {
        setRemoveCartData(true);
        router.push("/profile");
        toast.success("Order Confirmed");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Order place failed");
      console.log("🚀 ~ onPlcaeOrderNow ~ error:", error);
    }
  };

  const removeFromCart = () => {};

  return (
    <>
      {loading && <Loader />}
      <Header isRemoveCartData={removeCartData} />
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
          <button class="orderBtn" onClick={onPlcaeOrderNow}>
            <span>Place Your Order Now</span>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderNow;
