"use client";

import { useEffect, useState } from "react";
import DeleteButton from "../Components/Button/DeleteButton";
import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import "./cart.css";
import { DELIVERY_CHARGES, TAX } from "../lib/Constant";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("foodCart")) || []
  );
  const router = useRouter();
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

  const onOrderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/userAuth?order=true");
    }
  };

  const removeFromCart = () => {};

  return (
    <>
      <Header />
      <div className="mainCart">
        <h1>Your Cart Items</h1>

        <div className="cartContainer">
          {cartStorage.length > 0 ? (
            cartStorage?.map((item) => (
              <div className="cartItemList" key={item._id}>
                <div className="cartItemLeft">
                  <div className="imageConatiner">
                    <img src={item.imagePath} alt="cart image" />
                  </div>
                  <div className="cartTextDetails">
                    <h3>{item.name}</h3>
                    <h5>{item.description}</h5>
                    <DeleteButton />
                  </div>
                </div>
                <div className="cartPrice">Price: {item.price}</div>
              </div>
            ))
          ) : (
            <div>No Food Item Added Yet</div>
          )}
        </div>
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
        <div className="orderNowBtn">
          <button class="orderBtn" onClick={onOrderNow}>
            <span>Order Now</span>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
