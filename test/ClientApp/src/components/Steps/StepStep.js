import React, { useState } from 'react';
import Step from './Step';
import './StepStep.css'

export default function StepStep({serversteps}) {

    const [steps, setSteps] = useState(serversteps);

    const onComplete = (inputStep) => {
        const newSteps = [];
        steps.forEach((step) => {
          if (step.id === inputStep.id) {
            step.completed = !step.completed;
            // Do some database stuff
          }
          newSteps.push(step);
        });
        setSteps(newSteps);
      };
    

    return (
        <div className={"stepper"}>
            {steps.map((step) => (
                <Step key={step.id} step={step} onComplete={onComplete}/>
            ))}

        </div>
    )

}
