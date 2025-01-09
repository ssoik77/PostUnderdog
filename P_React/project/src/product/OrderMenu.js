import React, { useState, useEffect } from 'react';
import styles from './OrderMenu.module.css';

const OrderMenu = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 발주 ID 저장

  // 로컬 스토리지에서 발주 데이터 로드
  const loadOrdersFromStorage = () => {
    const storedOrders = JSON.parse(localStorage.getItem('savedOrders')) || [];
    setOrders(storedOrders);
  };

  useEffect(() => {
    loadOrdersFromStorage();
  }, []);

  // 체크박스 선택/해제
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id) // 이미 선택된 항목은 제거
        : [...prevSelected, id] // 선택 항목 추가
    );
  };

  // 선택된 발주 데이터 삭제
  const deleteSelectedOrders = () => {
    if (selectedOrders.length === 0) {
      alert('삭제할 발주 데이터를 선택해주세요.');
      return;
    }

    if (window.confirm('선택한 발주 데이터를 삭제하시겠습니까?')) {
      const updatedOrders = orders.filter((order) => !selectedOrders.includes(order.id));
      setOrders(updatedOrders);
      localStorage.setItem('savedOrders', JSON.stringify(updatedOrders));
      setSelectedOrders([]); // 선택 항목 초기화
      alert('선택한 발주 데이터가 삭제되었습니다.');
    }
  };

  const openOrderPopup = () => {
    const popupFeatures = `width=${window.innerWidth},height=${window.innerHeight},top=0,left=0,resizable=yes,scrollbars=yes`;
    const popup = window.open('../order', '상품 발주', popupFeatures);

    // 팝업이 닫힐 때 로컬 스토리지 데이터를 로드
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        loadOrdersFromStorage();
      }
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1>발주 관리</h1>
      <button onClick={openOrderPopup} className={styles.openOrderButton}>
        상품 발주
      </button>

      <h2>저장된 발주서</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  onChange={() => toggleSelectOrder(order.id)}
                  checked={selectedOrders.includes(order.id)}
                />
                <p className={styles.orderDate}>📅 발주일: {order.date}</p>
              </div>
              <table className={styles.orderTable}>
                <thead>
                  <tr>
                    <th>상품코드</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>단가</th>
                    <th>합계</th>
                    <th>비고</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toLocaleString()}원</td>
                      <td>{item.total.toLocaleString()}원</td>
                      <td>{item.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.total}>총 합계: {order.total.toLocaleString()}원</p>
            </div>
          ))}
          <button onClick={deleteSelectedOrders} className={styles.deleteButton}>
            선택된 발주 삭제
          </button>
        </div>
      ) : (
        <p className={styles.noOrder}>저장된 발주서가 없습니다.</p>
      )}
    </div>
  );
};

export default OrderMenu;
