import React, { useCallback } from "react"


type TabTitleProps = {
  title: string
  index: number
  setSelectedTab: (index: number) => void,
  isActive: boolean,
}

const TabTitle: React.FC<TabTitleProps> = ({ title, setSelectedTab, index, isActive }) => {
  const onClickHandler = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
    <div
      className={`tabs-pane-header__element ${isActive ? "active" : ""}`}
      onClick={onClickHandler}
    >
      {title}
    </div>
  )
}

export default TabTitle
