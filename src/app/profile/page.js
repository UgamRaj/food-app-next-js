"use client";

import "./profile.css";
import axios from "axios";
import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import { useEffect, useState } from "react";

const Profile = () => {
  const [myOrders, setMyOrders] = useState([]);

  const onGetMyOrders = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/order?id=66b4266c0558edba8bfa75c8`
      );
      if (data.success) {
        setMyOrders(data.result);
      }
      console.log("🚀 ~ onGetMyOrders ~ result:", data.result);
    } catch (error) {
      console.log("🚀 ~ onGetMyOrders ~ error:", error);
    }
  };

  useEffect(() => {
    onGetMyOrders();
  }, []);

  return (
    <>
      <Header />
      {myOrders?.map((item, i) => (
        <div
          key={i}
          className="profilePageContent
        "
        >
          <h4>Name: {item.data.name}</h4>
          <div>Amount: {item.amount}</div>
          <div>Address: {item.data.address}</div>
          <div>Status: {item.status}</div>
        </div>
      ))}
      <Footer />
    </>
  );
};

export default Profile;
