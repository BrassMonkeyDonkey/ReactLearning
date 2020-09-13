import React from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const buttonTypes = ["Danger", "Success"];

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li>
        <p>
          <span style={{ textTransform: "capitalized" }}>{igKey}:</span>{" "}
          {props.ingredients[igKey]}
        </p>
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}$</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType={buttonTypes[0]} clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType={buttonTypes[1]} clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
