import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "../register/Register"
import Find from "../find/Find"
import Mypage from "../mypage/Mypage"
import Employeemain from "../employee/Employeemain"
import App from "../App";
import Vacation from '../employee/Vacation';

function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element= {<App/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/find" element={<Find/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/vacation" element={<Vacation/>} />
          <Route path="/employeemain" element={<Employeemain/>} />
        </Routes>
      </Router>
    );
  }

  export default AppRouter;