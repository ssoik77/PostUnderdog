import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Mypage.module.css';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [error, setError] = useState(null); // 에러 상태
  const [editMode, setEditMode] = useState(false); // 수정 모드 상태
  const [formData, setFormData] = useState({
    m_id: '',
    m_pw: '',
    a_authority: false,
    p_authority: false,
    e_authority: false,
    e_name: '',
    e_birth: '',
    e_carrier: '',
    e_tel_num: '',
    m_key: null,
  });
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
          const member = response.data.memberInfo;
          const employee = response.data.employeeInfo;
          setFormData({
            m_id: member.m_id,
            m_pw: member.m_pw,
            a_authority: member.a_authority,
            p_authority: member.p_authority,
            e_authority: member.e_authority,
            e_name: employee.e_name,
            e_birth: new Date(employee.e_birth).toISOString().split('T')[0],
            e_carrier: employee.e_carrier,
            e_tel_num: employee.e_tel_num,
            m_key: employee.m_key,
          });
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

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 수정 저장
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/underdog/mypage/updateInfo', formData)
      .then((response) => {
        if (response.data.status === 'success') {
          alert('수정 완료');
          setEditMode(false);
          window.location.reload();
        } else {
          alert('수정 실패');
        }
      })
      .catch(() => alert('서버 오류가 발생했습니다.'));
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.mypageContainer}>
      <h2>사용자 정보</h2>
      {userInfo ? (/*유저 데이터가 전송 되었으면 정보 출력*/
        editMode ? (/*editMode가 true면 정보 수정창으로 이동*/
          <form onSubmit={handleSubmit}>
            <div>
              <label>비밀번호:</label>
              <input
                type="password"
                name="m_pw"
                value={formData.m_pw}
                onChange={handleInputChange}
                placeholder="비밀번호"
              />
            </div>
            <div>
              <label>이름:</label>
              <input
                type="text"
                name="e_name"
                value={formData.e_name}
                onChange={handleInputChange}
                placeholder="이름"
              />
            </div>
            <div>
              <label>생년월일:</label>
              <input
                type="date"
                name="e_birth"
                value={formData.e_birth}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>연락처:</label>
              <input
                type="text"
                name="e_tel_num"
                value={formData.e_tel_num}
                onChange={handleInputChange}
                placeholder="연락처"
              />
            </div>
            <button type="submit">저장</button>
            <button type="button" onClick={() => setEditMode(false)}>
              취소
            </button>
          </form>
        ) : (
          <div className={styles.infoBox}>
            <p><strong>아이디:</strong> {userInfo.memberInfo.m_id}</p>
            <p><strong>이름:</strong> {userInfo.employeeInfo.e_name}</p>
            <p><strong>생년월일:</strong> 
            {userInfo.employeeInfo.e_birth
              ? new Date(userInfo.employeeInfo.e_birth).toISOString().split('T')[0]
              : '정보 없음'}
            </p>
            <p><strong>연락처:</strong> {userInfo.employeeInfo.e_tel_num}</p>
            
            {/* 수정 버튼 */}
            <button onClick={() => setEditMode(true)}>정보 수정</button>
            {/* 로그아웃 버튼 */}
            <button id={styles.logoutButton} onClick={logout}>로그아웃</button>
          </div>
        )
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </div>
  );
  
};

export default Mypage;
