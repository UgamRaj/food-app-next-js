"use client";

import Link from "next/link";
import "./Header.css";
import { useEffect, useState } from "react";

const Header = ({ cartItems, removeCartItem }) => {
  const localStorageCart = JSON.parse(localStorage.getItem("foodCart"));
  const [noOfItem, setNoOfItem] = useState(localStorageCart?.length);
  // console.log("🚀 ~ Header ~ noOfItem:", noOfItem);
  const [cartData, setCartData] = useState(localStorageCart || []);

  useEffect(() => {
    // Object.keys(obj).length === 0;
    if (cartItems && Object.keys(cartItems).length !== 0) {
      if (noOfItem) {
        console.log("🚀 ~ useEffect ~ cartData:", cartData);

        console.log("🚀 ~ useEffect ~ cartItems:", cartItems);
        if (cartData[0].restoId != cartItems.restoId) {
          localStorage.removeItem("foodCart");
          setNoOfItem(1);
          setCartData([cartItems]);

          localStorage.setItem("foodCart", JSON.stringify([cartItems]));
        } else {
          setNoOfItem(noOfItem + 1);
          setCartData([...cartData, cartItems]);
          localStorage.setItem(
            "foodCart",
            JSON.stringify([...cartData, cartItems])
          );
        }
      } else {
        setNoOfItem(1);
        setCartData([cartItems]);
        localStorage.setItem("foodCart", JSON.stringify([cartItems]));
      }
    }
  }, [cartItems]);

  useEffect(() => {
    if (removeCartItem) {
    }
  }, [removeCartItem]);

  return (
    <div className="header">
      <div className="logo">
        <img style={{ width: 100 }} src="/f.jpeg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Login</Link>
        </li>
        <li>
          <Link href={"/"}>Cart {noOfItem ? noOfItem : 0}</Link>
        </li>
        <li>
          <Link href={"/"}>Add Rastaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
