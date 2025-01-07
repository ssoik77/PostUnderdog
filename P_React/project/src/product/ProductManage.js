import React from 'react';
import styles from './ProductManage.module.css';

const ProductManage = () => {
  
  
  return (
    <>
    <div className={styles.container}>
      <h3>POST UNDERDOG</h3>
      <h1>상품 관리 페이지</h1>
    </div>
    <div id={styles.productMenu}>
    <button id={styles.productList}>상품 리스트</button>
    <button id={styles.productAdd}>상품 추가</button>
    </div>
    </>
  );
};

export default ProductManage;
