import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "../register/Register";
import Find from "../find/Find";
import Main from "../main/Main";
import Mypage from "../mypage/Mypage";
import ProductManage from "../product/ProductManage";
import ProductAdd from "../product/ProductAdd";
import EmployeeManage from "../employee/EmployeeManage";
import HelpManage from "../help/HelpManage";
import App from "../App";

function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element= {<App/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/find" element={<Find/>} />
          <Route path="/main" element={<Main/>} />
          <Route path="/mypage" element={<Mypage/>} />
          <Route path="/productmanage" element={<ProductManage />}/>
          <Route path="/ProductAdd" element={<ProductAdd/>}/>
          <Route path="/employeemanage" element={<EmployeeManage />} />
          <Route path="/helpmanage" element={<HelpManage/>}/>

        </Routes>
      </Router>
    );
  }

  export default AppRouter;