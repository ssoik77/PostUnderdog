import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from "../register/Register"
import App from "../App";

function AppRouter() {
    return (
      <Router>
        <Routes>
            <Route path="/" element= {<App/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    );
  }

  export default AppRouter;