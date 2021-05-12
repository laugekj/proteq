import React, { useState } from "react";
import "./Step.css";
function Step({ step, onComplete }) {
  function completeMe() {
    onComplete(step);
  }

  function onClickStep() {
      //TODO: fetch step from server and redirect

      window.location.href = '/step' + step.id
  }

  return (
    <div
      onClick={completeMe}
      className={"step" + (step.completed ? " completed" : "")}
    >
      {step.id}
    </div>
  );
}
export default Step;