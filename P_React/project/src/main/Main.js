import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Main.module.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/underdog";

const Main = () => {
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const checkSession = async () => {
      const loggedInUser = sessionStorage.getItem("m_id") || localStorage.getItem("m_id");

      if (!loggedInUser) {
        console.log("로그인 정보가 없습니다.");
        navigate("/"); // 로그인되지 않은 경우 App.js로 이동
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/userinfo`, { withCredentials: true });
        if (!response.data.userId) {
          console.log("서버 응답에서 로그인되지 않은 사용자입니다.");
          navigate("/"); // 서버에서 로그인 상태 확인 실패
        }
      } catch (error) {
        console.error("세션 확인 중 오류 발생:", error);
        navigate("/"); // 오류 발생 시 로그인 페이지로 이동
      }
    };

    checkSession();
  }, [navigate]);

  // 팝업 열기 함수
  const openPopup = (e) => {
    e.preventDefault(); // 기본 링크 동작 방지
    const popupFeatures = "width=600,height=400,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <Link to="/employeemain">직원 관리</Link>
          <Link to="/prod">상품 관리</Link>
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

export default Main;
