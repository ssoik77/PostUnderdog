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
    const fetchUserInfo = async () => {
      setError(null); // 에러 초기화
      const m_id = localM_id == null ? sessionM_id : localM_id;

      if (!m_id) {
        setError('로그인 정보가 없습니다. 다시 로그인해주세요.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/underdog/mypage/userinfo', {
          params: { m_id },
        });

        if (response.data.status === 'success') {
          setUserInfo(response.data);

          const member = response.data.memberInfo;
          const employee = response.data.employeeInfo;

          // 상태 초기화
          setFormData({
            m_id: member.m_id,
            m_pw: member.m_pw,
            a_authority: member.a_authority,
            p_authority: member.p_authority,
            e_authority: member.e_authority,
            e_name: employee.e_name,
            e_birth: employee.e_birth,
            e_carrier: employee.e_carrier,
            e_tel_num: employee.e_tel_num,
            m_key: employee.m_key,
          });
        } else {
          setError('사용자 정보를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('서버 오류가 발생했습니다.');
      }
    };

    fetchUserInfo();
  }, [localM_id, sessionM_id]);

  const logout = () => {
    if (window.opener) {
      window.opener.sessionStorage.clear();
      window.opener.localStorage.clear();
      window.opener.location.reload(true);
    }
    window.close();
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 상태 업데이트
    setFormData({ ...formData, [name]: value });
  };

  // 수정 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/underdog/mypage/updateInfo', formData);

      if (response.data.status === 'success') {
        alert('수정이 완료되었습니다.');

        // 서버 응답으로 상태 업데이트
        const updatedEmployeeInfo = response.data.employeeInfo || {
          e_name: formData.e_name,
          e_birth: formData.e_birth,
          e_carrier: formData.e_carrier,
          e_tel_num: formData.e_tel_num,
        };

        setUserInfo((prevState) => ({
          ...prevState,
          employeeInfo: updatedEmployeeInfo,
        }));

        setEditMode(false); // 수정 모드 종료
      } else {
        alert('수정 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.mypageContainer}>
      <h2>사용자 정보</h2>
      {userInfo ? (
        editMode ? (
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
            <p>
              <strong>아이디:</strong> {userInfo.memberInfo.m_id}
            </p>
            <p>
              <strong>이름:</strong> {userInfo.employeeInfo.e_name}
            </p>
            <p>
              <strong>생년월일:</strong> {userInfo.employeeInfo.e_birth || '정보 없음'}
            </p>
            <p>
              <strong>연락처:</strong> {userInfo.employeeInfo.e_tel_num}
            </p>
            <button onClick={() => setEditMode(true)}>정보 수정</button>
            <button id={styles.logoutButton} onClick={logout}>
              로그아웃
            </button>
          </div>
        )
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Mypage;
