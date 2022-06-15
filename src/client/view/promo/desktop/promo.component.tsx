import React, { FC } from 'react';
import Header from "@/client/view/promo/desktop/components/header/header.component";
import Main from "@/client/view/promo/desktop/components/main/main.component";
import Info from "@/client/view/promo/desktop/components/info/info.component";
import Footer from "@/client/view/promo/desktop/components/footer/footer.component";


const PromoDesktop: FC = (): JSX.Element => {
  return (
    <>
      <Header/>
      <Main/>
      <Info/>
      <Footer/>
    </>
  );
};

export default PromoDesktop;
