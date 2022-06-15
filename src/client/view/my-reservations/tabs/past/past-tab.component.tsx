import React, { FC, useCallback, useEffect } from 'react';
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { MY_RESERVATIONS_SERVICE } from "@/common/injector/constants";
import { ReservationTypes } from "@/common/constants/reservationTypes";
import { MyReservationsService } from "@/common/my-reservations/domain/my-reservations.service";
import ReservationPast from "@/client/view/my-reservations/reservations/past/reservation-past.component";
import RoundLoader from "@/ui-kit/components/loaders/round/round-loader.component";
import InfiniteScroll from "react-infinite-scroll-component";


const PastTab: FC = observer((): JSX.Element => {
  const myReservationsService: MyReservationsService = injector.get(MY_RESERVATIONS_SERVICE);

  const onScrollHandler = useCallback(() => {
    myReservationsService.getReservationsOnScroll(ReservationTypes.past)
  }, [myReservationsService])

  useEffect(() => {
    myReservationsService.reset();
    myReservationsService.getMyReservationsByType(ReservationTypes.past)
  }, [])

  return (
    <div className="past-tab">
      <InfiniteScroll
        dataLength={myReservationsService.myReservations.length}
        next={onScrollHandler}
        hasMore={myReservationsService.isHistoryEndReached}
        height={650}
        loader={<RoundLoader/>}
      >
        {myReservationsService.myReservations.map((reservation) => (
          <ReservationPast selectedReservation={reservation}/>
        ))}
      </InfiniteScroll>
    </div>
  );
});

export default PastTab;
