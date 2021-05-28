import React from "react";
import "./Step.css";
function Step({ step, onComplete }) {

  function completeMe() {
    onComplete(step);
    window.location.href = '/design1?' + step.id
    
    
  }



  function onClickStep() {
      //TODO: fetch step from server and redirect

      window.location.href = '/design1?' + step.id
  }

  //TODO: Fetch title from server - insert in flip-card-back

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front" >
          
          <p onClick={completeMe}
        className={"step" + (step.completed ? " completed" : "")}>
          <h1 className="steptitel">Step nr: {step.stepNumber}</h1>
          
          </p>
        </div> 
        <div className="flip-card-back" onClick={onClickStep}>
          <h1 className="titel">{step.title}</h1>
        </div>  
    </div>
  </div>
  );
}
export default Step;