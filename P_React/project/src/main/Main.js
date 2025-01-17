import React, { useEffect } from 'react';
import styles from './Main.module.css';
import logo from '../logo.png'
import '../mypage/Mypage.js';

const Main = () => {
  //로그인 아이디 담는 객체
  const keepLogin = localStorage.getItem("m_id") || sessionStorage.getItem("m_id");

  // json 형식의 권한 데이터를 객체로 푸는 작업 
const authority = JSON.parse(localStorage.getItem("authority")|| sessionStorage.getItem("authority"));

// 권한 데이터 변수에 할당
const { a_authority, p_authority, e_authority } = authority;

  // 내 정보 팝업 열기 함수
  const openPopup = () => {
    const popupFeatures = "width=500,height=350,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("../Mypage", "내 정보", popupFeatures);
  };
  
  
  // 직원 관리 페이지로 이동
  const goToEmployeeManage = () => {
    window.location.href = "/Employeemanage"; // 페이지 이동
  };

  // 상품 관리 페이지로 이동
  const goToProductManage = () => {
    if(a_authority || p_authority){
      window.location.href = "/productEdit"; // 페이지 이동
    }else{
      window.location.href = "/productList"; // 페이지 이동
    }
  };
  
  // 로그인 아이디 로컬,세션 스토리지에서 삭제되면 로그인 페이지로 이동  
  useEffect(()=>{
    if(!keepLogin){
      window.location.href="../";
    }
  },[keepLogin])

  return (
    <div id={styles.mainBox}>
      <header id={styles.mainHeader}>
        <div id={styles.brand}>
        <img id={styles.logo} src={logo} alt='로고'/>
        <h1 id={styles.brandName}>POST UNDERDOG</h1>
        </div>
        <div></div>
        <div id={styles.info}>
          <button id={styles.infoButton} onClick={openPopup}>내 정보</button>
          </div>
      </header>

    <div id={styles.mainContent}>
      {/* 직원 관리 페이지 이동 버튼 */}
      <button id={styles.EmployeeManageButton} onClick={goToEmployeeManage} className={styles.button}>
        직원 관리 페이지
      </button>
      {/* 상품 관리 페이지 이동 버튼 */}
      <button id={styles.productManageButton} onClick={goToProductManage} className={styles.button}>
        상품 관리 페이지
      </button>
    </div>

    </div>
  );
};

export default Main;
