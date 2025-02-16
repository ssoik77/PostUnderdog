import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MypageMobile.module.css';
import { useNavigate } from "react-router-dom";

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.2:8080/underdog";

const MypageMobile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    m_id: '',
    m_pw: '',
    authority: false,
    e_name: '',
    e_birth: '',
    e_carrier: '',
    e_tel_num: '',
    m_key: null,
  });

  const m_id = localStorage.getItem('m_id') || sessionStorage.getItem('m_id');

  useEffect(() => {
    const fetchUserInfo = async () => {
      setError(null);

      if (!m_id) {
        setError('로그인 정보가 없습니다. 다시 로그인해주세요.');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/mypage/userinfo`, { params: { m_id } });

        if (response.data.status === 'success') {
          setUserInfo(response.data);

          const member = response.data.memberInfo;
          const employee = response.data.employeeInfo;

          setFormData({
            m_id: member.m_id,
            m_pw: member.m_pw,
            authority: member.authority,
            e_name: employee.e_name,
            e_birth: employee.e_birth,
            e_carrier: employee.e_carrier,
            e_tel_num: employee.e_tel_num,
            e_key: employee.e_key,
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
  }, [m_id]);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
  
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/mypage/updateInfo`, formData);

      if (response.data.status === 'success') {
        alert('수정이 완료되었습니다.');
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
        setEditMode(false);
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
          <form className={styles.editBox} onSubmit={handleSubmit}>
            <div>
              <label>비밀번호:</label>
              <input type="password" name="m_pw" value={formData.m_pw} onChange={handleInputChange} placeholder="비밀번호"/>
            </div>
            <div>
              <label>이름:</label>
              <input type="text" name="e_name" value={formData.e_name} onChange={handleInputChange} placeholder="이름"/>
            </div>
            <div>
              <label>생년월일:</label>
              <input type="date" name="e_birth" value={formData.e_birth} onChange={handleInputChange}/>
            </div>
            <div>
              <label>연락처:</label>
              <input type="text" name="e_tel_num" value={formData.e_tel_num} onChange={handleInputChange} placeholder="연락처"/>
            </div>
            <div className={styles.editButtonBox}>
              <button className={styles.SaveButton} type="submit">저장</button>
              <button className={styles.EditCancleButton} type="button" onClick={() => setEditMode(false)}>
                취소
              </button>
            </div>
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
            <div className={styles.myPageButtonBox}>
          <button onClick={() => navigate("/vacationRequest")} className={styles.BackButton}>돌아가기</button>
              <button className={styles.infoEditButton} onClick={() => setEditMode(true)}>정보 수정</button>
              <button className={styles.logoutButton} onClick={logout}>로그아웃</button>
            </div>
          </div>
        )
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MypageMobile;