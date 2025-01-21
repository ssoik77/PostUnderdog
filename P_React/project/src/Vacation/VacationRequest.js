import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VacationApproval"
import { Link, useNavigate } from "react-router-dom";
import styles from "./VacationRequest.module.css";

const VacationRequest = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if(!loginId){
      navigate("/"); 
    }
  },[navigate])

  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/employee") // API 호출 경로
      .then((response) => {
    
      })
      .catch((error) => {
        console.error("Error fetching Employee data:", error);
      });
  }, []);

  

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=700,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  return (
    <div id={styles.emp}>

      <header id={styles.header}>
        <div id={styles.logo}>
          <img src="/logo.png" alt="Logo" id={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>

        <nav id={styles.nav}>
          <Link to="/vacationapproval">휴가 승인</Link>
          <Link to="/employeeadd">직원 추가</Link>
        </nav>

        <div id={styles.info}>
          <a href="/Mypage" onClick={openPopup} id={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>

      <main id={styles.mainContainer}>

        <div id={styles.employeeBox}>
        </div>

        <div id={styles.mainBox}>


        </div>

      </main>

    </div>
  );
};

export default VacationRequest;
