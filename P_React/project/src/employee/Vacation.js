import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from '../employee/Employeemain.module.css';
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
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 팝업 상태 관리
  const [selectedVacation, setSelectedVacation] = useState(null); // 선택된 휴가 정보

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
      vacationId: selectedVacation ? selectedVacation.vacationId : nextVacationId, // 기존 휴가 수정 또는 새로운 휴가 생성
    };

    try {
      console.log('전송 데이터:', payload); // 요청 데이터 로그

      let response;
      if (selectedVacation) {
        // 기존 휴가 수정
        response = await axios.put(
          `http://localhost:8080/underdog/vacations/${selectedVacation.vacationId}`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
      } else {
        // 새로운 휴가 신청
        response = await axios.post('http://localhost:8080/underdog/vacations', payload, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
      }

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

        if (selectedVacation) {
          // 수정된 휴가 목록 업데이트
          setVacations((prev) =>
            prev.map((vacation) =>
              vacation.vacationId === selectedVacation.vacationId ? response.data : vacation
            )
          );
        } else {
          // 새로운 휴가 추가
          setVacations((prev) => [...prev, response.data]);
          setNextVacationId((prevId) => prevId + 1); // 다음 ID 증가
        }
        setIsModalOpen(false); // 팝업 닫기
        setSelectedVacation(null); // 선택된 휴가 초기화
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

  const handleDateSelect = (info) => {
    // UTC로 받아온 날짜를 로컬 시간대로 변환
    const startDate = new Date(info.startStr);
    const endDate = new Date(info.endStr);

    // 로컬 시간대로 변환하여 문자열로 포맷팅
    const formattedStartDate = startDate.toISOString().slice(0, 10);

    // 모달에 표시할 종료 날짜를 하루 줄임
    const modalEndDate = new Date(endDate);
    modalEndDate.setDate(modalEndDate.getDate() - 1);
    const formattedModalEndDate = modalEndDate.toISOString().slice(0, 10);

    // 모달에 날짜 설정
    setFormData({
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedModalEndDate,
    });

    // 모달 열기
    setIsModalOpen(true);
  };

  // 휴가 데이터를 FullCalendar에 맞는 형식으로 변환
  const calendarEvents = vacations.map((vacation) => {
    const vacationTitle = vacation.e_name ? `${vacation.e_name}의 휴가` : `${formData.e_name}의 휴가`; // e_name이 없으면 formData.e_name 사용

    // 날짜를 로컬 타임존으로 변환
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);

    // 날짜 값이 유효한지 확인
    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('유효하지 않은 날짜 값:', vacation.startDate, vacation.endDate);
      return null; // 유효하지 않은 날짜 값은 무시
    }

    // 로컬 시간대로 변환하여 FullCalendar에 맞게 형식화
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    return {
      id: String(Number(vacation.vacationId)), // vacationId를 숫자로 변환
      title: vacationTitle,
      start: formattedStartDate,
      end: formattedEndDate,
    };
  }).filter(event => event !== null); // 유효하지 않은 이벤트는 필터링

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

      <div className={stylesVacation.vacationMainBox}>
        <div className={stylesVacation.vacationContainer}>
          <h1 className={stylesVacation.vacationTitle}>휴가 관리 캘린더</h1>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek'
            }}
            views={{
              dayGridMonth: { buttonText: '월간' },
              dayGridWeek: { buttonText: '주간' }
            }}
            events={calendarEvents}
            editable={true}
            selectable={true}
            select={handleDateSelect} // 드래그로 날짜 범위 선택 시 실행
            eventClick={(info) => handleDelete(info.event.id)} // 일정 클릭 시 삭제
            height="auto"
          />

          {/* 휴가 신청 버튼 */}
          <button
            className={stylesVacation.submitButton}
            onClick={() => setIsModalOpen(true)} // 버튼 클릭 시 모달 열기
          >
            휴가 신청
          </button>
        
          {/* 팝업 모달 */}
          {isModalOpen && (
            <div className={stylesVacation.modalOverlay}>
              <div className={stylesVacation.modalContent}>
                <h2>{selectedVacation ? '휴가 수정' : '휴가 신청'}</h2>
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
                  <div>
                    <button type="submit" className={stylesVacation.submitButton}>
                      {selectedVacation ? '휴가 수정' : '휴가 신청'}
                    </button>
                    <button
                      type="button"
                      className={stylesVacation.cancelButton}
                      onClick={() => setIsModalOpen(false)} // 팝업 닫기
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vacation;