import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import "./input-label.styles.scss";


interface LabelProps {
  label: string;
  htmlFor?: string;
  className?: string;
}

export const Label: FC<LabelProps> = ({
                                        label,
                                        htmlFor,
                                        children,
                                        className,
                                      }) => {
  const { t } = useTranslation();

  return (
    <label htmlFor={htmlFor} className={className}>
      <div className="inputLabel text-paragraph-sm">{t(label)}</div>
      {children}
    </label>
  );
};
