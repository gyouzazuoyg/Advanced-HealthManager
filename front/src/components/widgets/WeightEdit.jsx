import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { UserContext } from "../pages/WeightPage";

function WeightEdit(props) {
  const user = useContext(UserContext);
  const setWeightRecords = props.setWeightRecords;
  let weightRecords = props.weightRecords;

  const [inputDate, setInputDate] = useState("");
  const [inputWeight, setInputWeight] = useState("");

  const addWeightRecord = (weightRecordObject) => {
    // Skip if empty or only containing spaces
    if (
      !weightRecordObject.record_date ||
      /^\s*$/.test(weightRecordObject.record_date)
    ) {
      return;
    }
    if (
      !weightRecordObject.weight_value ||
      /^\s*$/.test(weightRecordObject.weight_value)
    ) {
      return;
    }

    fetch("/api/create_weight_record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weightRecordObject),
    });
    let newWeightRecords = [
      ...weightRecords,
      [weightRecordObject.record_date, weightRecordObject.weight_value],
    ];
    setWeightRecords(newWeightRecords);
  };

  const handleRecordDateChange = (e) => {
    // Keep the text already entered
    setInputDate(e.target.value);
  };

  const handleWeightValueChange = (e) => {
    // Keep the text already entered
    setInputWeight(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.onSubmit is given when the widget is created
    addWeightRecord({
      user: user,
      record_date: inputDate,
      weight_value: inputWeight,
    });
    setInputDate("");
    setInputWeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <>
        <input
          placeholder="Enter Date Here"
          value={inputDate}
          onChange={handleRecordDateChange}
          name="text"
          className="foodname-input"
        />
        <input
          placeholder="Enter Weight Here"
          value={inputWeight}
          onChange={handleWeightValueChange}
          name="text"
          className="weight-input"
        />
        <button onClick={handleSubmit} className="food-button">
          Add Record
        </button>
      </>
    </form>
  );
}

WeightEdit.propTypes = {
  weightRecords: PropTypes.array,
  setWeightRecords: PropTypes.func,
};

export default WeightEdit;
