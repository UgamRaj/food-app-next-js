"use client";

import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import UserSignUp from "../Components/UserSignUp/UserSignUp";

const UserAuth = ({ searchParams }) => {
  // console.log("🚀 ~ UserAuth ~ props:", searchParams);

  return (
    <div>
      <Header />
      <UserSignUp redirect={searchParams} />
      <Footer />
    </div>
  );
};

export default UserAuth;
