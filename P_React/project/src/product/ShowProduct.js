import styles from './ShowProduct.module.css';

const ShowProduct = ({ list }) => {
  const localData = list;

  return (
    <td>
      <div className={styles.product}>
        <img id={styles.productImage} src={localData.product_image_url} alt="상품 이미지" />
        <div id={styles.productCode}>{localData.product_code}</div>
        <input className={styles.editInput} id={styles.productName} name="product_name" value={localData.product_name} readOnly />
        <input className={styles.editInput} id={styles.productPrice} name="product_price" value={localData.product_price} readOnly />
        <select className={styles.editInput} id={styles.productPriceUnit} name="product_price_unit" value={localData.product_price_unit} readOnly >
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <input className={styles.editInput} id={styles.productDiscount} name="product_discount" value={localData.product_discount} readOnly />
        <input className={styles.editInput} id={styles.productCost} name="product_cost" value={localData.product_cost} readOnly />
        <select className={styles.editInput} id={styles.productCostUnit} name="product_cost_unit" value={localData.product_cost_unit} readOnly >
          <option value="개">개</option>
          <option value="1kg">1kg</option>
          <option value="100g">100g</option>
        </select>
        <select className={styles.editInput} id={styles.productFirstCategory} name="product_first_category" value={localData.product_first_category} readOnly >
          <option value="기타">기타</option>
          <option value="식품">식품</option>
          <option value="의류">의류</option>  
          <option value="pc기기">pc기기</option>
        </select>
        <select className={styles.editInput} id={styles.productSecondCategory} name="product_second_category" value={localData.product_second_category} readOnly >
          <option value="기타">기타</option>
        </select>
        <input id={styles.productSelling} type="checkbox" name="product_selling" checked={localData.product_selling} readOnly />
      </div>
    </td>
  );
};

export default ShowProduct;
