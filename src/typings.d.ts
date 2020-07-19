/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

declare enum StepStates {
  NOT_STARTED = 'not_started',
  CURRENT = 'current',
  ERROR = 'error',
  COMPLETED = 'completed'
}

interface ProgressStep {
  label: string;
  subtitle?: string;
  name: string;
  state?: StepStates;
  content: React.ReactNode;
  validator?: (payload?: any) => boolean;
}

interface StepProgressProps {
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
}

interface ReducerAction {
  type: string;
  payload: { index: number; state: StepStates };
}
