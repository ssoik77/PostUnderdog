import React, { useEffect, useState } from "react";
import styles from './ShowProduct.module.css';

const ShowProduct = ({ list, editData }) => {
  const [localData, setLocalData] = useState({
    code: list.product_code,
    imageURL: list.product_image_url,
    name: list.product_name,
    price: list.product_price,
    priceUnit: list.product_price_unit,
    cost: list.product_cost,
    costUnit: list.product_cost_unit,
    discount: list.product_discount,
    firstCategory: list.product_first_category,
    secondCategory: list.product_second_category,
    selling: list.product_selling,
    checked: list.editChecked
  });

  // `list` 변경 시 `localData` 초기화
  useEffect(() => {
    setLocalData({
      code: list.product_code,
      imageURL: list.product_image_url,
      name: list.product_name,
      price: list.product_price,
      priceUnit: list.product_price_unit,
      cost: list.product_cost,
      costUnit: list.product_cost_unit,
      discount: list.product_discount,
      firstCategory: list.product_first_category,
      secondCategory: list.product_second_category,
      selling: list.product_selling,
      checked: list.editChecked
    });
  }, [list]);

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
        <img id={styles.productImage} src={localData.imageURL} alt="상품 이미지" />
        <div id={styles.productCode}>{localData.code}</div>
        <input className={styles.editInput} id={styles.productName} name="name" value={localData.name} onChange={handleData} />
        <input className={styles.editInput} id={styles.productPrice} name="price" value={localData.price} onChange={handleNumberData} />
        <select className={styles.editInput} id={styles.productPriceUnit} name="priceUnit" value={localData.priceUnit} onChange={handleData}>
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <input className={styles.editInput} id={styles.productDiscount} name="discount" value={localData.discount} onChange={handleNumberData} />
        <input className={styles.editInput} id={styles.productCost} name="cost" value={localData.cost} onChange={handleNumberData} />
        <select className={styles.editInput} id={styles.productCostUnit} name="costUnit" value={localData.costUnit} onChange={handleData}>
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <select className={styles.editInput} id={styles.productFirstCategory} name="firstCategory" value={localData.firstCategory} onChange={handleData}>
          <option value="기타">기타</option>
          <option value="식품">식품</option>
          <option value="의류">의류</option>  
          <option value="pc기기">pc기기</option>
        </select>
        <select className={styles.editInput} id={styles.productSecondCategory} name="secondCategory" value={localData.secondCategory} onChange={handleData}>
          <option value="기타">기타</option>
        </select>
        <input id={styles.productSelling} type="checkbox" name="selling" checked={localData.selling} onChange={handleChecked} />
      </div>
    </td>
  );
};

export default ShowProduct;
