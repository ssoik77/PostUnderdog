import React from 'react';
import { MobileView, BrowserView } from "react-device-detect"
import VacationRequestBrowser from "./VacationRequestBrowser"
import VacationRequestMobile from "./VacationRequestMobile"

const VacationRequest = () => {

  return (
    <>
      <BrowserView>
        <VacationRequestBrowser />
      </BrowserView>
      <MobileView>
        <VacationRequestMobile />
      </MobileView>
    </>
  );
};

export default VacationRequest;