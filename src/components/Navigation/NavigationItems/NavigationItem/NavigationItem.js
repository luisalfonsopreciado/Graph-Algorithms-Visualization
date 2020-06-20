import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = ({ children, clicked }) => (
  <div className={classes.NavigationItem}>
    <button onClick={clicked} className={classes.Btn}>
      {children}
    </button>
  </div>
);
export default NavigationItem;
