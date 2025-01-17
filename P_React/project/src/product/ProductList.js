import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';
import ShowProduct from './ShowProduct.js'
import axios from 'axios';

const ProductManage = () => {
  //로그인 아이디 담는 객체
  const keepLogin = localStorage.getItem("m_id") || sessionStorage.getItem("m_id");

  const [productList, setProductList] = useState([]);

  // 로그인 아이디 로컬,세션 스토리지에서 삭제되면 로그인 페이지로 이동  
  useEffect(()=>{
    if(!keepLogin){
      window.location.href="../";
    }
  },[keepLogin])

  //메인 페이지 이동 함수
const goMainPage = () => {
  window.location.href = "/main";
}
      // 내 정보 팝업 열기 함수
 const openPopup = () => {
  const popupFeatures = "width=500,height=350,top=100,left=100,resizable=no,scrollbars=yes";
  window.open("../Mypage", "내 정보", popupFeatures);
};

  useEffect(() => {
    pullProduct();
  }, [])

  const pullProduct = () => {
    axios.post("http://localhost:8080/underdog/product/list", {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 변경
      },
    })
      .then((response) => {
        if(response.data.length === 0){
          setProductList("상품이 없습니다.");
        }else{
          setProductList( response.data);
        }
      })
      .catch((error) => console.error("Error Pull product:", error));
  };

  return (
    <div id={styles.productMainPage}>
      <div className={styles.container}>
        <h3>POST UNDERDOG</h3>
        <h1>상품 관리 페이지</h1>
      </div>
      {/* 메인 페이지 이동 버튼 */}
      <button id={styles.goMainButton} onClick={goMainPage}>메인 페이지</button>
      {/* 내 정보 팝업 버튼 */}
      <button id={styles.infoButton} onClick={openPopup} className={styles.button}>
      내 정보
      </button>
      <div id={styles.main}>
        <div id={styles.list}>
            <table>
                <tbody>
              {productList.map((list) => (
                <tr key={list.product_code}>
                  <ShowProduct list={list}/>
                </tr>
              ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManage;
