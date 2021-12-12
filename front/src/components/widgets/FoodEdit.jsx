import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { UserContext } from "../pages/FoodInfoDietPlanPage";

function FoodEdit(props) {
  const user = useContext(UserContext);
  const foodItems = props.foodItems;
  const setFoodItems = props.setFoodItems;

  const [inputFoodName, setinputFoodName] = useState("");
  const [inputCalorie, setinputCalorie] = useState("");

  const addFood = (foodInfoObject) => {
    // Skip if empty or only containing spaces
    if (!foodInfoObject.foodName || /^\s*$/.test(foodInfoObject.foodName)) {
      return;
    }
    if (
      !foodInfoObject.calorieOunce ||
      /^\s*$/.test(foodInfoObject.calorieOunce)
    ) {
      return;
    }

    fetch("/api/create_food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodInfoObject),
    });
    let newFoodItems = [
      ...foodItems,
      [foodInfoObject.foodName, foodInfoObject.calorieOunce],
    ];
    setFoodItems(newFoodItems);
  };

  const handleFoodNameChange = (e) => {
    // Keep the text already entered
    setinputFoodName(e.target.value);
  };

  const handleCalorieChange = (e) => {
    // Keep the text already entered
    setinputCalorie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.onSubmit is given when the widget is created
    addFood({
      user: user,
      foodName: inputFoodName,
      calorieOunce: inputCalorie,
    });
    setinputFoodName("");
    setinputCalorie("");
  };

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <>
        <input
          placeholder="Enter Food Name Here"
          value={inputFoodName}
          onChange={handleFoodNameChange}
          name="text"
          className="foodname-input"
        />
        <input
          placeholder="Enter Calorie Per Ounce"
          value={inputCalorie}
          onChange={handleCalorieChange}
          name="text"
          className="foodcalorie-input"
        />
        <button onClick={handleSubmit} className="food-button">
          Add food
        </button>
      </>
    </form>
  );
}

FoodEdit.propTypes = {
  foodItems: PropTypes.array,
  setFoodItems: PropTypes.func,
};

export default FoodEdit;
