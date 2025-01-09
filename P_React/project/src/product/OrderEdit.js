import React, { useState, useEffect } from 'react';
import styles from './OrderEdit.module.css'; // 기존 CSS 파일 가져오기

const OrderEdit = () => {
  const [orderData, setOrderData] = useState(null); // 수정 대상 데이터

  // 부모 창에서 데이터 전달받기
  useEffect(() => {
    window.setOrderData = (data) => {
      setOrderData(data);
    };
  }, []);

  const handleInputChange = (index, key, value) => {
    const updatedItems = [...orderData.items];
  
    // 천 단위 콤마 제거 후 숫자로 변환
    const numericValue = key === 'price' || key === 'quantity' 
      ? parseInt(value.replace(/,/g, ''), 10) || 0 
      : value;
  
    updatedItems[index][key] = numericValue;
  
    // 가격 계산 업데이트
    updatedItems[index].total =
      parseInt(updatedItems[index].quantity || 0) *
      parseInt(updatedItems[index].price || 0);
  
    setOrderData({
      ...orderData,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + item.total, 0),
    });
  };
  
  const saveOrder = () => {
    // 저장 시 데이터 포맷 정리 (천 단위 콤마 추가)
    const formattedOrderData = {
      ...orderData,
      items: orderData.items.map((item) => ({
        ...item,
        price: item.price.toLocaleString(),
        total: item.total.toLocaleString(),
      })),
      total: orderData.total.toLocaleString(),
    };
  
    const storedOrders = JSON.parse(localStorage.getItem('savedOrders')) || [];
    const updatedOrders = storedOrders.map((order) =>
      order.id === orderData.id ? formattedOrderData : order
    );
  
    localStorage.setItem('savedOrders', JSON.stringify(updatedOrders));
    alert('발주 데이터가 수정되었습니다.');
    window.close();
  };

  if (!orderData) return 

  return (
    <div className={styles.container}> {/* 기존 container 클래스 적용 */}
      <div className={styles.purchaseOrder}> {/* 기존 purchaseOrder 스타일 */}
        <h1 className={styles.header}>상품 발주 수정</h1>
        <h2>📅 발주일: {orderData.date}</h2>
        <table className={styles.table}> {/* table 스타일 적용 */}
          <thead>
            <tr>
          
              <th>업체명</th>
              <th>상품코드</th>
              <th>상품명</th>
              <th>수량</th>
              <th>단위</th>
              <th>단가</th>
              <th>합계</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {orderData.items.map((item, index) => (
              <tr key={index}>
                
                <td>
                  <input
                    type="text"
                    value={item.company}
                    placeholder="업체명"
                    onChange={(e) =>
                      handleInputChange(index, 'company', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.code}
                    placeholder="상품코드"
                    onChange={(e) =>
                      handleInputChange(index, 'code', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    placeholder="상품명"
                    onChange={(e) =>
                      handleInputChange(index, 'name', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    placeholder="수량"
                    onChange={(e) =>
                      handleInputChange(index, 'quantity', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.unit}
                    placeholder="단위"
                    onChange={(e) =>
                      handleInputChange(index, 'unit', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    placeholder="단가"
                    step="10000"
                    onChange={(e) =>
                      handleInputChange(index, 'price', e.target.value)
                    }
                    className={styles.input} 
                  />
                </td>
                <td className={styles.total}>{item.total.toLocaleString()}원</td>
                <td>
                  <input
                    type="text"
                    value={item.remark}
                    placeholder="비고"
                    onChange={(e) =>
                      handleInputChange(index, 'remark', e.target.value)
                    }
                    className={styles.input}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.footer}>총 합계: {orderData.total.toLocaleString()}원</p>
        <button onClick={saveOrder} className={styles.saveButton}>
          저장
        </button>
        <button onClick={() => window.close()} className={styles.cancelButton}>
          취소
        </button>
      </div>
    </div>
  );
};

export default OrderEdit;
