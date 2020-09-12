import React from "react";

import classes from "./Logo.module.css";
import BurgerImage from "../../assets/images/burger-logo.png";

const logo = () => (
  <div className={classes.Logo}>
    <img src={BurgerImage} alt="MyBurgerImg"/>
  </div>
);

export default logo;
