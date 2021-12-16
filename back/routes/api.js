var express = require("express");
var router = express.Router();
var foodDB = require("../database/foodDB");
var dietDB = require("../database/dietDB");
var userDB = require("../database/userDB");
var weightDB = require("../database/weightDB");

/* Food Information Related Below */

router.get("/get_food_list/:user", function (req, res) {
  // Send foodList data to front end

  foodDB.retrieveAll(req.params.user, (foodList) => {
    res.status(200).json(foodList);
  });
});

router.post("/delete_food", async function (req, res) {
  // Send foodList data to front end
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  foodDB.delete(user, foodName);
  res.status(200);
});

router.post("/create_food", async function (req, res) {
  // Send foodList data to front end
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  const calorieOunce = await req.body.calorieOunce;
  foodDB.create(user, foodName, calorieOunce);
  res.status(200);
});

/* Diet Plan Related Below */

router.get("/get_diet_plan/:user", function (req, res) {
  dietDB.retrieveAll(req.params.user, (dietPlan) => {
    res.status(200).json(dietPlan);
  });
});

router.post("/delete_diet_item", async function (req, res) {
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  dietDB.delete(user, foodName);
  res.status(200);
});

router.post("/create_diet_item", async function (req, res) {
  const user = await req.body.user;
  const foodName = await req.body.foodName;
  const calorieOunce = await req.body.calorieOunce;
  dietDB.create(user, foodName, calorieOunce);
  res.status(200);
});

/* Login and Registration Related Below */

router.post("/create_user", async function (req, res) {
  const userName = await req.body.userName;
  const password = await req.body.password;
  userDB.create(userName, password);
  res.status(200);
});

router.post("/login", async function (req, res) {
  const userName = await req.body.userName;
  userDB.login(userName, (accountInfoObj) => {
    res.status(200).json(accountInfoObj);
  });
});

/* Weight Record Related Below */

router.get("/get_weight_records/:user", function (req, res) {
  weightDB.retrieveAll(req.params.user, (weightRecords) => {
    res.status(200).json(weightRecords);
  });
});

router.post("/delete_weight_record", async function (req, res) {
  const user = await req.body.user;
  const record_date = await req.body.record_date;
  weightDB.delete(user, record_date);
  res.status(200);
});

router.post("/create_weight_record", async function (req, res) {
  const user = await req.body.user;
  const record_date = await req.body.record_date;
  const weight_value = await req.body.weight_value;
  weightDB.create(user, record_date, weight_value);
  res.status(200);
});

module.exports = router;
