import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Mypage.module.css';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [error, setError] = useState(null); // 에러 상태
  const localM_id = localStorage.getItem('m_id'); // 로그인 시 저장된 ID
  const sessionM_id = sessionStorage.getItem('m_id'); // 로그인 시 저장된 ID

  // 사용자 정보 가져오기
  useEffect(() => {
    setError(null); // 에러 초기화
    if (!localM_id && !sessionM_id) {
      setError("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    const m_id = localM_id == null ? sessionM_id : localM_id;

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
  }, [localM_id, sessionM_id]);

  const logout = () => {
    // 스토리지에 데이터가 있을 경우 삭제
    if (window.opener) {
      window.opener.sessionStorage.clear(); // 부모 창의 sessionStorage 삭제
      window.opener.localStorage.clear(); // 부모 창의 localStorage 삭제 (필요한 경우)
    }
      // 부모 창 새로고침 및 팝업 닫기
      if (window.opener) {
        window.opener.location.reload(true);
      }
      window.close();
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.mypageContainer}>
      <h2>사용자 정보</h2>
      {userInfo ? (
        <div className={styles.infoBox}>
          <p><strong>아이디:</strong> {userInfo.memberInfo.m_id}</p>
          <p><strong>이름:</strong> {userInfo.employeeInfo.e_name}</p>
          <p><strong>생년월일:</strong> {new Intl.DateTimeFormat('ko-KR').format(new Date(userInfo.employeeInfo.e_birth))}</p>
          <p><strong>연락처:</strong> {userInfo.employeeInfo.e_tel_num}</p>
        </div>
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
      <button id={styles.logoutButton} onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Mypage;
