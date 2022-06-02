import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Draft from '@/store/Drafts';

import ManualForm from './ManualForm';
import IntroForm from './IntroForm';
import EssentialBrowserForm from './EssentialBrowserForm';
import EssentialScreenForm from './EssentialScreenForm';

const CreateWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;

  div.steps {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 4rem);
    padding: 0 2rem;

    div.links {
      margin-top: auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      height: 4rem;

      div.prev {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      div.next {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }

`;

export const Create = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = [
    ManualForm,
    IntroForm,
    EssentialBrowserForm,
    EssentialScreenForm,
  ];

  const handleComplete = () => {
    // TODO: export
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <CreateWrapper>
      <div className="steps">
        {
          currentStep < steps.length && 
          React.createElement(
            // component
            steps[currentStep],

            // props
            {
              hasPrev: currentStep > 0,
              hasNext: currentStep < steps.length - 1,
              onNext: handleNext,
              onPrev: handlePrev,
            }
          )
        }
      </div>

    </CreateWrapper>
  );
};

export default Create;
