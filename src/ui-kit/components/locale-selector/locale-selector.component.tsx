import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { LocaleOption } from "./switch-locale.component";


interface LocaleSelectorProps {
  className: string;
}

const LocaleSelectorComponent: React.FC<LocaleSelectorProps> = (props) => {
  const { className } = props;
  const { i18n } = useTranslation();

  const switchHandler = useCallback(
    (e) => {
      i18n.changeLanguage(e.target.value);
    },
    [i18n]
  );

  return (
    <select
      className={className}
      value={i18n.language.split("-")[0]}
      onChange={switchHandler}
    >
      <LocaleOption lang="en" title="english"/>
      <LocaleOption lang="ru" title="русский"/>
      <LocaleOption lang="ua" title="українська"/>
    </select>
  );
};

export default LocaleSelectorComponent;
