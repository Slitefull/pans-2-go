import { useHistory } from "react-router-dom";
import { RefObject, useCallback, useEffect, useState } from "react";

import throttle from "lodash/throttle";
import debounce from "lodash/debounce";


export enum DelayBehavior {
  THROTTLE,
  DEBOUNCE,
}

interface QSConfig {
  field?: string;
  delayBehavior: DelayBehavior;
  delay: number;
  ref?: RefObject<HTMLInputElement>;
}

// TODO rework it for formik
// Write component that will handle all changes that Formik made through useFormikContext and put it to QS
// Also write initial values initializer from QS

export const useQueryStringSync = (
  config: QSConfig
): ((value: string) => void) => {
  const history = useHistory();

  const delayFunction =
    config.delayBehavior === DelayBehavior.DEBOUNCE ? debounce : throttle;

  return useCallback(
    delayFunction(
      (value: string) => {
        if (config.field) {
          const qs = new URLSearchParams(history.location.search);

          if (value) {
            qs.set(config.field, value);
          } else {
            qs.delete(config.field);
          }

          history.replace(
            history.location.pathname + "?" + qs.toString(),
            history.location.state
          );
        }
      },
      config.delay,
      { leading: false }
    ),
    [history, config.field]
  );
};

export enum InputType {
  INPUT,
  CHECKBOX,
  RADIO,
  SELECT,
}

interface QSInitConfigBase<T> {
  type: InputType;
  field?: string;
  ref: RefObject<T>;
}

interface QSInitConfigInput<T = HTMLInputElement> extends QSInitConfigBase<T> {
  type: InputType.INPUT;
}

interface QSInitConfigCheckbox<T = HTMLInputElement>
  extends QSInitConfigBase<T> {
  type: InputType.CHECKBOX;
}

interface QSInitConfigRadio<T = HTMLInputElement> extends QSInitConfigBase<T> {
  type: InputType.RADIO;
}

interface QSInitConfigSelect<T = HTMLSelectElement>
  extends QSInitConfigBase<T> {
  type: InputType.SELECT;
}

type QSInitConfig =
  | QSInitConfigInput
  | QSInitConfigCheckbox
  | QSInitConfigRadio
  | QSInitConfigSelect;

export const useInitFromQueryString = (config: QSInitConfig): void => {
  const history = useHistory();
  const [isRefInitialised, setIsRefInitialised] = useState(false);

  useEffect(() => {
    if (config.ref?.current?.value && !isRefInitialised) {
      setIsRefInitialised(true);
    }
  }, [isRefInitialised, setIsRefInitialised, config.ref]);

  useEffect(() => {
    if (config.ref?.current && config.field) {
      if (config.ref?.current && config.field) {
        const qs = new URLSearchParams(history.location.search);

        switch (config.type) {
          case InputType.INPUT:
          case InputType.SELECT:
          case InputType.RADIO:
            config.ref.current.value = qs.get(config.field) || "";
            break;

          case InputType.CHECKBOX:
            config.ref.current.checked = !!qs.get(config.field);
            break;
        }
      }
    }
  }, [isRefInitialised, config.field]);
};
