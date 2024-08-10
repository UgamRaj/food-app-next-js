"use client";

import Link from "next/link";
import "./Header.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = ({ cartItems, removeCartItem }) => {
  const userInLocalStorage =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const localStorageCart =
    localStorage.getItem("foodCart") &&
    JSON.parse(localStorage.getItem("foodCart"));
  const [user, setUser] = useState(
    userInLocalStorage ? userInLocalStorage : ""
  );
  const [noOfItem, setNoOfItem] = useState(localStorageCart?.length);
  // console.log("🚀 ~ Header ~ noOfItem:", noOfItem);
  const [cartData, setCartData] = useState(localStorageCart);
  const router = useRouter();

  useEffect(() => {
    // Object.keys(obj).length === 0;
    if (cartItems && Object.keys(cartItems).length !== 0) {
      // console.log("🚀 ~ useEffect ~ cartData:", cartData);
      // console.log("🚀 ~ useEffect ~ cartItems:", cartItems);
      if (noOfItem) {
        if (cartData[0].restoId != cartItems.restoId) {
          localStorage.removeItem("foodCart");
          setNoOfItem(1);
          setCartData([cartItems]);

          localStorage.setItem("foodCart", JSON.stringify([cartItems]));
        } else {
          setNoOfItem(noOfItem + 1);
          const localCartItem = [...cartData, cartItems];
          setCartData(localCartItem);
          localStorage.setItem("foodCart", JSON.stringify(localCartItem));
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
      const localCart = cartData.filter(({ _id }) => _id !== removeCartItem);
      setCartData(localCart);
      setNoOfItem(noOfItem - 1);
      localStorage.setItem("foodCart", JSON.stringify(localCart));
      if (localCart.length === 0) {
        localStorage.removeItem("foodCart");
      }
    }
  }, [removeCartItem]);

  const onLogout = () => {
    localStorage.removeItem("user");
    router.push("/userAuth");
  };

  return (
    <div className="header">
      <div className="logo">
        <img style={{ width: 100 }} src="/f.jpeg" alt="logo" />
      </div>
      <ul>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href={"#"}>{user?.name}</Link>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href={"/userAuth"}>Login</Link>
          </li>
        )}
        <li>
          <Link href={noOfItem ? "/cart" : "#"} className="cartIconLink">
            <img
              className="shoppingCartIcon"
              src="./shopping-cart.png"
              alt="shopping cart"
            />
            <div className="cartQuenttity">{noOfItem ? noOfItem : 0}</div>
          </Link>
          {/* <Link href={noOfItem ? "/cart" : "#"}>
            Cart {noOfItem ? noOfItem : 0}
          </Link> */}
        </li>
        <li>
          <Link href={"/"}>Add Rastaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
