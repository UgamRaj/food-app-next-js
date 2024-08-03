"use client";

import { useEffect, useState } from "react";
import "./Hero.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restro, setRestro] = useState([]);
  const router = useRouter();

  const getLocations = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/customer/locations`
      );
      if (data.success) {
        // console.log("🚀 ~ getLocations ~ data:", data);

        setLocations(data.cities);
      }
    } catch (error) {
      console.log("🚀 ~ getLocations ~ error:", error);
    }
  };

  useEffect(() => {
    getLocations();
    getInputRestaurant();
  }, []);

  //! Get Search location
  // const getInputLocation = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:3000/api/customer?location=jaipur"
  //     );
  //     if (data.success) {
  //       console.log("🚀 ~ getLocation ~ data:", data.result);
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ getLocation ~ error:", error);
  //   }
  // };

  const getInputRestaurant = async (params) => {
    let searchKey = "";
    if (params?.location) {
      searchKey = "location=" + params.location;
    } else if (params?.restro) {
      searchKey = "resto=" + params.restro;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/customer?${searchKey}`
      );
      // console.log("🚀 ~ getInputRestaurant ~ data:", data);
      if (data.success) {
        // console.log("🚀 ~ getRestaurant ~ data:", data.result);
        setRestro(data.result);
      }
    } catch (error) {
      console.log("🚀 ~ getRestaurant ~ error:", error);
    }
  };

  const hanldeAllCities = (city) => {
    setSelectedLocations(city);
    setShowLocation(false);
    getInputRestaurant({ location: city });
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
          onChange={(e) => getInputRestaurant({ restro: e.target.value })}
          type="text"
          className="searchInput"
          placeholder="Enter Food or restaurant name"
        />
      </div>

      <div className="restoListContainer">
        {restro?.map(({ _id, name, phone, city, address, email }) => (
          <div
            onClick={() => router.push(`/details/${name}?id=${_id}`)}
            className="restoWrapper"
            key={_id}
          >
            <div className="restroHeading">
              <h3>{name}</h3>
              <h5>Contact: {phone}</h5>
            </div>
            <div className="restroAddress">
              <div>{city}</div>
              <div>
                {address}, Email: {email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
