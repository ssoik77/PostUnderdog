import  MypageBrowser from "./MypageBrowser.js"
import  MypageMobile from "./MypageMobile.js"
import React from "react";
import {BrowserView, MobileView} from "react-device-detect"

const Register = () => {
    return (
        <>
        <BrowserView>
        <MypageBrowser />
        </BrowserView>
        <MobileView>
        <MypageMobile />
        </MobileView>
        </>   
        );
};

export default Register;