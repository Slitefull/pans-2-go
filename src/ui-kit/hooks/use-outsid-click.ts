import React, { useEffect } from "react";


const OUTSIDE_CLICK_EVENT = "OUTSIDE_CLICK_EVENT";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = (
    event: React.MouseEvent<HTMLHtmlElement, MouseEvent>
  ) => {
    if (ref?.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("click", handleClick);
    document.addEventListener(
      OUTSIDE_CLICK_EVENT,
      handleClick as unknown as EventListener
    );

    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClick);
      document.removeEventListener(
        OUTSIDE_CLICK_EVENT,
        handleClick as unknown as EventListener
      );
    };
  });
};

export const stopPropagation = (
  event: React.MouseEvent<HTMLElement, MouseEvent>
) => {
  event.stopPropagation();
  event.target.dispatchEvent(
    new Event(OUTSIDE_CLICK_EVENT, {
      bubbles: true,
      cancelable: false,
    })
  );
};
