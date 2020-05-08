import introJs from 'intro.js';
import { DONE, NEXT, PREVIOUS, SKIP } from 'locale/consts';
import React, { useState } from 'react';

export interface GuideTourStep {
  selector: string;
  intro: string;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'bottom-left-aligned' | 'bottom-middle-aligned' | 'bottom-right-aligned' | 'auto' | undefined;
}

interface Props {
  started: boolean;
  steps: GuideTourStep[];
  onClose: () => any;
  translate: any;
}

export default ({
  started, steps: propsSteps, onClose, translate,
}: Props) => {
  const [inProgress, setInProgress] = useState(false);

  if (started && !inProgress) {
    const steps: IntroJs.Step[] = [];

    propsSteps.forEach((step) => {
      const element = document.querySelector(step.selector);

      if (element) {
        const newStep: IntroJs.Step = {
          element,
          intro: translate(step.intro) || step.intro,
        };

        if (step.position) {
          newStep.position = step.position;
        }

        steps.push(newStep);
      }
    });

    const introOptions = {
      steps,
      showProgress: true,
      nextLabel: translate(NEXT),
      prevLabel: translate(PREVIOUS),
      skipLabel: translate(SKIP),
      doneLabel: translate(DONE),
    };

    const intro = introJs();

    intro.setOptions(introOptions);

    intro.onexit(() => {
      setInProgress(false);
      onClose();
    });

    intro.start();
  }

  return <span />;
};

