import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';
import ShowProduct from './ShowProduct.js'
import axios from 'axios';

const ProductManage = () => {
  const [productList, setProductList] = useState([]);

  const goAddPage = () => {
    window.location.href = "/productAdd";
  }

  useEffect(()=>{
    pullProduct();
  },[])

  const pullProduct = () => {
    axios.post("http://localhost:8080/underdog/product/list"  ,{
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 변경
      },
    })
      .then((response) => {
        console.log(response.data);
        const updatedList = response.data.map(item => ({
          ...item,
          checked: false, // 각 항목에 `checked` 속성 추가
      }));
        setProductList(updatedList);
      })
      .catch((error) => console.error("Error Pull product:", error));
  };
  
  const sendEditData = (e) => {
    e.preventDefault()
    console.log('수정함수 작동!');
    axios.post("http://localhost:8080/underdog/product/edit", productList, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 변경
      },
    })
    .then((response) => {
      console.log(response.data);
      const updatedList = response.data.map(item => ({
        ...item,
        checked: false, // 각 항목에 `checked` 속성 추가
      }));
      setProductList(updatedList);
    })
    .catch((error) => console.error("Error Pull product:", error));
  }

  const editData = (data) => {
    setProductList((prev) => {
      // 수정된 데이터를 적용
      const updatedData = prev.map(item =>
        item.product_code === data.product_code ? data : item
      );
      return updatedData;
    });
  };
  
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
            <label id={styles.editButtonLabel} htmlFor='editButton'>수정완료</label>
      <div id={styles.main}>
        <div id={styles.list}>
            <form onSubmit={sendEditData}>
          <table>
          {productList.map((list, index) => (
            <tr key={index}>
                  <ShowProduct list={list} editData={editData} />
                </tr>
              ))}
          </table>
              <input id='editButton' type='submit' value={'수정완료'} style={{visibility: 'hidden'}}/>
              </form>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
