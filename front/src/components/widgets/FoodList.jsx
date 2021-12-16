import PropTypes from "prop-types";
import React, { useContext } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { UserContext } from "../pages/FoodInfoDietPlanPage";

const FoodList = (props) => {
  const user = useContext(UserContext);
  const foodItems = props.foodItems;
  const setFoodItems = props.setFoodItems;
  const dietItems = props.dietItems;
  const setDietItems = props.setDietItems;

  const removeFood = (foodName, index) => {
    fetch("/api/delete_food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, foodName: foodName }),
    });
    let newFoodItems = [...foodItems];
    newFoodItems.splice(index, 1);
    setFoodItems(newFoodItems);
  };

  const addDietItem = (foodName, calorieOunce) => {
    const foodInfoObject = {
      user: user,
      foodName: foodName,
      calorieOunce: calorieOunce,
    };
    fetch("/api/create_diet_item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodInfoObject),
    });
    let newDietItems = [
      ...dietItems,
      [foodInfoObject.foodName, foodInfoObject.calorieOunce],
    ];
    setDietItems(newDietItems);
  };

  return foodItems.map((foodItem, index) => (
    <div className="food-row" key={index}>
      <div
        key={index}
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addDietItem(foodItem[0], foodItem[1]);
          }
        }}
        onClick={() => {
          addDietItem(foodItem[0], foodItem[1]);
        }}
      >
        <div className="food_info_clickable">Food Name: {foodItem[0]}</div>
        <br />
        <div className="food_info_clickable">Calorie Per Ounce: {foodItem[1]}</div>
      </div>

      {/* Delete Icon */}
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => {
            removeFood(foodItem[0], index);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              removeFood(foodItem[0], index);
            }
          }}
          className="delete-icon"
          tabIndex="0"
        />
      </div>
    </div>
  ));
};

FoodList.propTypes = {
  foodItems: PropTypes.array,
  setFoodItems: PropTypes.func,
  dietItems: PropTypes.array,
  setDietItems: PropTypes.func,
};

export default FoodList;
