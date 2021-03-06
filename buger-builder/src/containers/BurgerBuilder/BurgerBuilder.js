import React, { Component } from "react";

import Auxiliary from "../../hoc/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 1.2,
  cheese: 0.7,
  meat: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchased: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get("https://reactmyburger-b3347.firebaseio.com/ingredients.json")
         .then(response => this.setState({ingredients: response.data}))
         .catch(error => this.setState({error: true}));
  };

  updatePurchasableState(Ingredients) {
    const sum = Object.keys(Ingredients)
      .map((igKey) => Ingredients[igKey])
      .reduce((sum, el) => sum + el);

    this.setState({
      purchasable: sum > 0,
    });
  }

  addedIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] + 1;

    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };

  removedIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] - 1;

    if (updatedIngredients[type] < 0) {
      return;
    }

    const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasableState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchased: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchased: false });
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Kevin Peraldi",
        address: {
          street: "Rue Infroit",
          zipCode: "78570",
          country: "France"
        },
        email: "kperaldi@mail.com"
      },
      deliveryMethod: "fastest"
    }

    // the ".json" is requiered by Firebase. It is how it is working to automatically handle new "document" creation.
    axios.post("/orders.json/", order)
    .then(response => this.setState({loading: false, purchased: false}))
    .catch(error => this.setState({loading: false, purchased: false}));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Unable to fetch the ingredients!</p> : <Spinner />

    if(this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addedIngredient={this.addedIngredientHandler}
            removedIngredient={this.removedIngredientHandler}
            removeButtonDisabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchased={this.purchaseHandler}
          />
        </Auxiliary>
      );

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseContinued={this.purchaseContinueHandler}
        purchaseCancelled={this.purchaseCancelHandler} />;

      if(this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchased}
          modalClosed={this.purchaseCancelHandler}
        >
         {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
