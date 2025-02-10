import AppBrowser from './AppBrowser'
import AppMobile from './AppMobile'

import {BrowserView, isMobile, MobileView} from 'react-device-detect'


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

