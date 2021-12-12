import PropTypes from "prop-types";
import React, { useContext } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { UserContext } from "../pages/FoodInfoDietPlanPage";

const DietList = (props) => {
  const user = useContext(UserContext);
  const dietItems = props.dietItems;
  const setDietItems = props.setDietItems;

  let totalCalorie = 0;
  dietItems.forEach((item) => {
    totalCalorie += parseInt(item[1], 10);
  });

  const removeDietItem = (foodName, index) => {
    fetch("/api/delete_diet_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, foodName: foodName }),
    });
    let newDietItems = [...dietItems];
    newDietItems.splice(index, 1);
    setDietItems(newDietItems);
  };

  return (
    <>
      <h2>Total Calorie: {totalCalorie.toString()}</h2>
      {dietItems.map((dietItem, index) => (
        <div className="food-row" key={index}>
          <div key={index}>
            <div className="food_info">Food Name: {dietItem[0]}</div>
            <br />
            <div className="food_info">Calorie Per Ounce: {dietItem[1]}</div>
          </div>

          {/* Delete Icon */}
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => {
                removeDietItem(dietItem[0], index);
              }}
              className="delete-icon"
            />
          </div>
        </div>
      ))}
    </>
  );
};

DietList.propTypes = {
  dietItems: PropTypes.array,
  setDietItems: PropTypes.func,
};

export default DietList;
