"use client";

import Header from "../Components/CustomerHeader/Header";
import Footer from "../Components/RestroFooter/Footer";
import UserSignUp from "../Components/UserSignUp/UserSignUp";

const UserAuth = () => {
  return (
    <div>
      <Header />
      <UserSignUp />
      <Footer />
    </div>
  );
};

export default UserAuth;
