import React from 'react';
import { MobileView, BrowserView } from "react-device-detect"
import DispatchBrowser from "./DispatchBrowser"
import DispatchMobile from "./DispatchMobile"

const VacationRequest = () => {

  return (
    <>
      <BrowserView>
        <DispatchBrowser />
      </BrowserView>
      <MobileView>
        <DispatchMobile />
      </MobileView>
    </>
  );
};

export default VacationRequest;