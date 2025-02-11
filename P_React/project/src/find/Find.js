import React from "react";
import FindBrowser from "./FindBrowser"
import FindMobile from "./FindMobile"
import { MobileView, BrowserView } from 'react-device-detect'

const Find = () => {
    return (
        <>
            <BrowserView>
                <FindBrowser />
            </BrowserView>
            <MobileView>
                <FindMobile />
            </MobileView>
        </>
    );
};

export default Find;
