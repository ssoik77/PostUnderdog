import React from 'react';
import styles from './Main.module.css';
import '../mypage/Mypage.js';

const Main = () => {
  // 내 정보 팝업 열기 함수
  const openPopup = () => {
    const popupFeatures = "width=800,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("../Mypage", "내 정보", popupFeatures);
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
    </div>
  );
};

export default Main;
