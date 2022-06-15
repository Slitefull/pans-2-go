import React, { FC, useEffect, useRef, useState } from 'react';
import VerticalDotsIcon from "@/ui-kit/customized-icons/vertical-dots/vertical-dots.component";
import { useOutsideClick } from "@/ui-kit/hooks/use-outsid-click";
import { Row } from "react-table";

import "./options.component.scss";


interface ReservationOption {
  key: string,
  label: string,
  handler: (id: string) => void,
}

interface TableOptionsProps {
  options: Array<ReservationOption>,
  selectedRow: Row;
  isClose?: boolean;
}

const TableOptions: FC<TableOptionsProps> = (
  {
    options,
    selectedRow,
    isClose,
  }
): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onOpenHandler = () => setIsOpen(true);

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    if (isClose) setIsOpen(false);
  }, [isClose])

  return (
    <div
      onClick={onOpenHandler}
      className="table-options-wrapper"
      ref={ref}
    >
      <VerticalDotsIcon
        size={15}
      />
      {isOpen && (
        <div className="table-options">
          {options.map((option) => (
            <div
              className="table-options__element"
              onClick={() => option.handler(selectedRow.values.id)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOptions;
