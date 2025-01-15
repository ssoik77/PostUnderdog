import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';
import ShowProduct from './ShowProduct.js'
import axios from 'axios';

const ProductManage = () => {
  const [productList, setProductList] = useState([]);

  const goAddPage = () => {
    window.location.href = "/productAdd";
  }
  const goMainPage = () => {
    window.location.href = "/main";
  }

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
        }
        const updatedList = response.data.map(item => ({
          ...item,
          checked: false, // 각 항목에 `checked` 속성 추가
        }));
        setProductList(updatedList);
      })
      .catch((error) => console.error("Error Pull product:", error));
  };

  const sendEditData = () => {
    const editProduct = productList
      .filter(item => item.checked)  // `checked`가 true인 객체만 필터링
      .map(({ checked, ...rest }) => rest);  // `checked` 속성은 제외하고 나머지 속성만 반환

    if (editProduct.length === 0) {
      alert("수정 할 항목을 체크 해주세요");
    } else {
      axios.post("http://localhost:8080/underdog/product/edit", editProduct, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 변경
        },
      })
        .then(() => {
          window.location.reload(true);
        })
        .catch((error) => console.error("Error Pull product:", error));
    }
  };

  const deleteProduct = () => {
    const deleteProductCode = productList
    .filter(item => item.checked)  // `checked`가 true인 객체만 필터링
    .map(({ product_code, product_image_url }) => ({product_code, product_image_url})); 

  if (deleteProductCode.length === 0) {
    alert("삭제 할 항목을 체크 해주세요");
  } else {
    const checkDelete = window.confirm("정말 삭제 하시겠습니까?");
    if(checkDelete){
      axios.post("http://localhost:8080/underdog/product/delete", deleteProductCode, {
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 변경
        },
      })
      .then(() => {
        window.location.reload(true);
      })
      .catch((error) => console.error("Error Pull product:", error));
    }
    }
  }


  const editData = (data) => {
    setProductList((prev) => {
      // 수정된 데이터를 적용
      const updatedData = prev.map(item =>
        item.product_code === data.product_code ? data : item
      );
      return updatedData;
    });
  }

  return (
    <>
      <div className={styles.container}>
        <h3>POST UNDERDOG</h3>
        <h1>상품 관리 페이지</h1>
      </div>
      <button id={styles.goMainButton} onClick={goMainPage}>메인 페이지</button>
      <div id={styles.menu}>
        <button id={styles.listButton} className={styles.menuButton} style={{ backgroundColor: 'blue' }}>상품 리스트</button>
        <button id={styles.addButton} className={styles.menuButton} onClick={goAddPage}>상품 추가</button>
      </div>
      <button id={styles.deleteButton} onClick={deleteProduct}>상품 삭제</button>
      <button id={styles.editButton} onClick={sendEditData}>상품 수정</button>
      <div id={styles.main}>
        <div id={styles.list}>
            <table>
                <tbody>
              {productList.map((list) => (
                <tr key={list.product_code}>
                  <ShowProduct list={list} editData={editData} />
                </tr>
              ))}
              </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
