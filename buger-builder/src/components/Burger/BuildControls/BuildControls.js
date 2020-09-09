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
        {controls.map((ctrl) => {
            return <BuildControl key={ctrl.Type}
                                 label={ctrl.Label}
                                 added={() => props.addedIngredient(ctrl.Type)}
                                 removed={() => props.removedIngredient(ctrl.Type)}
                                 removedButtonDisabled={props.removeButtonDisabled[ctrl.Type]} />
        })}
    </div>
);

export default buildControls;