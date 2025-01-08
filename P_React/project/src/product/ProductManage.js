import styles from './ProductManage.module.css';

const ProductManage = () => {

  const goAddPage = () => {
    window.location.href = "/productAdd";
  }

  return (
    <>
      <div className={styles.container}>
        <h3>POST UNDERDOG</h3>
        <h1>상품 관리 페이지</h1>
      </div>
      <div id={styles.menu}>
        <button id={styles.listButton} className={styles.menuButton} style={{ backgroundColor: 'blue' }}>상품 리스트</button>
        <button id={styles.addButton} className={styles.menuButton} onClick={goAddPage}>상품 추가</button>
      </div>
      <div id={styles.main}>
        <div id={styles.list}>
          <table>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
              <td className={styles.product}>
                상품 테스트
              </td>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
