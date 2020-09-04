export enum StepStates {
  NOT_STARTED = 'not_started',
  CURRENT = 'current',
  ERROR = 'error',
  COMPLETED = 'completed'
}

export interface ProgressStep {
  label: string;
  subtitle?: string;
  name: string;
  state?: StepStates;
  content: React.ReactNode;
  validator?: (payload?: any) => boolean;
}

export interface StepProgressProps {
  steps: ProgressStep[];
  startingStep: number;
  wrapperClass?: string;
  progressClass?: string;
  stepClass?: string;
  labelClass?: string;
  subtitleClass?: string;
  contentClass?: string;
  buttonWrapperClass?: string;
  primaryBtnClass?: string;
  secondaryBtnClass?: string;
  submitBtnName?: string;
  onSubmit: Function;
  previousBtnName?: string;
  nextBtnName?: string;
}

export interface ReducerAction {
  type: string;
  payload: { index: number; state: StepStates };
}
