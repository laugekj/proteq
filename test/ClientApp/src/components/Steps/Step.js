import React, { useEffect, useState } from "react";
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
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front" >
          
          <p onClick={completeMe}
        className={"step" + (step.completed ? " completed" : "")}>
          <h1 class="steptitel">Step nr: </h1>
          {step.stepNumber}
          </p>
        </div> 
        <div class="flip-card-back" onClick={onClickStep}>
          <h1 class="titel">{step.title}</h1>
        </div>  
    </div>
  </div>
  );
}
export default Step;