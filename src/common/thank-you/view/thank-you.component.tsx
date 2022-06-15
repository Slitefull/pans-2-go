import React, { FC } from 'react';
import { ThankYouService } from "@/common/thank-you/domain/thank-you.service";
import { injector } from "@/common/injector/Injector";
import { APP_SERVICE, THANK_YOU_SERVICE } from "@/common/injector/constants";
import { AppService } from "@/common/app/domain/app.service";
import { ROOT_PAGE } from "@/common/constants/routes";

import "./thank-you.styles.scss"


const ThankYouPage: FC = (): JSX.Element => {
  const appService: AppService = injector.get(APP_SERVICE);
  const thankYouService: ThankYouService = injector.get(THANK_YOU_SERVICE);

  const isEmpty = thankYouService.title === '' && thankYouService.subTitle === '';

  if (isEmpty) appService.redirectTo(ROOT_PAGE);

  return (
    <div className="thank-you">
      <p className="thank-you__title">
        {thankYouService.title}
      </p>
      <p className="thank-you__subtitle">
        {thankYouService.subTitle}
      </p>
      <button
        className="thank-you__button"
        onClick={thankYouService.buttonHandler!}
      >
        {thankYouService.buttonText}
      </button>
    </div>
  );
};

export default ThankYouPage;
