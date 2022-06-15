import React from 'react'


type TabProps = {
  title: string;
  stepNumber: number;
}

const ReserveNowTab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ReserveNowTab;
