import PropTypes from "prop-types";
import React from "react";
import UserNamePasswordEdit from "../widgets/UserNamePasswordEdit";

function AccountSection(props) {
  return (
    <div className="account-section">
      <h1>Welcome to Health Manager</h1>
      <UserNamePasswordEdit status={props.status} />
    </div>
  );
}

AccountSection.propTypes = {
  status: PropTypes.string,
};

export default AccountSection;
