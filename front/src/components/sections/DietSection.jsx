import PropTypes from "prop-types";
import React from "react";
import DietList from "../widgets/DietList";

function DietSection(props) {
  const dietItems = props.dietItems;
  const setDietItems = props.setDietItems;

  return (
    <>
      <h1>Daily Diet Plan</h1>
      <DietList dietItems={dietItems} setDietItems={setDietItems} />
    </>
  );
}

DietSection.propTypes = {
  dietItems: PropTypes.array,
  setDietItems: PropTypes.func,
};

export default DietSection;
