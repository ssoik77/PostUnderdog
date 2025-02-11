import  RegisterBrowser from "./RegisterBrowser"
import  RegisterMobile from "./RegisterMobile"
import React from "react";
import {BrowserView, MobileView} from "react-device-detect"

const Register = () => {



    return (
        <>
        <BrowserView>
        <RegisterBrowser/>
        </BrowserView>
        <MobileView>
        <RegisterMobile/>
        </MobileView>
        </>   
         );
};

export default Register;