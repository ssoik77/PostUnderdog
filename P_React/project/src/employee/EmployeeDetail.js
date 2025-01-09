// EmployeeDetail.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmployeeDetail.module.css";

const EmployeeDetail = () => {
  return (
    <div className={styles.emp}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <Link to="/emp">조직도</Link>
          <Link to="/vacation">휴가 관리</Link>
          <Link to="/fieldwork">외근 관리</Link>
          <Link to="/salary">급여 관리</Link>
        </nav>
        <div className={styles.info}>
          <a href="/Mypage" onClick={() => {}} className={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>
      <main className={styles.mainBox}>
        <p>내부 콘텐츠 영역</p>
      </main>
    </div>
  );
};

export default EmployeeDetail;
