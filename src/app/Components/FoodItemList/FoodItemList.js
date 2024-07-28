import React from "react";

const FoodItemList = () => {
  return (
    <div>
      <h2>Food Items</h2>
      <table>
        <thead>
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Pizza</td>
            <td>45</td>
            <td>Best selller</td>
            <td>image</td>
            <td>
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
