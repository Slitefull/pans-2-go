import React, { useEffect, useRef, useState } from "react";
import "./stepper-line.styles.scss";


interface StepperProps {
  steps: Step[];
  currStep: number;
  activeStepsArr: any[];
  height: string;
}

interface Step {
  // Title of the step
  title: string;
  description: string;
  // Element to render in the step, can contain
  // a form, an image, whatever
  // element: (stepProps: StepProps) => any;
}

export interface StepProps {
  // Here we tell the stepper to go to the next or previous step from
  // the element we are rendering
  goNextStep: () => void;
  goPreviousStep: () => void;
  // Tells you the active step right now
  currentStep: number;
  // And this is useful to know where you are
  isLast: boolean;
  isFirst: boolean;
  // Tells you the step in which you are right now, starting
  // from 1
  step: number;
}

export const StepperLine: React.FC<StepperProps> = ({ steps, currStep, activeStepsArr, height }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepperSelector = useRef<HTMLDivElement>(null);
  // Every time our currentStep is updated, we are going to trigger this
  useEffect(() => {
    setCurrentStep(currStep)
    moveStepper();
  }, [currStep]);

  const moveStepper = () => {
    if (stepperSelector.current) {
      const stepper = stepperSelector.current;
      const stepWidth = stepper.offsetWidth / steps.length;
      stepper.style.transform = `translateX(-${
        stepWidth * (currentStep - 1)
      }px)`;
    }
  };

  return (
    <div style={{ height: height }} className="stepper stepper-wrapper">
      <StepperProgress
        steps={steps.map(step => step)}
        currentStep={currentStep}
        activeStepsArr={activeStepsArr}
      />
    </div>
  );
};

const StepperProgress: React.FC<{
  steps: any[];
  currentStep: number;
  activeStepsArr: any[];
}> = ({ steps, currentStep, activeStepsArr }) => {
  const progressPerStep = 100 / (steps.length - 1);
  const progress = (currentStep - 1) * progressPerStep;
  return (
    <div className="stepper-progress">
      <div
        className="stepper-progress-bar"
        style={{ width: progress + "%" }}
      />
      {steps.map((step, i) => (
        <div key={step + '_' + i} className="step">
          <div className={(i <= currentStep) ? "step-number active" : "step-number"}>{i + 1}</div>
          <div className="step-text">
            <h5
              className="step-title">{(i <= currentStep) ? activeStepsArr.find((status) => status.number === i).title : step.title}</h5>
            <p className="step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
