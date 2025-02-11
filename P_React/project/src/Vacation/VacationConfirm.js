import React, { useEffect, useState } from "react";
import {MobileView, BrowserView} from "react-device-detect"
import VacationConfirmBrowser from "./VacationConfirmBrowser"
import VacationConfirmMobile from "./VacationConfirmMobile"
const VacationConfirm = () => {
  

  return (
   <>
   <BrowserView>
   <VacationConfirmBrowser/>
   </BrowserView>
   <MobileView>
    <VacationConfirmMobile/>
   </MobileView>
   </>
  );
};

export default VacationConfirm;
