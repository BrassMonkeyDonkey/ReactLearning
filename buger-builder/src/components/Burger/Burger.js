import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
                              .map(ingredientKey => [...Array(props.ingredients[ingredientKey])]
                                    .map((_, index) => <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />))
                                        .reduce((arr, el) => { return arr.concat(el); }, []);

    if(ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />            
        </div>
    );
};

export default Burger;