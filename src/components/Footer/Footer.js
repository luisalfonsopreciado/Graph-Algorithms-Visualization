import React from "react";
import classes from "./Footer.module.css";
import github from "../../resources/logos/github.png";

const logoWidth = 40;
const Footer = (props) => {
  return (
    <>
      <div className={classes.Footer}>
        <div className={classes.IconContainer}>
          <ul className={classes.Icons}>
            <li className="link d-inline-block" style={{ listStyle: "none" }}>
              <a
                href="https://github.com/luisalfonsopreciado/Graph-Algorithms-Visualization"
                rel="noopener noreferrer"
                className="LinkU"
                target="_blank"
              >
                <img src={github} width={logoWidth} alt="github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Footer;
