import React from "react";
import "./DropDown.css";

const DropDown = ({ children, clicked, moreInfo, title }) => {
  return (
    <div class="dropdown">
      <button class="dropbtn">
        {title}
      </button>
      <div class="dropdown-content">
        {children}
      </div>
    </div>
  );
};

export default DropDown;
