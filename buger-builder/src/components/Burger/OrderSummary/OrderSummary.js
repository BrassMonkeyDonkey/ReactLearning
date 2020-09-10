import React from 'react';

import Aux from '../../../hoc/Auxiliary';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return (
            <li>
                <p><stan style={{textTransform: 'capitalized'}}>{igKey}:</stan> {props.ingredients[igKey]}</p>
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your order</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>        
    )
}

export default OrderSummary;