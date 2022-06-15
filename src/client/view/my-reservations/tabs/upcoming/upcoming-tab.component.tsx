import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { MY_RESERVATIONS_SERVICE } from "@/common/injector/constants";
import { MyReservationsService } from "@/common/my-reservations/domain/my-reservations.service";
import { ReservationTypes } from "@/common/constants/reservationTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import ReservationUpcoming from "@/client/view/my-reservations/reservations/upcoming/reservation-upcoming.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";


const UpcomingTab: FC = observer((): JSX.Element => {
  const myReservationsService: MyReservationsService = injector.get(MY_RESERVATIONS_SERVICE);

  const onScrollHandler = useCallback(() => {
    myReservationsService.getReservationsOnScroll(ReservationTypes.upcoming)
  }, [myReservationsService])

  useEffect(() => {
    myReservationsService.reset();
    myReservationsService.getMyReservationsByType(ReservationTypes.upcoming)
  }, []);

  return (
    <div className="upcoming-tab">
      <InfiniteScroll
        dataLength={myReservationsService.myReservations.length}
        next={onScrollHandler}
        hasMore={myReservationsService.isHistoryEndReached}
        height={650}
        loader={<RoundLoader inContainer={true}/>}
      >
        {myReservationsService.myReservations.map((reservation) => (
          <ReservationUpcoming selectedReservation={reservation}/>
        ))}
      </InfiniteScroll>
    </div>
  );
});

export default UpcomingTab;
