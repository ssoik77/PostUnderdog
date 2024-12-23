import React, { useState } from 'react';
import axios from 'axios';
import styles from './Main.module.css';

const Main = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 사용자 정보 가져오기 함수
  const fetchUserInfo = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 이전 에러 초기화

      const m_id = localStorage.getItem('m_id'); // 로그인 시 저장된 ID
      if (!m_id) {
        setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8080/underdog/mypage/userinfo', {
        params: { m_id },
      });

      if (response.data.status === 'success') {
        setUserInfo(response.data);
        setShowPopup(true); // 팝업 표시
      } else {
        setError("사용자 정보를 불러올 수 없습니다.");
      }
    } catch (err) {
      console.error('사용자 정보 로드 중 오류:', err);
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 생년월일 형식 변환 함수
  const formatBirthDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <h1>메인 페이지</h1>
      </header>

      <button className={styles.button} onClick={fetchUserInfo}>
        내 정보 보기
      </button>

      {loading && <p>정보를 불러오는 중...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {showPopup && userInfo && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>사용자 정보</h2>
            <p><strong>아이디:</strong> {userInfo.memberInfo.m_id}</p>
            <p><strong>이름:</strong> {userInfo.employeeInfo.e_name}</p>
            <p><strong>생년월일:</strong> {formatBirthDate(userInfo.employeeInfo.e_birth)}</p>
            <p><strong>연락처:</strong> {userInfo.employeeInfo.e_tel_num}</p>
            <button className={styles.closeButton} onClick={closePopup}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
