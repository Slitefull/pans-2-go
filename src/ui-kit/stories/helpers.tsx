import React, { FC, Suspense } from "react";
import { HashRouter } from "react-router-dom";

import "../../infrastructure/injector/injectAllApp";
import "../../infrastructure/injector/injectAllAdmin";
import "../../infrastructure/i18n";
import LocaleSelectorComponent from "../../ui-kit/components/locale-selector/locale-selector.component";
import { Notifications } from "@/infrastructure/notification/components/notifications.component";
import { SuspenseLoader } from "@/ui-kit/components/suspense-loader/suspense-loader.component";


interface Props {
  width: number;
  backgroundColor?: string;
  height?: number;
}

export const Container: FC<Props> = ({
                                       children,
                                       width,
                                       backgroundColor,
                                       height,
                                     }) => {
  return (
    <Suspense fallback={<SuspenseLoader/>}>
      <div
        style={{
          backgroundColor: backgroundColor || "rgba(246, 244, 237, 1)",
          paddingTop: 25,
          paddingBottom: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          height: height || "auto",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <LocaleSelectorComponent className="wqe"/>
        </div>
        <div style={{ width: width }}>
          <HashRouter>{children}</HashRouter>
        </div>
      </div>
      <Notifications/>
    </Suspense>
  );
};
