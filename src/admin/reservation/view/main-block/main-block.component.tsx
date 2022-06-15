import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Tabs from "@/ui-kit/components/tabs/tabs.component";
import Tab from "@/ui-kit/components/tabs/tab/tab.component";
import DashboardImages from "@/admin/reservation/view/main-block/dashboard-images/dashboard-images.component";
import Invoices from "@/admin/reservation/view/main-block/invoices/invoices.component";
import Info from "@/admin/reservation/view/main-block/info/info.component";

import "./main-block.styles.scss";


const MainBlock = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="reservation">
      <Tabs>
        <Tab title={t("admin.info")}>
          <Info/>
        </Tab>
        <Tab title={t("admin.dashboardImages")}>
          <DashboardImages/>
        </Tab>
        <Tab title={t("admin.invoice")}>
          <Invoices/>
        </Tab>
      </Tabs>
    </div>
  )
});

export default MainBlock;
