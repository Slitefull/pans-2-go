import { useLayoutEffect } from "react";


const key = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export const initRecaptcha = () => {
  if (document.getElementById("google-recaptcha-v3")) {
    return;
  }
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
  script.id = "google-recaptcha-v3";
  document.body.appendChild(script);
};

export const useRecaptcha = (
  action: string
): ((cb: (token: string) => void) => void) => {
  useLayoutEffect(initRecaptcha, []);

  const verify = (cb: (token: string) => void) => {
    if (!action) {
      throw new Error("No action provided");
    }

    const grecaptcha = window && (window as any).grecaptcha;
    grecaptcha.ready(function () {
      grecaptcha.execute(key, { action }).then(function (token: string) {
        cb(token);
      });
    });
  };

  return verify;
};

export const verify = (action: string, cb: (token: string) => void) => {
  if (!action) {
    throw new Error("No action provided");
  }

  const grecaptcha = window && (window as any).grecaptcha;
  grecaptcha.ready(function () {
    grecaptcha.execute(key, { action }).then(function (token: string) {
      cb(token);
    });
  });
};
