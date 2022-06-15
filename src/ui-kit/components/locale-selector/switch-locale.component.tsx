import React from "react";


interface SwitchLocaleProps {
  lang: string;
  title: string;
}

export const LocaleOption: React.FC<SwitchLocaleProps> = ({
                                                            lang,
                                                            title,
                                                          }): JSX.Element => {
  return <option value={lang}>{title}</option>;
};
