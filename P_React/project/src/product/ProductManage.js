import React from 'react';
import styles from './ProductManage.module.css';


  // 발주 관리 페이지로 이동
  const goToOrderMenu = () => {
    window.location.href = "/ordermenu"; // 페이지 이동
  };

const ProductManage = () => {
  
  
  return (
    <>
    <div className={styles.container}>
      <h3>POST UNDERDOG</h3>
      <h1>상품 관리 페이지</h1>
    </div>
 <div id={styles.menu}>
    <button id={styles.listButton}>상품 리스트</button>
    <button id={styles.addButton}>상품 추가</button>
    <button id={styles.OrderMenuButton} onClick={goToOrderMenu} className={styles.button}>
        발주 관리
      </button>
    </div>
      <div id={styles.main}>
      <div id={styles.list}>
      </div>
      <div id={styles.add}>
      </div>
      </div>
    </>
  );
};

export default ProductManage;