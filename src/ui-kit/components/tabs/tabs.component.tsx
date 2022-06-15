import React, { ReactElement, useState } from "react";
import TabTitle from "./tab-title/tab-title.component";

import "./tabs.styles.scss";


type TabsProps = {
  disabled?: boolean;
  step?: number;
  children: ReactElement[];
  headerPrefix?: string;
}

const Tabs: React.FC<TabsProps> = (
  {
    disabled,
    step,
    children,
    headerPrefix,
  }
): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div className="tabs-pane">
      <div className={`tabs-pane-header ${headerPrefix}`}>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={!disabled ? setSelectedTab : () => {
            }}
            isActive={(step ? step : selectedTab) === index}
          />
        ))}
      </div>
      <div className="tabs-pane__content">
        {children[step ? step : selectedTab]}
      </div>
    </div>
  )
}

export default Tabs
