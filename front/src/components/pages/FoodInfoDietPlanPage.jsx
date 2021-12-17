import React, { useEffect, useState } from "react";
import DietSection from "../sections/DietSection";
import FoodSection from "../sections/FoodSection";
import FunctionNavbar from "../widgets/FunctionNavbar";

export const UserContext = React.createContext("");

// Yuanyuan: It is impressive that you have such detailed components, such as foot section and diet section. This definitely increase the reusability and readability of your codes.
function FoodInfoDietPlanPage() {
  let user = localStorage.getItem("user");
  const [foodItems, setFoodItems] = useState([]);
  const [dietItems, setDietItems] = useState([]);

  async function fetchFoodData() {
    const result = await fetch(`/api/get_food_list/${user}`, {
      method: "GET",
    });
    let itemsObj = await result.json();

    let itemsArray = [];
    for (var key in itemsObj) {
      itemsArray.push([
        itemsObj[key]["foodName"],
        itemsObj[key]["calorieOunce"],
      ]);
    }
    return itemsArray;
  }

  async function fetchDietData() {
    const result = await fetch(`/api/get_diet_plan/${user}`, {
      method: "GET",
    });
    let itemsObj = await result.json();

    let itemsArray = [];
    for (var key in itemsObj) {
      itemsArray.push([
        itemsObj[key]["foodName"],
        itemsObj[key]["calorieOunce"],
      ]);
    }
    return itemsArray;
  }

  useEffect(() => {
    // Get all food information from MongoDB on initialization
    fetchFoodData().then((foodItems) => {
      setFoodItems(foodItems);
    });
    fetchDietData().then((dietItems) => {
      setDietItems(dietItems);
    });
  }, []);

  return (
    <>
      <FunctionNavbar />
      <div className="web-page">
        <UserContext.Provider value={user}>
          <div className="food-section">
            <FoodSection
              foodItems={foodItems}
              setFoodItems={setFoodItems}
              dietItems={dietItems}
              setDietItems={setDietItems}
            />
          </div>
          <div className="food-section">
            <DietSection dietItems={dietItems} setDietItems={setDietItems} />
          </div>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default FoodInfoDietPlanPage;
