import React, { useState } from "react";
import styles from './ShowProduct.module.css';

const ShowProduct = ({ list, editData }) => {
  const [localData, setLocalData] = useState({
    product_code: list.product_code,
    product_image_url: list.product_image_url,
    product_name: list.product_name,
    product_price: list.product_price,
    product_price_unit: list.product_price_unit,
    product_cost: list.product_cost,
    product_cost_unit: list.product_cost_unit,
    product_discount: list.product_discount,
    product_first_category: list.product_first_category,
    product_second_category: list.product_second_category,
    product_selling: list.product_selling,
    checked: list.checked
  });

  // 가격 자동 ',' 설정 함수
  const numberMode = (value) => {
    if (!value) return "";
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 체크박스 핸들러
  const handleChecked = (e) => {
    const { name, checked } = e.target;
    const updatedData = { ...localData, [name]: checked };
    setLocalData(updatedData);
    editData(updatedData);
  };

  // 일반 데이터 핸들러
  const handleData = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...localData, [name]: value };
    setLocalData(updatedData);
    editData(updatedData);
  };

  // 숫자 포맷 데이터 핸들러
  const handleNumberData = (e) => {
    const { name, value } = e.target;
    const formattedValue = numberMode(value);
    const updatedData = { ...localData, [name]: formattedValue };
    setLocalData(updatedData);
    editData(updatedData);
  };

  return (
    <td>
      <div className={styles.product}>
        <input id={styles.checked} type="checkbox" name="checked" checked={localData.checked} onChange={handleChecked} />
        <img id={styles.productImage} src={localData.product_image_url} alt="상품 이미지" />
        <div id={styles.productCode}>{localData.product_code}</div>
        <input className={styles.editInput} id={styles.productName} name="product_name" value={localData.product_name} onChange={handleData} />
        <input className={styles.editInput} id={styles.productPrice} name="product_price" value={localData.product_price} onChange={handleNumberData} />
        <select className={styles.editInput} id={styles.productPriceUnit} name="product_price_unit" value={localData.product_price_unit} onChange={handleData}>
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <input className={styles.editInput} id={styles.productDiscount} name="product_discount" value={localData.product_discount} onChange={handleNumberData} />
        <input className={styles.editInput} id={styles.productCost} name="product_cost" value={localData.product_cost} onChange={handleNumberData} />
        <select className={styles.editInput} id={styles.productCostUnit} name="product_cost_unit" value={localData.product_cost_unit} onChange={handleData}>
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <select className={styles.editInput} id={styles.productFirstCategory} name="product_first_category" value={localData.product_first_category} onChange={handleData}>
          <option value="기타">기타</option>
          <option value="식품">식품</option>
          <option value="의류">의류</option>  
          <option value="pc기기">pc기기</option>
        </select>
        <select className={styles.editInput} id={styles.productSecondCategory} name="product_second_category" value={localData.product_second_category} onChange={handleData}>
          <option value="기타">기타</option>
        </select>
        <input id={styles.productSelling} type="checkbox" name="product_selling" checked={localData.product_selling} onChange={handleChecked} />
      </div>
    </td>
  );
};

export default ShowProduct;
