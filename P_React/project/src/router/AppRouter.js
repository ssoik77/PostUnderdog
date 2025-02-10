import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import App from "../App";
import Register from "../register/Register"
import Find from "../find/Find"
import Mypage from "../mypage/Mypage"
import VacationRequest from "../vacation/VacationRequest"
import VacationApproval from "../vacation/VacationApproval";
import VacationConfirm from "../vacation/VacationConfirm";
import EmployeeAdd from '../vacation/EmployeeAdd'

function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element= {<App/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/find" element={<Find/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/vacationrequest" element={<VacationRequest/>} />
          <Route path="/vacationapproval" element={<VacationApproval/>}/>
          <Route path="/vacationConfirm" element={<VacationConfirm/>}/>
          <Route path="/employeeadd" element={<EmployeeAdd/>} />
        </Routes>
      </Router>
    );
  }

  export default AppRouter;