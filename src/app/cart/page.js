"use client";

import DeleteButton from "../Components/Button/DeleteButton";
import "./cart.css";

const CartPage = () => {
  const removeFromCart = () => {};

  return (
    <div className="mainCart">
      <h1>Your Cart Items</h1>

      <div className="cartContainer">
        <div className="cartItemList">
          <div className="cartItemLeft">
            <div className="imageConatiner">
              <img
                src="https://rotimatic.com/cdn/shop/articles/Wheat_Roti.webp?v=1698408236"
                alt="cart image"
              />
            </div>
            <div className="cartTextDetails">
              <h3>Roti</h3>
              <h5>The Best roti in bilara</h5>
              <DeleteButton />
            </div>
          </div>
          <div className="cartPrice">Price: 500</div>
        </div>
        <div className="cartItemList">
          <div className="cartItemLeft">
            <div className="imageConatiner">
              <img
                src="https://rotimatic.com/cdn/shop/articles/Wheat_Roti.webp?v=1698408236"
                alt="cart image"
              />
            </div>
            <div className="cartTextDetails">
              <h3>Roti</h3>
              <h5>The Best roti in bilara</h5>
              <DeleteButton />
            </div>
          </div>
          <div className="cartPrice">Price: 500</div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
