import React, { FC, useCallback } from 'react';
import Select from "react-select";
import { CarStatusesForUpdate } from "@/common/constants/carStatusesForUpdate";
import { CarService } from "@/common/car/domain/car.service";
import { injector } from "@/common/injector/Injector";
import { CAR_SERVICE } from "@/common/injector/constants";


type SelectValue<L = string, V = CarStatusesForUpdate> = {
  label: L,
  value: V,
}

interface StatusSelectProps {
  carId: string;
  status: CarStatusesForUpdate;
  options: Array<SelectValue>;
}

const StatusSelect: FC<StatusSelectProps> = (
  {
    carId,
    status,
    options
  }
): JSX.Element => {
  const carService: CarService = injector.get(CAR_SERVICE);

  const getBackground = (status: string): string => {
    switch (status) {
      case CarStatusesForUpdate.Active:
        return '#339933';

      case CarStatusesForUpdate.Available:
        return '#265DE3';

      case CarStatusesForUpdate.Pending:
        return '#333333';

      case CarStatusesForUpdate.Returned:
        return '#919191';

      default:
        return '#339933';
    }
  };

  const customStyles = {
    option: () => ({
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.035em',
      color: '#333333',
      margin: '10px 0 10px 15px',
    }),
    control: () => ({
      display: 'flex',
      alignItems: 'center',
      padding: "10px 5px",
      transition: '1s',
      background: getBackground(status),
      border: "1px solid #E0E0E0",
      borderRadius: 15,
      cursor: 'pointer',
      outline: 'none',
      height: '30px',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: 12,
      color: '#333333',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: 12,
      color: '#FFFFFF',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      fontSize: 12,
      color: '#FFFFFF',
    })
  }

  const defaultValue: SelectValue = { label: status, value: status };

  const onChangeHandler = useCallback((status: CarStatusesForUpdate) => {
    carService.updateCarStatus({ carId, status });
  }, []);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Select
        styles={customStyles}
        options={options}
        onChange={(option) => onChangeHandler(option!.value)}
        defaultValue={defaultValue}
        isSearchable={false}
      />
    </div>
  );
};

export default StatusSelect;
