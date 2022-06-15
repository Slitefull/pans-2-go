import React, { useCallback } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { injector } from "@/common/injector/Injector";
import { HISTORY } from "@/common/injector/constants";
import { RESERVE_NOW_PAGE } from "@/common/constants/routes";
import Tabs from "@/ui-kit/components/tabs/tabs.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import UpcomingTab from "@/client/view/my-reservations/tabs/upcoming/upcoming-tab.component";
import PastTab from "@/client/view/my-reservations/tabs/past/past-tab.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import { History } from "history";
import { IconSvg } from "@/ui-kit/components/icon-svg/icon-svg.component";

import './my-reservations.styles.scss'


const MyReservations = observer(() => {
  const { t } = useTranslation();
  const history: History = injector.get(HISTORY);

  const onNewReservationHandler = useCallback(() => {
    history.push(RESERVE_NOW_PAGE)
  }, [history])

  return (
    <PageWrapper title="Reservation List" withClientHeader>
      <div className="my-reservations">
        <Tabs>
          <Tab title={t("client.upcoming")}>
            <div
              className="new-reservation"
              onClick={onNewReservationHandler}
            >
              <IconSvg name="plus"/> {t("client.newReservation")}
            </div>
            <UpcomingTab/>
          </Tab>
          <Tab title={t("client.past")}>
            <div
              className="new-reservation"
              onClick={onNewReservationHandler}
            >
              <IconSvg name="plus"/> {t("client.newReservation")}
            </div>
            <PastTab/>
          </Tab>
        </Tabs>
      </div>
    </PageWrapper>
  )
})

export default MyReservations;
