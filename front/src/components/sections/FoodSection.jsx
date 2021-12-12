import PropTypes from "prop-types";
import React from "react";
import FoodEdit from "../widgets/FoodEdit";
import FoodList from "../widgets/FoodList";

function FoodSection(props) {
  const foodItems = props.foodItems;
  const setFoodItems = props.setFoodItems;
  const dietItems = props.dietItems;
  const setDietItems = props.setDietItems;

  return (
    <>
      <h1>Food Calorie Information</h1>
      <FoodEdit foodItems={foodItems} setFoodItems={setFoodItems} />
      <h2>Click Text to Add to Diet Plan</h2>
      <FoodList
        foodItems={foodItems}
        setFoodItems={setFoodItems}
        dietItems={dietItems}
        setDietItems={setDietItems}
      />
    </>
  );
}

FoodSection.propTypes = {
  foodItems: PropTypes.array,
  setFoodItems: PropTypes.func,
  dietItems: PropTypes.array,
  setDietItems: PropTypes.func,
};

export default FoodSection;
