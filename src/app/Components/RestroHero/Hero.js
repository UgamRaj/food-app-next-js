"use client";

import { useEffect, useState } from "react";
import "./Hero.css";
import axios from "axios";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  const getLocations = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/customer/locations`
      );
      if (data.success) {
        console.log("🚀 ~ getLocations ~ data:", data);

        setLocations(data.cities);
      }
    } catch (error) {
      console.log("🚀 ~ getLocations ~ error:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const getLocation = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/customer?location=jaipur"
      );
      if (data.success) {
        console.log("🚀 ~ getLocation ~ data:", data.result);
      }
    } catch (error) {
      console.log("🚀 ~ getLocation ~ error:", error);
    }
  };

  const getRestaurant = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/customer?resto=jaipur"
      );
      if (data.success) {
        console.log("🚀 ~ getRestaurant ~ data:", data.result);
      }
    } catch (error) {
      console.log("🚀 ~ getRestaurant ~ error:", error);
    }
  };

  const hanldeAllCities = (city) => {
    setSelectedLocations(city);
    setShowLocation(false);
  };

  return (
    <div className="mainPageBanner">
      <h1>Food Delivery App</h1>
      <div className="inputContainer">
        <input
          type="text"
          className="selectInput"
          placeholder="Select Place"
          value={selectedLocations}
          onClick={() => setShowLocation(true)}
        />
        <ul className="locationsList">
          {showLocation &&
            locations?.map((city, i) => (
              <li key={i} onClick={() => hanldeAllCities(city)}>
                {city}
              </li>
            ))}
        </ul>
        <input
          type="text"
          className="searchInput"
          placeholder="Enter Food or restaurant name"
        />
      </div>
    </div>
  );
};

export default Hero;
