import PropTypes from "prop-types";
import React from "react";
import ReactEcharts from "echarts-for-react";

function WeightChart(props) {
  let weightRecords = props.weightRecords;
  let dateArray = [];
  let weightValueArray = [];
  weightRecords.forEach((record) => {
    dateArray.push(Number(record[0]));
    weightValueArray.push(Number(record[1]));
  });

  return (
    <ReactEcharts
      option={{
        xAxis: {
          type: "category",
          showGrid: false,
          data: dateArray,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          min: function (value) {
            return parseInt(value.min) - 1 >= 0 ? parseInt(value.min) - 1 : 0;
          },
        },
        series: [
          {
            data: weightValueArray,
            type: "line",
            smooth: true,
          },
        ],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
          formatter: "Date: {b}<br />Weight: {c}",
        },
      }}
      style={{ width: "100%" }}
    />
  );
}

WeightChart.propTypes = {
  weightRecords: PropTypes.array,
};

export default WeightChart;
