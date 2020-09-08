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
            return <BuildControl key={ctrl.Type} label={ctrl.Label} />
        })}
    </div>
);

export default buildControls;