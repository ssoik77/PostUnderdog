import React from 'react';
import { MobileView, BrowserView } from 'react-device-detect';
import EmployeeAddMobileView from './EmployeeAddMobile.js';
import EmployeeAddBrowserView from './EmployeeAddBrowser.js';

const EmployeeAdd = () => {
    return(
        <>
            <BrowserView>
                <EmployeeAddBrowserView />
            </BrowserView>

            <MobileView>
                <EmployeeAddMobileView />
            </MobileView>
        </>
    )
};

export default EmployeeAdd;