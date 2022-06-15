import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import ModalFullScreen from "@/ui-kit/components/modal/modal-full-screen.component";
import ArrowBackIcon from "@/ui-kit/customized-icons/arrow/arrow-back.component";
import CustomAutocomplete from "@/ui-kit/components/autocomplete/autocomplete.component";
import { StatesData } from "@/client/view/reserve-now/desktop/const/states-const";
import { AllowedAreasValues } from "@/common/constants/allowedAreas";
import { injector } from "@/common/injector/Injector";
import { RESERVATION_SERVICE } from "@/common/injector/constants";
import { ReservationService } from "@/common/reservation/domain/reservation.service";
import { Button } from "@/ui-kit/components/button/button.component";

import './autocomplete-area.styles.scss';


interface AutoCompleteAreaMobileProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
}

const AutoCompleteAreaMobile: FC<AutoCompleteAreaMobileProps> = (
  {
    isOpen,
    setIsOpen,
    region,
    setRegion,
  }
): JSX.Element => {
  const reservationService: ReservationService = injector.get(RESERVATION_SERVICE);

  const onBackHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalFullScreen
      isOpen={isOpen}
      classPrefix="autocomplete-area-mobile"
      header={
        <div className="link-arrow" onClick={onBackHandler}>
          <ArrowBackIcon color="#000000" size={20}/>
          <p className="link-arrow__text">
            Choose Region
          </p>
        </div>
      }
      body={
        <div className="region-dropdown__wrapper">
          <CustomAutocomplete
            items={StatesData()}
            value={region}
            onChangeHandler={val => setRegion(val)}
            isDisabled={reservationService.area !== AllowedAreasValues.outNY}
            placeholder="State, city"
          />
        </div>
      }
      footer={
        <Button
          type="button"
          color="primary"
          className="autocomplete-save-button"
          onClick={onBackHandler}
        >
          SAVE
        </Button>
      }
    />
  )
};

export default AutoCompleteAreaMobile;
