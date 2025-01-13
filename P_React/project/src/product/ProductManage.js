import { useState } from 'react';
import styles from './ProductManage.module.css';

const ProductManage = () => {
  const [produtList, setProductList] = useState([]);

  const goAddPage = () => {
    window.location.href = "/productAdd";
  }

  const pullProduct = () => {
    axios.post("http://localhost:8080/underdog/product/add")
      .then((response) => {
        console.log("Product Pull successfully");
        setProductList([...produtList, response.data])
      })
      .catch((error) => console.error("Error Pull product:", error));
  };



  const showProductList = ({ list }) => {
    const code = list.product_code;
    const imageURL = list.product_image_url;
    const name = list.product_name;
    const price = list.product_price;
    const priceUnit = list.product_price_unit;
    const cost = list.product_cost;
    const costUnit = list.product_cost_unit;
    const discount = list.product_discount;
    const firstCategory = list.product_first_category;
    const secondCategory = list.product_second_category;
    const selling = list.product_selling;
    return (
      <td>
        <form>
          상품이미지
          <img src={imageURL} />
          상품코드
          <div>{code}</div>
          상품이름
          <input value={name} />
          상품가격
          <input value={price} />
              가격 단위
              <select value={priceUnit}>
              <option value='개'>개</option>
              <option value='1kg'>1kg</option>
              <option value='100g'>100g</option>
          </select>
          상품원가
          <input value={cost} />
          원가 단위
              <select value={costUnit}>
              <option value='개'>개</option>
              <option value='1kg'>1kg</option>
              <option value='100g'>100g</option>
          </select>
          상품할인
          <input value={discount} />
          상품대분류
          <select value={firstCategory}>
            <option value='기타'>기타</option>
            <option value='식품'>식품</option>
            <option value='의류'>의류</option>
            <option value='pc기기'>pc기기</option>
          </select>
          상품소분류
          <select value={secondCategory}>
            <option value='기타'>기타</option>
          </select>
      판매여부
      <input type='checkbox'/>
        </form>
      </td>
    )
  }
  //폼태그와 라벨 사용
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
            {produtList.map((list, index) => (<showProductList key={index} list={list} />))}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
