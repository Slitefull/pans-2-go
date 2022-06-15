import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { injector } from "@/common/injector/Injector";
import { CARS_SERVICE, NOTIFICATION_SERVICE, RESERVATION_SERVICE } from "@/common/injector/constants";
import { useParams } from 'react-router-dom';
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import CustomerCard from "@/admin/reservation/view/customer-card/customer-card.component";
import MainBlock from "@/admin/reservation/view/main-block/main-block.component";
import PageWrapper from "@/ui-kit/components/page-wrapper/page-wrapper.component";
import States from "@/admin/reservation/view/states/states.component";
import { Button } from "@/ui-kit/components/button/button.component";
import { CarsService } from "@/admin/cars/domain/cars.service";
import { mergeDateTime } from "@/common/helpers/mergeDateTime";
import { NotificationService } from "@/infrastructure/notification/notification.service";
import { ReservationStatuses } from "@/common/constants/reservationStatuses";

import "./reservation.styles.scss";


const Reservation = observer(() => {
  const { id } = useParams() as any;
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);
  const notificationService: NotificationService = injector.get<NotificationService>(NOTIFICATION_SERVICE);
  const carsService: CarsService = injector.get(CARS_SERVICE);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(true);
  const [reject, setReject] = useState<boolean>(true);
  const [showReject, setShowReject] = useState<boolean>(true);
  const [hideBtns, setHideBtns] = useState<boolean>(true);
  const [hideStatuses, setHideStatuses] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<string>('');
  const approveStatuses: any[] = [{
    number: 0,
    title: 'New'
  }, {
    number: 1,
    title: 'Approved'
  }, {
    number: 2,
    title: 'Upcoming'
  }, {
    number: 3,
    title: 'Active'
  }, {
    number: 4,
    title: 'Finished'
  }, {
    number: 5,
    title: 'Closed'
  }, {
    number: 6,
    title: 'Paid'
  }];
  const cancelStatuses: any[] = [{
    number: 0,
    title: 'New',
  }, {
    number: 1,
    title: 'Approved'
  }, {
    number: 2,
    title: 'Upcoming'
  }, {
    number: 3,
    title: 'Cancelled'
  }];
  const rejectStatuses: any[] = [
    {
      number: 0,
      title: 'New'
    }, {
      number: 1,
      title: 'Rejected'
    }];

  const changeStatusCancel = () => {
    reservationService.updateReservation(id, { status: 'Cancelled', timeZone: new Date().getTimezoneOffset() / 60 });
    setCurrentStep(3);
    setStatus(false);
    setReject(false);
    setHideBtns(true);
  };

  const changeStatusReject = () => {
    setStatus(false);
    reservationService.updateReservation(id, { status: 'Rejected', paymentStatus: 'Rejected', timeZone: new Date().getTimezoneOffset() / 60 });
    goNextStep();
    setHideBtns(true);
    if (currentStep > 0) {
      setCurrentStep(1);
    }
  };

  const changeStatusApprove = () => {
    setStatus(true);
    setReject(false);
    reservationService.updateReservation(id, { status: 'Approved', paymentStatus: 'AwaitingPayment', timeZone: new Date().getTimezoneOffset() / 60 });
    // reservationService.changeReservationStatus(id, 'Approved');
    goNextStep();
    if (currentStep > 0) {
      setCurrentStep(1);
    }
  };

  const changeStatus = () => {
    if (status && currentStep !== approveStatuses.length - 2 && currentStep !== 3 && currentStep !== 1) {
      reservationService.changeReservationStatus(id, approveStatuses.find((status) => status.number === currentStep + 1).title);
      goNextStep();
    }

    if (status && currentStep === 1 && reservationService.selectedCar) {
      reservationService.updateReservation(id, { carId: reservationService.selectedCar, status: 'Upcoming', timeZone: new Date().getTimezoneOffset() / 60 })
        .then(() => goNextStep()).catch(() => {
      });
    } else if (status && currentStep === 1 && !reservationService.selectedCar) {
      notificationService.notify({
        message: 'Please select car!',
        status: "error",
      })
    }

    if (status && currentStep === 3) {
      reservationService.updateReservation(id, { status: 'Past', timeZone: new Date().getTimezoneOffset() / 60 });
      // reservationService.changeReservationStatus(id, ReservationStatuses.Past);
      goNextStep();
    }

    if (currentStep === approveStatuses.length - 2) {
      reservationService.updateReservation(id, { status: 'Past', paymentStatus: 'Paid', timeZone: new Date().getTimezoneOffset() / 60 });
      goNextStep();
    }
  };

  const goNextStep = () => {
    const nextStep = currentStep + 1;
    if ((nextStep <= 6 && status) || (nextStep <= 1 && !status)) {
      setCurrentStep(nextStep);
    }
    if (nextStep > 2 && status) {
      setShowReject(false);
    }
  };

  const getReservation = useCallback(() => {
    if (id) {
      reservationService.getReservation(id).then((res) => {
        setHideStatuses(false);
        if (res.status === 'Past') {
          setCurrentStep(4);
          setShowReject(false);
          setHideBtns(false);
        } else if (res.status === 'Cancelled') {
          setCurrentStep(3);
          setReject(false);
          setHideBtns(true);
        } else if (res.status === 'Rejected') {
          setCurrentStep(1);
          setReject(true);
          setHideBtns(true);
        } else {
          const currentApproveStatusNumber = approveStatuses.find((status) => status.title === res.status)?.number;
          const currentRejectStatusNumber = rejectStatuses.find((status) => status.title === res.status)?.number;

          setCurrentStep(
            (currentApproveStatusNumber) ?
              currentApproveStatusNumber :
              currentRejectStatusNumber
          );

          if (currentApproveStatusNumber > 2) {
            setShowReject(false);
          }

          setReject(false);
          setHideBtns(false);
        }

        carsService.startDate = mergeDateTime(reservationService.pickUpDate, reservationService.pickUpTime);
        carsService.endDate = mergeDateTime(reservationService.dropOffDate, reservationService.dropOffTime);
        carsService.reservationId = id;

        if (res.paymentStatus === 'Paid') {
          setCurrentStep(approveStatuses.length - 1);
        }

        setCategoryId(carsService.carCategories.find((category) => category.title.split(/\s+/)
          .map((word) => word[0].toUpperCase() + word.substring(1))
          .join('') === res.carType)?.id as string);

        (approveStatuses.find((status) => status.title === res.status)?.number || res.status === 'Past') ? setStatus(true) : setStatus(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (res.status === 'New') {
          setReject(true);
          setStatus(true);
        }
      });
    }
  }, []);

  const getCars = useCallback(() => {
    carsService.getAllCategories();
    if (reservationService.selectedCarType.label === 'AnyWheels') {
      carsService.getCarsWithFilters();
    } else if (reservationService.selectedCarType.id) {
      carsService.getCarsByCategory(reservationService.selectedCarType.id, mergeDateTime(reservationService.pickUpDate, reservationService.pickUpTime), mergeDateTime(reservationService.dropOffDate, reservationService.dropOffTime), id);
    }
  }, []);

  useEffect(() => {
    getReservation();
    getCars();
  }, [categoryId])

  return (
    <PageWrapper title="Reservation" withSidebar={true}>
      <div className="reservation-btns">
        {(!hideBtns) ? (currentStep === 0 || currentStep > 0 && status) ?
          (showReject ? (reject ? <Button className="reservation-btn" children="Reject" onClick={changeStatusReject}/> :
            <Button className="reservation-btn" children="Cancel" onClick={changeStatusCancel}/>) : <div></div>) :
          <Button className="reservation-btn" children="Save" onClick={changeStatus}/> : null}
        {(!hideBtns) ? (currentStep === 0 || currentStep > 0 && !status) ?
          <Button className="reservation-btn black" children="Approve & Schedule" onClick={changeStatusApprove}/> :
          <Button className="reservation-btn black" children="Save" onClick={changeStatus}/> : null}
      </div>
      <div className="reservation-page row">
        <MainBlock/>
        <div className="right-side-block">
          {(!hideStatuses) ? <States
            children={{ status, reject, currentStep, approveStatuses, cancelStatuses, rejectStatuses }}/> : null}
          <CustomerCard/>
        </div>
      </div>
    </PageWrapper>
  )
});

export default Reservation;
