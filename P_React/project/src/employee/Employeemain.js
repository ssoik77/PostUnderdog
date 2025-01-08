import React from "react";
import { Link } from "react-router-dom";
import styles from "./Employeemain.module.css";

const Emp = () => {

    // 팝업 열기 함수
    const openPopup = (e) => {
      e.preventDefault(); // 기본 링크 동작 방지
      const popupFeatures = "width=600,height=400,top=100,left=100,resizable=no,scrollbars=yes";
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
          <Link to="/organization">조직도</Link>
          <Link to="/vacation">휴가 관리</Link>
          <Link to="/fieldwork">외근 관리</Link>
          <Link to="/salary">급여 관리</Link>
        </nav>
        <div className={styles.info}>
          {/* 내 정보 링크 */}
          <a href="/Mypage" onClick={openPopup} className={styles.popupLink}>
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

export default Emp;
