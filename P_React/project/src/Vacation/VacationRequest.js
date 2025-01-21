import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./VacationRequest.module.css";

const Employeemain = () => {
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
      .get("http://localhost:8080/underdog/employees") // API 호출 경로
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
    <div className={styles.emp}>

      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>

        <nav className={styles.nav}>
          <Link to="/vacationapproval">휴가 승인</Link>
        </nav>

        <div className={styles.info}>
          <a href="/Mypage" onClick={openPopup} className={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>

      <main className={styles.mainContainer}>
        <div className={styles.teamBox}>
        </div>

        <div className={styles.mainBox}>
          <section className={styles.organizationChart}>

          </section>
        </div>

      </main>
    </div>
  );
};

export default Employeemain;
