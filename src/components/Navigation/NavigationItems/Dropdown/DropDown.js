import React from "react";
import "./DropDown.css";

const DropDown = ({ children, clicked, moreInfo, title }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        {title}
      </button>
      <div className="dropdown-content">
        {children}
      </div>
    </div>
  );
};

export default DropDown;
