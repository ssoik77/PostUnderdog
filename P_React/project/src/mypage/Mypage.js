import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Mypage.module.css';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [error, setError] = useState(null); // 에러 상태

  // 사용자 정보 가져오기
  useEffect(() => {
    const m_id = localStorage.getItem('m_id'); // 로그인 시 저장된 ID
    if (!m_id) {
      setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    axios
      .get('http://localhost:8080/underdog/mypage/userinfo', { params: { m_id } })
      .then((response) => {
        if (response.data.status === 'success') {
          setUserInfo(response.data);
        } else {
          setError("사용자 정보를 불러올 수 없습니다.");
        }
      })
      .catch(() => setError("서버 오류가 발생했습니다."));
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.mypageContainer}>
      <h2>사용자 정보</h2>
      {userInfo ? (
        <div className={styles.infoBox}>
          <p><strong>아이디:</strong> {userInfo.memberInfo.m_id}</p>
          <p><strong>이름:</strong> {userInfo.employeeInfo.e_name}</p>
          <p><strong>생년월일:</strong> {new Date(userInfo.employeeInfo.e_birth).toISOString().split('T')[0]}</p>
          <p><strong>연락처:</strong> {userInfo.employeeInfo.e_tel_num}</p>
        </div>
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Mypage;
