import PropTypes from "prop-types";
import React from "react";
import WeightChart from "../widgets/WeightChart";
import WeightEdit from "../widgets/WeightEdit";

function WeightChartSection(props) {
  return (
    <>
      <h1>Daily Weight Record</h1>
      <WeightEdit
        weightRecords={props.weightRecords}
        setWeightRecords={props.setWeightRecords}
      />
      <WeightChart
        weightRecords={props.weightRecords}
        setWeightRecords={props.setWeightRecords}
      />
    </>
  );
}

WeightChartSection.propTypes = {
  weightRecords: PropTypes.array,
  setWeightRecords: PropTypes.func,
};

export default WeightChartSection;
