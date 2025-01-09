import React, { useState } from 'react';
import styles from './Order.module.css';

const Order = ({ onSaveOrder }) => {
  const [items, setItems] = useState([
    { id: 1, code: "", name: "", quantity: 0, price: 0, total: 0, remark: "", selected: false },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, code: "", name: "", quantity: 0, price: 0, total: 0, remark: "", selected: false },
    ]);
  };

  const deleteSelectedItems = () => {
    setItems(items.filter((item) => !item.selected)); // 선택된 항목만 삭제
  };

  const handleChange = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            [field]: field === "quantity" || field === "price" ? parseInt(value || 0) : value,
            total:
              field === "quantity" || field === "price"
                ? (field === "quantity" ? value : item.quantity) * (field === "price" ? value : item.price)
                : item.total,
          }
        : item
    );
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const saveOrder = () => {
    const newOrder = {
      id: Date.now(), // 고유 ID
      date: new Date().toLocaleDateString(),
      items,
      total: calculateTotal(),
    };

    // 로컬 스토리지에 기존 데이터와 함께 추가 저장
    const existingOrders = JSON.parse(localStorage.getItem('savedOrders')) || [];
    existingOrders.push(newOrder);
    localStorage.setItem('savedOrders', JSON.stringify(existingOrders));

    alert('발주 데이터가 저장되었습니다!');
    window.close();
  };

  const toggleSelectItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const printOrder = () => {
    // 프린트 영역 지정
    const printContent = document.getElementById('printableArea');
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>발주서 프린트</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            table th, table td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            table th { background-color: #f4f4f4; }
            .total { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={styles.container}>
      <h1>상품 발주</h1>

      <div className={styles.purchaseOrder} id="printableArea">
        <div className={styles.header}>
          <h2>발주서</h2>
          <p>회사명: (주)PostUnderdog</p>
          <p>발주일: {new Date().toLocaleDateString()}</p>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>선택</th>
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
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) => handleChange(item.id, "code", e.target.value)}
                    placeholder="상품코드"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleChange(item.id, "name", e.target.value)}
                    placeholder="상품명"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                    placeholder="수량"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleChange(item.id, "unit", e.target.value)}
                    placeholder="단위"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.price}
                    step="1000"
                    onChange={(e) => handleChange(item.id, "price", e.target.value)}
                    placeholder="단가"
                  />
                </td>
                <td className={styles.total}>{item.total.toLocaleString()}원</td>
                <td>
                  <input
                    type="text"
                    value={item.remark}
                    onChange={(e) => handleChange(item.id, "remark", e.target.value)}
                    placeholder="비고"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={styles.total}>총 합계: {calculateTotal().toLocaleString()}원</p>
      </div>

      <div className={styles.footer}>
        <button onClick={addItem} className={styles.addButton}>
          항목 추가
        </button>
        <button onClick={saveOrder} className={styles.saveButton}>
          발주 저장
        </button>
        <button onClick={deleteSelectedItems} className={styles.deleteButton}>
          선택 항목 삭제
        </button>
        <button onClick={printOrder} className={styles.printButton}>
          인쇄
        </button>
      </div>
    </div>
  );
};

export default Order;
