import React, { useState } from "react";
import styles from './Find.module.css'; // CSS 모듈 파일
import axios from 'axios';

const Find = () => {
    // 상태 관리
    const [mobileCarrier, setMobileCarrier] = useState(""); // 통신사 선택 저장
    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [modalContent, setModalContent] = useState(null); // 모달에 표시될 내용
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림 상태

    // 통신사 선택 변경 핸들러
    const selectCarrier = (e) => setMobileCarrier(e.target.value);

    // 전화번호 입력 핸들러
    const handleTel1Change = (e) => setTel1(e.target.value); // 첫 번째 자리 값 저장
    const handleTel2Change = (e) => setTel2(e.target.value); // 두 번째 자리 값 저장
    const handleTel3Change = (e) => setTel3(e.target.value); // 세 번째 자리 값 저장

    // 모달 열기 함수
    const openModal = (content) => {
        setModalContent(content); // 모달에 표시할 내용을 설정
        setIsModalOpen(true); // 모달 상태를 열림으로 변경
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false); // 모달 상태를 닫음으로 변경
        setModalContent(null); // 모달 내용을 초기화
    };

    // 데이터 전송 함수
    const sendFindData = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        // 환경 변수(API URL) 확인
        const apiUrl = process.env.REACT_APP_API_URL; // 환경 변수에서 API URL 가져오기
        if (!apiUrl) {
            console.error("API URL이 설정되지 않았습니다.");
            alert("서버 설정 오류: 관리자에게 문의하세요.");
            return;
        }

        // 전화번호 검증 로직
        const phoneNumber = `${tel1}${tel2}${tel3}`; // 전화번호 세 부분을 합침
        const isValidPhoneNumber = tel1.length === 3 && tel2.length === 4 && tel3.length === 4 && /^\d+$/.test(phoneNumber); // 숫자 여부 및 길이 검증

        if (!isValidPhoneNumber) {
            alert("올바른 전화번호를 입력해주세요."); // 유효하지 않은 경우 사용자에게 알림
            return;
        }

        // 전송할 데이터 객체 생성
        const FindData = {
            e_carrier: mobileCarrier, // 통신사 정보
            e_tel_num: phoneNumber, // 전화번호
        };

        try {
            // 서버로 데이터 전송
            const response = await axios.post(`${apiUrl}/underdog/find/set`, FindData);

            // 서버 응답에서 ID를 가져오거나 기본값 설정
            const id = response.data?.id || "unknown";

            // 성공 시 모달에 결과 표시
            openModal(
                <div>
                    <h1 className={styles.popupTitle}>아이디 찾기 성공</h1>
                    <p>고객님의 아이디는 다음과 같습니다:</p>
                    <p><strong>{id}</strong></p>
                    <button className={styles.popupButton} onClick={closeModal}>닫기</button>
                </div>
            );
        } catch (error) {
            // 에러 발생 시 처리
            console.error(error);
            const errorMessage = error.response?.data?.message || "아이디 찾기에 실패했습니다. 다시 시도해주세요."; // 서버에서 반환된 에러 메시지 또는 기본 메시지
            alert(errorMessage);
        }
    };

    return (
        <div>
            <form onSubmit={sendFindData}>
                {/* 이름 및 생년월일 입력 필드 */}
                <div id={styles.registerContainer}>
                    <div id={styles.nameGroup}>
                        <label htmlFor="name" id={styles.nameLabel}>이름</label>
                        <input
                            type="text"
                            id="nameInput"
                            name="name"
                            placeholder="이름 입력"
                            className={styles.input}
                            required
                        />
                    </div>
                    <div id={styles.birthGroup}>
                        <label htmlFor="birthdate" className={styles.birthLabel}>생년월일</label>
                        <input
                            type="text"
                            id="birthInput"
                            name="birthdate"
                            placeholder="예: 19990101"
                            className={styles.input}
                            pattern="\d{8}" // 숫자 8자리 (YYYYMMDD)
                            title="생년월일을 YYYYMMDD 형식으로 입력하세요."
                            required
                        />
                    </div>
                </div>

                {/* 통신사 선택 필드 */}
                <select id={styles.carrierSelectBox} onChange={selectCarrier} value={mobileCarrier} required>
                    <option value="" disabled>-- 통신사 선택 --</option> {/* 기본값 */}
                    <option value="SkT">SKT</option>
                    <option value="KT">KT</option>
                    <option value="LGU+">LGU+</option>
                    <option value="알뜰폰">알뜰폰</option>
                </select>

                {/* 전화번호 입력 필드 */}
                <label htmlFor="tel">전화번호:</label>
                <input
                    type="tel"
                    id={styles.tel_1}
                    style={{ width: '50px' }}
                    maxLength="3"
                    value={tel1}
                    onChange={handleTel1Change}
                    required
                /> -
                <input
                    type="tel"
                    id={styles.tel_2}
                    style={{ width: '80px' }}
                    maxLength="4"
                    pattern="\d{4}"
                    value={tel2}
                    onChange={handleTel2Change}
                    required
                /> -
                <input
                    type="tel"
                    id={styles.tel_3}
                    style={{ width: '80px' }}
                    maxLength="4"
                    pattern="\d{4}"
                    value={tel3}
                    onChange={handleTel3Change}
                    required
                />

                {/* 제출 버튼 */}
                <button type="submit" className={styles.button}>완료</button>
            </form>

            {/* 모달 창 */}
            {isModalOpen && ( // 모달이 열려 있을 경우만 렌더링
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        {modalContent} {/* 모달에 표시할 내용 */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Find;
