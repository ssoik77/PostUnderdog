import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "../register/Register";
import Find from "../find/Find";
import Main from "../main/Main";
import Mypage from "../mypage/Mypage";
import ProductList from "../product/ProductList"
import ProductEdit from "../product/ProductEdit";
import ProductAdd from "../product/ProductAdd";
import EmployeeManage from "../employee/EmployeeManage";
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
          <Route path="/productList" element={<ProductList/>} />
          <Route path="/productEdit" element={<ProductEdit />}/>
          <Route path="/ProductAdd" element={<ProductAdd/>}/>
          <Route path="/employeemanage" element={<EmployeeManage />} />
        </Routes>
      </Router>
    );
  }

  export default AppRouter;