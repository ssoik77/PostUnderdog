import React from 'react';
import {MobileView, BrowserView} from 'react-device-detect'
import VacationApprovalBrowser from './VacationApprovalBrowser'
import VacationApprovalMobile from './VacationApprovalMobile'

const VacationApproval = () => {
  return (
    <>
    <BrowserView>
    <VacationApprovalBrowser/>
    </BrowserView>
    <MobileView>
    <VacationApprovalMobile/>
    </MobileView>
    </>
  );
};

export default VacationApproval;
