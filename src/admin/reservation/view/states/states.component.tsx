import React, { FC } from "react";
import { observer } from "mobx-react";
import { StepperLine } from "@/ui-kit/components/stepper-line/stepper-line.component";
import { useTranslation } from "react-i18next";

import "./states.styles.scss";


const States: FC<any> = observer((param: { children: { status: string, reject: boolean, currentStep: number, approveStatuses: any[], cancelStatuses: any[], rejectStatuses: any[] } }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div style={{ height: param.children.status ? '450px' : param.children.reject ? '15%' : '300px' }} className="state">
      {param.children.status ? <StepperLine
        currStep={param.children.currentStep}
        activeStepsArr={param.children.approveStatuses}
        height={'500px'}
        steps={[
          {
            title: t("admin.new"),
            description: 'Created by customer',
          },
          {
            title: t("admin.approved"),
            description: '',
          },
          {
            title: t("admin.linkCar"),
            description: 'Approved by admin',
          },
          {
            title: t("admin.pickUp"),
            description: 'Scheduled',
          },
          {
            title: t("admin.dropOff"),
            description: 'Scheduled',
          },
          {
            title: t("admin.close"),
            description: '',
          },
          {
            title: t("admin.getPaid"),
            description: '',
          }
        ]}
      /> : param.children.reject ? <StepperLine
        currStep={param.children.currentStep}
        activeStepsArr={param.children.rejectStatuses}
        height={'110px'}
        steps={[
          {
            title: t("admin.new"),
            description: '',
          },
          {
            title: t("admin.rejected"),
            description: '',
          },
        ]}
      /> : <StepperLine
          currStep={param.children.currentStep}
          activeStepsArr={param.children.cancelStatuses}
          height={'310px'}
          steps={[
            {
              title: t("admin.new"),
              description: 'Created by customer',
            },
            {
              title: t("admin.approved"),
              description: '',
            },
            {
              title: t("admin.linkCar"),
              description: 'Approved by admin',
            },
            {
              title: t("admin.cancel"),
              description: '',
            }
          ]}
      />}
    </div>
  );
});

export default States;
