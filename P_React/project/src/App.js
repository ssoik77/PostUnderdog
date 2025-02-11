
import React from 'react';
import {MobileView, BrowserView} from "react-device-detect"
import AppBrowser from "./AppBrowser"
import AppMobile from "./AppMobile"

const App = () => {
  return (
    <>
    <BrowserView>
    <AppBrowser/>
    </BrowserView>
    <MobileView>
    <AppMobile/>
    </MobileView>
    </>
  );
};

export default App;

