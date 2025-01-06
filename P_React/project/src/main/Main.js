import React from 'react';
import styles from './Main.module.css';
import '../mypage/Mypage.js';

const Main = () => {
  const memberInfo = (JSON.parse(sessionStorage.getItem("authority")))[0];

  // 내 정보 팝업 열기 함수
  const openPopup = () => {
    const popupFeatures = "width=800,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("../Mypage", "내 정보", popupFeatures);
  };

  // 직원 관리 페이지로 이동
const goToEmployeeManage = () => {
  window.location.href = "/Employeemanage"; // 페이지 이동
};

  // 상품 관리 페이지로 이동
  const goToProductManage = () => {
    window.location.href = "/productmanage"; // 페이지 이동
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>POST UNDERDOG</h1>
      </header>
      {/* 내 정보 팝업 버튼 */}
      <button id={styles.infoButton} onClick={openPopup} className={styles.button}>
        내 정보
      </button>

      {/* 직원 관리 페이지 이동 버튼 */}
      <button id={styles.EmployeeManageButton} onClick={goToEmployeeManage} className={styles.button}>
        직원 관리 페이지
      </button>

      {/* 상품 관리 페이지 이동 버튼 */}
      <button id={styles.productManageButton} onClick={goToProductManage} className={styles.button}>
        상품 관리 페이지
      </button>

    </div>
  );
};

export default Main;
