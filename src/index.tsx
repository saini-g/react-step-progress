import * as React from 'react';
import styles from './styles.module.css';

import { StepStates, ProgressStep, StepProgressProps, ReducerAction } from './models';

function stepsReducer(steps: ProgressStep[], action: ReducerAction): ProgressStep[] {

  return steps.map((step, i) => {

    if (i < action.payload.index) {
      return { ...step, state: StepStates.COMPLETED };
    } else if (i === action.payload.index) {
      return { ...step, state: action.payload.state };
    } else {
      step.state = StepStates.NOT_STARTED;
      return step;
    }
  });
}

function StepProgressBar(props: StepProgressProps): JSX.Element {
  const {
    steps,
    startingStep,
    wrapperClass,
    progressClass,
    stepClass,
    contentClass,
    buttonWrapperClass,
    primaryBtnClass,
    secondaryBtnClass
  } = props;
  const [state, dispatch] = React.useReducer(stepsReducer, steps);
  const [currentIndex, setCurrentIndex] = React.useState(startingStep);

  React.useEffect(function() {
    dispatch({
      type: 'init',
      payload: { index: currentIndex, state: StepStates.CURRENT }
    });
  }, []);

  function nextHandler(): void {
    let isStateValid = true;
    const stepValidator = state[currentIndex].validator;

    if (stepValidator) {
      isStateValid = stepValidator();
    }
    dispatch({
      type: 'next',
      payload: {
        index: isStateValid ? currentIndex + 1 : currentIndex,
        state: isStateValid ? StepStates.CURRENT : StepStates.ERROR
      }
    });

    if (isStateValid) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevHandler(): void {
    dispatch({
      type: "previous",
      payload: {
        index: currentIndex - 1,
        state: StepStates.CURRENT,
      },
    });
    setCurrentIndex(currentIndex - 1);
  }

  return (
    <div className={`${styles['progress-bar-wrapper']} ${wrapperClass || ''}`}>

      <ul className={`${styles['step-progress-bar']} ${progressClass || ''}`}>
        {
          state.map((step, i) => {
            return (
              <li
                key={i}
                className={`${styles['progress-step']}${
                  step.state === StepStates.COMPLETED ? ` ${styles.completed}` : ''
                }${
                  step.state === StepStates.CURRENT ? ` ${styles.current}` : ''
                }${
                  step.state === StepStates.ERROR ? ` ${styles['has-error']}` : ''
                } ${stepClass || ''}`}
              >
                {
                  step.state === StepStates.COMPLETED && (
                    <span className={styles['step-icon']}>
                      Y
                    </span>
                  )
                }
                {
                  step.state === StepStates.ERROR && (
                    <span className={styles['step-icon']}>
                      !
                    </span>
                  )
                }
                {
                  step.state !== StepStates.COMPLETED &&
                  step.state !== StepStates.ERROR && (
                    <span className={styles['step-index']}>{i + 1}</span>
                  )
                }
                <span className={styles['step-label']}>{step.label}</span>
              </li>
            );
          })
        }
      </ul>

      <div className={`${styles['step-content']} ${contentClass || ''}`}>
        {state[currentIndex].content}
      </div>

      <div className={`${styles['step-buttons']} ${buttonWrapperClass || ''}`}>
        <a
          className={`${
            styles['step-action-btn']
          } ${
            styles['action-btn-secondary']
          } ${
            currentIndex === 0 ? styles.disabled : ''
          } ${
            secondaryBtnClass || ''
          }`}
          onClick={prevHandler}
        >
          Previous
        </a>
        <a
          className={`${
            styles['step-action-btn']
          } ${
            styles['action-btn-primary']
          } ${
            currentIndex === state.length - 1 ? styles.disabled : ''
          } ${
            primaryBtnClass || ''
          }`}
          onClick={nextHandler}
        >
          Next
        </a>
      </div>

    </div>
  );
};

export default StepProgressBar;
