import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 1.2,
    cheese: 0.7,
    meat: 1.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,            
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    }

    addedIngredientHandler = (type) => {        
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] + 1;

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

        console.log(this.state.ingredients);
        console.log(updatedIngredients);

        console.log(this.state.totalPrice);
        console.log(newPrice);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    };

    removedIngredientHandler = (type) => {        
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] - 1;

        if(updatedIngredients[type] < 0) {
            return;
        }

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

        console.log(this.state.ingredients);
        console.log(updatedIngredients);

        console.log(this.state.totalPrice);
        console.log(newPrice);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addedIngredient={this.addedIngredientHandler}
                    removedIngredient={this.removedIngredientHandler}
                    removeButtonDisabled={disabledInfo} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;