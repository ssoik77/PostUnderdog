import React, { useState, useEffect } from 'react';
import styles from './OrderMenu.module.css';

const OrderMenu = () => {
  const [orders, setOrders] = useState([]); // 발주 데이터 상태 관리
  const [selectedOrders, setSelectedOrders] = useState([]); // 선택된 발주 ID 관리

  // 로컬 스토리지에서 발주 데이터 로드
  const loadOrdersFromStorage = () => {
    const storedOrders = JSON.parse(localStorage.getItem('savedOrders')) || [];
    setOrders(storedOrders);
  };

  useEffect(() => {
    loadOrdersFromStorage();
  }, []);

  // 발주 데이터 선택/해제
  const toggleSelectOrder = (id) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id) // 선택 해제
        : [...prevSelected, id] // 선택 추가
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
      setOrders(updatedOrders); // 화면에서 제거
      localStorage.setItem('savedOrders', JSON.stringify(updatedOrders)); // 로컬 스토리지 업데이트
      setSelectedOrders([]); // 선택 초기화
      alert('선택한 발주 데이터가 삭제되었습니다.');
    }
  };

  const editSelectedOrders = () => {
    if (selectedOrders.length !== 1) { // 단일 항목만 수정 가능
      alert('수정할 발주 데이터를 하나만 선택해주세요.');
      return;
    }
  
    const orderToEdit = orders.find((order) => order.id === selectedOrders[0]);
  
    // 숫자 또는 문자열에 따라 처리
    const formattedOrderToEdit = {
      ...orderToEdit,
      items: orderToEdit.items.map((item) => ({
        ...item,
        price: typeof item.price === 'string' 
          ? parseInt(item.price.replace(/,/g, ''), 10) 
          : item.price, // 이미 숫자라면 그대로 사용
        total: typeof item.total === 'string' 
          ? parseInt(item.total.replace(/,/g, ''), 10) 
          : item.total, // 이미 숫자라면 그대로 사용
      })),
      total: typeof orderToEdit.total === 'string' 
        ? parseInt(orderToEdit.total.replace(/,/g, ''), 10) 
        : orderToEdit.total, // 이미 숫자라면 그대로 사용
    };
  
    const popupFeatures = `width=${window.innerWidth},height=${window.innerHeight},top=0,left=0,resizable=yes,scrollbars=yes`;
    const popup = window.open('../orderedit', '상품 발주 수정', popupFeatures);
  
    // 팝업에 데이터 전달
    popup.onload = () => {
      popup.setOrderData(formattedOrderToEdit);
    };
  
    // 팝업 종료 시 로컬 스토리지 갱신
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        loadOrdersFromStorage();
      }
    }, 500);
  };
  

  // 발주 등록 팝업 열기
  const openOrderPopup = () => {
    const popupFeatures = `width=${window.innerWidth},height=${window.innerHeight},top=0,left=0,resizable=yes,scrollbars=yes`;
    const popup = window.open('../order', '상품 발주', popupFeatures);

    // 팝업 종료 시 로컬 스토리지 갱신
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        loadOrdersFromStorage();
      }
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h3>POST UNDERDOG</h3>
      <h1>발주 관리</h1>
      <button onClick={openOrderPopup} className={styles.openOrderButton}>
        상품 발주
      </button>

      {orders.length > 0 ? (
        <div>
          <h2>발주 내역</h2>
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
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.company}</td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>
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
            삭제
          </button>
          <button onClick={editSelectedOrders} className={styles.editButton}>
            수정
          </button>
        </div>
      ) : (
        <p className={styles.noOrder}>저장된 발주서가 없습니다.</p>
      )}
    </div>
  );
};

export default OrderMenu;
