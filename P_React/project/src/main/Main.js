import React, { useEffect } from 'react';
import styles from './Main.module.css';
import '../mypage/Mypage.js';

const Main = () => {
  //로그인 지속 여부
  const locationLogin = localStorage.getItem("m_id");
  const sessionLogin = sessionStorage.getItem("m_id");
  // 내 정보 팝업 열기 함수
  const openPopup = () => {
    const popupFeatures = "width=500,height=350,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("../Mypage", "내 정보", popupFeatures);
  };
  
  // 상품 관리 페이지로 이동
  const goToProductManage = () => {
    window.location.href = "/productmanage"; // 페이지 이동
  };

  useEffect(()=>{
    if(!locationLogin && !sessionLogin){
      window.location.href="../";
    }
  },[locationLogin, sessionLogin])
  

  return (
    <div>
      <header className={styles.header}>
        <h1>POST UNDERDOG</h1>
      </header>
      {/* 내 정보 팝업 버튼 */}
      <button id={styles.infoButton} onClick={openPopup} className={styles.button}>
        내 정보
      </button>

      {/* 상품 관리 페이지 이동 버튼 */}
      <button id={styles.productManageButton} onClick={goToProductManage} className={styles.button}>
        상품 관리 페이지
      </button>

    </div>
  );
};

export default Main;
