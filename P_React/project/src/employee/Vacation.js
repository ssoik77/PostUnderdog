import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../main/Main.module.css';
import stylesVacation from './Vacation.module.css';

const Vacation = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    m_id: '', // 사용자 ID
    e_name: '', // 사용자 이름
  });
  const [vacations, setVacations] = useState([]);
  const [nextVacationId, setNextVacationId] = useState(1); // 고유 vacationId 관리
  const [editingId, setEditingId] = useState(null); // 수정 중인 vacationId
  const [editData, setEditData] = useState({}); // 수정 데이터
  const [error, setError] = useState(null);

  // 로그인 정보를 기반으로 사용자 정보 가져오기 및 초기화
  useEffect(() => {
    const m_id = sessionStorage.getItem('m_id') || localStorage.getItem('m_id');
    const e_name = sessionStorage.getItem('e_name');
    if (m_id) {
      setFormData((prev) => ({ ...prev, m_id, e_name }));
    }

    const fetchVacations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/underdog/vacations/list', {
          withCredentials: true, // 세션 정보 포함
        });
        setVacations(response.data);

        // 가장 높은 vacationId를 찾아 다음 ID 설정
        if (response.data.length > 0) {
          const maxId = Math.max(...response.data.map((vacation) => vacation.vacationId));
          setNextVacationId(maxId + 1);
        }
      } catch (err) {
        console.error(err);
        setError('휴가 신청 목록을 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchVacations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      vacationId: nextVacationId, // 고유 ID 추가
    };

    try {
      console.log('전송 데이터:', payload); // 요청 데이터 로그

      const response = await axios.post('http://localhost:8080/underdog/vacations', payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log('응답 데이터:', response.data); // 성공 응답 로그

      if (response.status === 200) {
        alert('휴가 신청이 완료되었습니다.');
        setFormData({
          startDate: '',
          endDate: '',
          reason: '',
          m_id: formData.m_id,
          e_name: formData.e_name,
        });
        setVacations((prev) => [...prev, response.data]);

        // 다음 vacationId 증가
        setNextVacationId((prevId) => prevId + 1);
      }
    } catch (error) {
      console.error('휴가 신청 중 오류 발생:', error);
      alert('휴가 신청 중 문제가 발생했습니다.');
    }
  };

  const handleDelete = async (vacationId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/underdog/vacations/${vacationId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert('휴가 신청이 삭제되었습니다.');
        setVacations((prev) => prev.filter((vacation) => vacation.vacationId !== vacationId));
      }
    } catch (error) {
      console.error('휴가 삭제 중 오류 발생:', error);
      alert('휴가 삭제 중 문제가 발생했습니다.');
    }
  };

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  const startEditing = (vacation) => {
    setEditingId(vacation.vacationId);
    setEditData({
      startDate: vacation.startDate,
      endDate: vacation.endDate,
      reason: vacation.reason,
    });
  };

  const handleEdit = async (vacationId, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/underdog/vacations/${vacationId}`,
        updatedData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        alert('휴가 신청이 수정되었습니다.');
        setVacations((prev) =>
          prev.map((vacation) =>
            vacation.vacationId === vacationId
              ? { ...vacation, ...updatedData }
              : vacation
          )
        );
      }
    } catch (error) {
      console.error('휴가 수정 중 오류 발생:', error);
      alert('휴가 수정 중 문제가 발생했습니다.');
    }
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/employeemain">조직도</a>
          <a href="/vacation">휴가 관리</a>
        </nav>
      </header>

      <div className={styles.mainBox}>
        <div className={stylesVacation.vacationContainer}>
          <h1 className={stylesVacation.vacationTitle}>휴가 신청</h1>
          <form onSubmit={handleSubmit} className={stylesVacation.vacationForm}>
            <div className={stylesVacation.formGroup}>
              <label htmlFor="startDate">시작 날짜</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={stylesVacation.formGroup}>
              <label htmlFor="endDate">종료 날짜</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={stylesVacation.formGroup}>
              <label htmlFor="reason">사유</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="휴가 사유를 입력하세요"
                required
              ></textarea>
            </div>
            <button type="submit" className={stylesVacation.submitButton}>
              휴가 신청
            </button>
          </form>

          <h2>내 휴가 신청 목록</h2>
          <div className={stylesVacation.scrollableList}>
          {vacations.length > 0 ? (
            <ul>
              {vacations.map((vacation) => (
  <li key={vacation.vacationId}>
    {editingId === vacation.vacationId ? (
      <>
        <input
          type="date"
          value={editData.startDate}
          onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
        />
        <input
          type="date"
          value={editData.endDate}
          onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
        />
        <textarea
          value={editData.reason}
          onChange={(e) => setEditData({ ...editData, reason: e.target.value })}
        />
        <button onClick={() => handleEdit(vacation.vacationId, editData)}>저장</button>
        <button onClick={() => setEditingId(null)}>취소</button>
      </>
    ) : (
      <>
        <p><strong>휴가 기간:</strong> {vacation.startDate} ~ {vacation.endDate}</p>
        <p><strong>사유:</strong> {vacation.reason}</p>
        <button onClick={() => startEditing(vacation)}>수정</button>
        <button onClick={() => handleDelete(vacation.vacationId)}>삭제</button>
      </>
    )}
  </li>
))}
            </ul>
          ) : (
            <p>신청된 휴가가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Vacation;
