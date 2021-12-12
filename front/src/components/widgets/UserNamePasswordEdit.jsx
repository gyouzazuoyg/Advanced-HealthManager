import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserNamePasswordEdit(props) {
  const [inputUserName, setInputUserName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  let button_text = "";
  if (props.status === "register") button_text = "Register";
  else if (props.status === "login") button_text = "Login";

  const register = (accountInfoObj) => {
    // Skip if empty or only containing spaces
    if (!accountInfoObj.userName || /^\s*$/.test(accountInfoObj.userName)) {
      return;
    }
    if (!accountInfoObj.password || /^\s*$/.test(accountInfoObj.password)) {
      return;
    }

    fetch("/api/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountInfoObj),
    });
  };

  const login = async (accountInfoObj) => {
    // Skip if empty or only containing spaces
    if (!accountInfoObj.userName || /^\s*$/.test(accountInfoObj.userName)) {
      return;
    }
    if (!accountInfoObj.password || /^\s*$/.test(accountInfoObj.password)) {
      return;
    }

    let result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountInfoObj),
    });
    let resultObj = await result.json();
    if (resultObj.flag) {
      localStorage.clear();
      localStorage.setItem("user", accountInfoObj.userName);
      navigate("/diet_plan");
    } else {
      // failed
    }
  };

  const handleUserNameChange = (e) => {
    // Keep the text already entered
    setInputUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // Keep the text already entered
    setInputPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountInfoObj = {
      userName: inputUserName,
      password: inputPassword,
    };

    if (props.status === "register") register(accountInfoObj);
    else if (props.status === "login") login(accountInfoObj);

    setInputUserName("");
    setInputPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="food-form">
      <>
        <input
          placeholder="Enter User Name Here"
          value={inputUserName}
          onChange={handleUserNameChange}
          name="text"
          className="foodname-input"
        />
        <input
          placeholder="Enter Password Here"
          value={inputPassword}
          onChange={handlePasswordChange}
          name="text"
          className="foodname-input"
        />
      </>
      <br />
      <button onClick={handleSubmit} className="login-button">
        {button_text}
      </button>
    </form>
  );
}

UserNamePasswordEdit.propTypes = {
  status: PropTypes.string,
};

export default UserNamePasswordEdit;
