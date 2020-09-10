import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { Label: "Salad", Type: "salad" },
    { Label: "Cheese", Type: "cheese" },
    { Label: "Bacon", Type: "bacon" },
    { Label: "Meat", Type: "meat" }    
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map((ctrl) => {
            return <BuildControl key={ctrl.Type}
                                 label={ctrl.Label}
                                 added={() => props.addedIngredient(ctrl.Type)}
                                 removed={() => props.removedIngredient(ctrl.Type)}
                                 removedButtonDisabled={props.removeButtonDisabled[ctrl.Type]} />
        })}
        <button className={classes.OrderButton}
                disabled={!props.purchasable} >ORDER NOW!</button>
    </div>
);

export default buildControls;