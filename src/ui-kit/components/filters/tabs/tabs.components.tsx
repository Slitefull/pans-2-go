import React, { FC } from 'react';
import { observer } from "mobx-react";

import "./tabs.styles.scss";


interface FilterTabsProps {
  options: Array<Option>,
  selectedFilter: string,
  onChooseFilterHandler: (selectedFilter: string) => void,
}

interface Option {
  key: string,
  name: string,
  count: number,
}

const FilterTabs: FC<FilterTabsProps> = observer((
  {
    options,
    selectedFilter,
    onChooseFilterHandler
  }): JSX.Element => {
  return (
    <div className="filter-tabs">
      {options.map((option) => (
        <div
          key={option.key}
          className={`filter-tabs__element ${option.key === selectedFilter ? "active" : ""}`}
          onClick={() => onChooseFilterHandler(option.key)}
        >
          {`${option.name} (${option.count})`}
        </div>
      ))}
    </div>
  );
});

export default FilterTabs;
