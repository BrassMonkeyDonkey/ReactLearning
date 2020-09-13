import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
  
let classesNames = [classes.SideDrawer, classes.Close];
  if(props.show) {
    classesNames = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={classesNames.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
