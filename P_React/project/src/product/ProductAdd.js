import { useState } from 'react';
import styles from './ProductAdd.module.css';
import noimage from './noimage.png'
import axios from 'axios';

const ProductManage = () => {
    const [previewImage, setPreviewImage] = useState(noimage); // 이미지 저장 그릇
    const [uploadImage, setUploadimage] = useState(noimage); // 이미지 저장 그릇
    const [name, setname] = useState(""); // 상품 이름 저장 그릇
    const [price, setPrice] = useState(""); // 가격 저장 그릇
    const [priceUnit, setPriceUnit] = useState("개"); // 가격 단위 저장 그릇
    const [cost, setCost] = useState(""); // 원가 저장 그릇
    const [costUnit, setCostUnit] = useState("개"); // 원가 단위 저장 그릇
    const [discount, setDiscount] = useState(""); // 할인가 저장 그릇
    const [event, setEvent] = useState("없음"); // 행사 저장 그릇
    const [firstCategory, setFirstCategory] = useState("기타"); // 대분류 저장 그릇
    const [secondCategory, setSecondCategory] = useState("기타"); // 소분류 저장 그릇
    const [selling, setSelling] = useState(false); // 판매 여부 저장 그릇
    // 상품 리스트로 가는 페이지
    const goListPage = () => {
        window.location.href = "/productmanage";
    }
    // 가격 자동 , 설정 함수
    const numberMode = (value) => {
        if (!value) return "";
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // 이미지 실시간 저장 함수
    const inputImage = (e) => {
        console.log(e.target.files[0]);
       setUploadimage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    // 상품 이름 실시간 저장 함수
    const handleName = (e) => {setname(e.target.value);}
    // 가격 실시간 저장 함수
    const handlePrice = (e) => {setPrice(numberMode(e.target.value)||"");}
    // 가격 단위 실시간 저장 함수
    const handlePriceUnit = (e) => {setPriceUnit(e.target.value);}
    // 원가 실시간 저장 함수
    const handleCost = (e) => {setCost(numberMode(e.target.value)||"");}
    // 원간 단위 실시간 저장 함수
    const handleCoastUnit = (e) => {setCostUnit(e.target.value);}
    // 할인가 실시간 저장 함수
    const handleDiscount = (e) => {setDiscount(numberMode(e.target.value)||"");}
    // 행사 실시간 저장 함수
    const handleEvent = (e) => {setEvent(e.target.value);}
    // 대분류 실시간 저장 함수
    const handleFirstCategory = (e) => {setFirstCategory(e.target.value);}
    // 소분류 실시간 저장 함수
    const handleSecondCategory = (e) => {setSecondCategory(e.target.value);}
    // 판매 여부 실시가 저장 함수
    const handleSelling = (e) => {setSelling(e.target.checked);}

    // 데이터 묶음 서버 전송 함수
    const sendAddProductData = async (e) => {
        const formData = new FormData();
        formData.append("product_image", uploadImage);
        formData.append("product_name", name);
        formData.append("product_price", price);
        formData.append("product_price_unit", priceUnit);
        formData.append("product_cost", cost);
        formData.append("product_cost_unit", costUnit);
        formData.append("product_discount", discount);
        formData.append("product_event", event);
        formData.append("product_first_category", firstCategory);
        formData.append("product_second_category", secondCategory);
        formData.append("product_selling", selling);
        console.log(formData.get("product_image"));
        
            axios.post("http://localhost:8080/underdog/product/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response)=>console.log("Product added successfully:", response.data))
            .catch((error)=>console.error("Error adding product:", error));
    };

    return (
        <>
            {/* 페이지 로고 */}
            <div className={styles.container}>
                <h3>POST UNDERDOG</h3>
                <h1>상품 관리 페이지</h1>
            </div>

            {/* 상품 페이지 이동 버튼 */}
            <div id={styles.menu}>
                <button id={styles.listButton} className={styles.menuButton} onClick={goListPage}>상품 리스트</button>
                <button id={styles.addButton} className={styles.menuButton} style={{ backgroundColor: 'blue' }}>상품 추가</button>
            </div>

            {/* 상품 추가 메인  */}
            <div id={styles.main}>
                <div id={styles.add}>
                    {/* 설정한 상품 이미지 미리 보기 */}
                    <img id={styles.previewImage} alt="previewImage" src={previewImage} />
                    {/* 설정한 상품 데이터 전송 폼 */}
                    <form onSubmit={sendAddProductData}>
                        {/* 사용자가 이미지 업로드 하는 기능 */}
                        <label id={styles.imageButtonLabel} for="inputImageButton">상품 이미지 선택</label>
                        <input id="inputImageButton" type="file" accept='image/*' onChange={inputImage} style={{ display: "none" }} />
                        {/* 상품이름 설정 */}
                        <input className={styles.addSettingBox} id={styles.setNameBox} onChange={handleName} value={name} placeholder='상품 이름' />
                        {/* 판매가 설정 */}
                        <input className={styles.addSettingBox} id={styles.setPriceBox} onChange={handlePrice} value={price} placeholder='판매가' />
                        {/* 판매가 단위 설정 */}
                        <select className={styles.addSettingBox} id={styles.setPriceUnitBox} onChange={handlePriceUnit} value={priceUnit}>
                            <option value='개'>개</option>
                            <option value='1kg'>1kg</option>
                            <option value='100g'>100g</option>
                        </select>
                        {/* 원가 설정 */}
                        <input className={styles.addSettingBox} id={styles.setCostBox} onChange={handleCost} value={cost} placeholder='원가' />
                        {/* 원가 단위 설정 */}
                        <select className={styles.addSettingBox} id={styles.setCostUnitBox} onChange={handleCoastUnit} value={costUnit}>
                            <option value='개'>개</option>
                            <option value='1kg'>1kg</option>
                            <option value='100g'>100g</option>
                        </select>
                        {/* 할인가 설정 */}
                        <input className={styles.addSettingBox} id={styles.setDiscountBox} onChange={handleDiscount} value={discount} placeholder='할인가' />
                        {/* 이벤트 설정 */}
                        <select className={styles.addSettingBox} id={styles.setEventBox} onChange={handleEvent} value={event}>
                            <option value='없음'>없음</option>
                            <option value='특별행사'>특별 행사</option>
                            <option value='감사행사'>감사 행사</option>
                        </select>
                        {/* 분류 설정 */}
                        <select className={styles.addSettingBox} id={styles.setFirstCategoryBox} onChange={handleFirstCategory} value={firstCategory}>
                            <option value='기타'>기타</option>
                            <option value='식품'>식품</option>
                            <option value='의류'>의류</option>
                            <option value='pc기기'>pc기기</option>
                        </select>
                        {/* 분류 설정2 */}
                        <select className={styles.addSettingBox} id={styles.setSecondCategoryBox} onChange={handleSecondCategory} value={secondCategory}>
                            <option value='기타'>기타</option>
                        </select>
                        {/* 판매 여부 설정 */}
                        <label id={styles.setSellingLabel}><input className={styles.addSettingBox} id={styles.setSellingBox} onChange={handleSelling} type="checkbox" checked={selling} />
                            판매
                        </label>
                        {/* 설정 완료 후 데이터 전송 버튼 */}
                        <input id={styles.addButton} type='submit' value="상품 추가" />
                    </form>

                </div>
            </div>
        </>
    );
};

export default ProductManage;
