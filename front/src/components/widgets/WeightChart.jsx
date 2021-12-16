import PropTypes from "prop-types";
import React, { useContext } from "react";
import ReactEcharts from "echarts-for-react";
import { RiCloseCircleLine } from "react-icons/ri";
import { UserContext } from "../pages/WeightPage";

function WeightChart(props) {
  const user = useContext(UserContext);
  let weightRecords = props.weightRecords;
  let setWeightRecords = props.setWeightRecords;
  let dateArray = [];
  let weightValueArray = [];
  weightRecords.forEach((record) => {
    dateArray.push(record[0]);
    weightValueArray.push(Number(record[1]));
  });

  const removeWeightRecord = (recordDate, index) => {
    fetch("/api/delete_weight_record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, record_date: recordDate }),
    });
    let newWeightRecords = [...weightRecords];
    newWeightRecords.splice(index, 1);
    setWeightRecords(newWeightRecords);
  };

  return (
    <div>
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
            formatter: "Date: {b}<br />Weight: {c} lbs",
          },
        }}
        style={{ width: "100%" }}
      />
      {weightRecords.map((weightRecord, index) => (
        <div className="food-row" key={index}>
          <div key={index}>
            <div className="food_info">Record Date: {weightRecord[0]}</div>
            <br />
            <div className="food_info">
              Weight Value: {Number(weightRecord[1])} lbs
            </div>
          </div>

          {/* Delete Icon */}
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => {
                removeWeightRecord(weightRecord[0], index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  removeWeightRecord(weightRecord[0], index);
                }
              }}
              className="delete-icon"
              tabIndex="0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

WeightChart.propTypes = {
  dateArray: PropTypes.array,
  weightRecords: PropTypes.array,
  setWeightRecords: PropTypes.func,
};

export default WeightChart;
