import React, { useState, useEffect } from 'react';
import styles from './OrderEdit.module.css'; // CSS 스타일 가져오기

const OrderEdit = () => {
  const [orderData, setOrderData] = useState(null); // 수정 대상 데이터 상태 관리

  // 부모 창에서 데이터 전달받기
  useEffect(() => {
    window.setOrderData = (data) => {
      setOrderData(data);
    };
  }, []);

  // 항목 추가
  const addItem = () => {
    const newItem = {
      id: orderData.items.length + 1,
      company: '',
      code: '',
      name: '',
      quantity: 0,
      price: 0,
      total: 0,
      remark: '',
      selected: false,
    };
    setOrderData({
      ...orderData,
      items: [...orderData.items, newItem],
    });
  };

  // 선택된 항목 삭제
  const deleteSelectedItems = () => {
    const updatedItems = orderData.items.filter((item) => !item.selected);
    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.total, 0);

    setOrderData({
      ...orderData,
      items: updatedItems,
      total: updatedTotal,
    });
  };

  // 체크박스 선택/해제
  const toggleItemSelection = (index) => {
    const updatedItems = [...orderData.items];
    updatedItems[index].selected = !updatedItems[index].selected;
    setOrderData({
      ...orderData,
      items: updatedItems,
    });
  };

  // 입력 필드 값 변경 처리
  const handleInputChange = (index, key, value) => {
    const updatedItems = [...orderData.items];

     // 단위 칸만 대문자로 변환
  const formattedValue =
  key === 'unit' ? value.toUpperCase() : value;

    // 천 단위 콤마 제거 후 숫자로 변환
    const numericValue =
      key === 'price' || key === 'quantity'
        ? parseInt(value.replace(/,/g, ''), 10) || 0
        : formattedValue;

    updatedItems[index][key] = numericValue;

    // 수량 * 단가 계산으로 합계(total) 업데이트
    updatedItems[index].total =
      parseInt(updatedItems[index].quantity || 0) *
      parseInt(updatedItems[index].price || 0);

    // 총 합계(total) 업데이트
    setOrderData({
      ...orderData,
      items: updatedItems,
      total: updatedItems.reduce((sum, item) => sum + item.total, 0),
    });
  };

  // 발주 수정 데이터 저장
  const saveOrder = () => {
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

  if (!orderData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.purchaseOrder}>
        <h1 className={styles.header}>상품 발주 수정</h1>
        <h2>📅 발주일: {orderData.date}</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>선택</th>
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
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => toggleItemSelection(index)}
                  />
                </td>
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
        <button onClick={addItem} className={styles.addButton}>
          항목 추가
        </button>
        <button onClick={deleteSelectedItems} className={styles.deleteButton}>
          삭제
        </button>
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
