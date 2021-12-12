import React, { useEffect, useState } from "react";
import FunctionNavbar from "../widgets/FunctionNavbar";
import WeightChartSection from "../sections/WeightChartSection";

export const UserContext = React.createContext("");

function WeightPage() {
  const [weightRecords, setWeightRecords] = useState([]);
  let user = localStorage.getItem("user");

  async function fetchWeightData() {
    const result = await fetch(`/api/get_weight_records/${user}`, {
      method: "GET",
    });
    let itemsObj = await result.json();

    let itemsArray = [];
    for (var key in itemsObj) {
      itemsArray.push([
        itemsObj[key]["record_date"],
        itemsObj[key]["weight_value"],
      ]);
    }
    return itemsArray;
  }

  useEffect(() => {
    // Get all weight records from MongoDB on initialization
    fetchWeightData().then((weightData) => {
      setWeightRecords(weightData);
    });
  }, []);

  return (
    <>
      <FunctionNavbar />
      <div className="web-page">
        <UserContext.Provider value={user}>
          <div className="food-section">
            <WeightChartSection
              weightRecords={weightRecords}
              setWeightRecords={setWeightRecords}
            />
          </div>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default WeightPage;
