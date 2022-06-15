import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";


export const getCssTransitionClassNames = (
  prefix: string
): CSSTransitionClassNames => ({
  appear: `${prefix}_appear`,
  appearActive: `${prefix}_appearActive`,
  appearDone: `${prefix}_appearDone`,
  enter: `${prefix}_enter`,
  enterActive: `${prefix}_enterActive`,
  enterDone: `${prefix}_enterDone`,
  exit: `${prefix}_exit`,
  exitActive: `${prefix}_exitActive`,
  exitDone: `${prefix}_exitDone`,
});
