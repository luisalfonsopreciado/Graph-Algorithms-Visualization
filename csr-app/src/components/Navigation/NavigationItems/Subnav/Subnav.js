import React from "react";
import "./Subnav.css";

const Subnav = ({ children, title }) => {
  return (
    <div className="subnav">
      <button className="subnavbtn">{title}</button>
      <div className="subnav-content">{children}</div>
    </div>
  );
};

export default Subnav;
