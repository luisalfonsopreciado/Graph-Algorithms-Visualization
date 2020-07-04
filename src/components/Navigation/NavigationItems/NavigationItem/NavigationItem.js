import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = ({ children, clicked, style = {} }) => (
  <div className={classes.NavigationItem}>
    <button onClick={clicked} className={classes.Btn} style={style}>
      {children}
    </button>
  </div>
);
export default NavigationItem;
