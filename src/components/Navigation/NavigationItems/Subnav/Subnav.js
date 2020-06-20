import React from "react";
import "./Subnav.css";

const Subnav = ({ children, title }) => {
  return (
    <div class="subnav">
      <button class="subnavbtn">{title}</button>
      <div class="subnav-content">{children}</div>
    </div>
  );
};

export default Subnav;
