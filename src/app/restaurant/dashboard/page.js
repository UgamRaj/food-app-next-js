"use client";

import AddFoodItem from "@/app/Components/AddFoodItem/AddFoodItem";
import FoodItemList from "@/app/Components/FoodItemList/FoodItemList";
import Header from "@/app/Components/RestroHeader/Header";
import React, { useState } from "react";

const Dashboard = () => {
  const [additem, setAddItem] = useState(false);

  return (
    <div>
      <Header />
      <button onClick={() => setAddItem(true)}>Add Food</button>
      <button onClick={() => setAddItem(false)}>Dashboard</button>
      {additem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </div>
  );
};

export default Dashboard;
