import React from "react";
import "./css/List.css";
import "./css/Navbar.css";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import FoodInfoDietPlanPage from "./components/pages/FoodInfoDietPlanPage";
import WeightPage from "./components/pages/WeightPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/diet_plan" element={<FoodInfoDietPlanPage />} />
        <Route path="/weight" element={<WeightPage />} />
      </Routes>
    </>
  );
}

export default App;
