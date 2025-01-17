import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';
import ShowEditProduct from './ShowEditProduct.js'
import axios from 'axios';

const ProductManage = () => {
  useEffect(() => {
    const loginId = localStorage.getItem("m_id") || sessionStorage.getItem("m_id");

    if (loginId !== null) {
        // json 형식의 권한 데이터를 객체로 푸는 작업
        const storedAuthority = localStorage.getItem("authority") || sessionStorage.getItem("authority");
        if (storedAuthority) {
            const authority = JSON.parse(storedAuthority)
            const a_authority = authority.a_authority;
            const p_authority = authority.p_authority;

            if (a_authority && p_authority) {
                console.log("권한 있음");
            } else {
                console.log("권한 없음");
                window.location.href = "../main";
            }
        }
    } else {
        console.log("아이디 없음");
        window.location.href = "../";
    }
}, []); // 처음 로드 시에만 실행

  const [productList, setProductList] = useState([]);

  //상품 추가 페이지 이동 함수    
  const goAddPage = () => {
    window.location.href = "/productAdd";
  }
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
        if (response.data.length === 0) {
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
      .map(({ product_code, product_image_url }) => ({ product_code, product_image_url }));

    if (deleteProductCode.length === 0) {
      alert("삭제 할 항목을 체크 해주세요");
    } else {
      const checkDelete = window.confirm("정말 삭제 하시겠습니까?");
      if (checkDelete) {
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
    <div id={styles.productMainPage}>
      <div className={styles.container}>
        <h3>POST UNDERDOG</h3>
        <h1>상품 관리 페이지</h1>
      </div>
      <button id={styles.goMainButton} onClick={goMainPage}>메인 페이지</button>
      {/* 내 정보 팝업 버튼 */}
      <button id={styles.infoButton} onClick={openPopup} className={styles.button}>
        내 정보
      </button>
      <div id={styles.menu}>
        <button id={styles.listButton} className={styles.menuButton} style={{ backgroundColor: 'blue' }}>상품 수정</button>
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
                  <ShowEditProduct list={list} editData={editData} />
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
