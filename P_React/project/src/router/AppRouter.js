import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "../register/Register"
import App from "../App";
import Find from "../find/Find"; // Find 페이지 추가

function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element= {<App/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/find" element={<Find/>} /> {/* 라우팅 추가 */}
        </Routes>
      </Router>
    );
  }

  export default AppRouter;