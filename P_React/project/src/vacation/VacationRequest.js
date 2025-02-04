import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import styles from '../vacation/VacationConfirm.module.css';
import stylesVacation from './VacationRequest.module.css';

const VacationRequest = () => {
  const authority = sessionStorage.getItem('authority') || localStorage.getItem('authority');
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
  const externalEventsRef = useRef(null);
  const trashBinRef = useRef(null); // 쓰레기통 참조

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=700,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  // 로그인 정보를 기반으로 사용자 정보 가져오기 및 초기화
  useEffect(() => {
    const m_id = sessionStorage.getItem('m_id') || localStorage.getItem('m_id');
    const e_name = sessionStorage.getItem('e_name') || localStorage.getItem('e_name');
    if (m_id) {
      setFormData((prev) => ({ ...prev, m_id, e_name }));
    }

    const fetchVacations = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/underdog/vacations/list',
          { m_id: m_id, e_name: e_name },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
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

    if (m_id) {
      fetchVacations({ m_id, e_name });
    }

    // 외부 드래그 가능한 요소 초기화
    new Draggable(externalEventsRef.current, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText,
        };
      },
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
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

    // 모달에 표시할 종료 날짜를 하루 줄임
    const modalEndDate = new Date(endDate);
    modalEndDate.setDate(modalEndDate.getDate() - 1);

    // 로컬 시간대로 변환하여 문자열로 포맷팅
    const formattedStartDate = startDate.toISOString().slice(0, 10);
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

  const handleEventReceive = (info) => {
    // 드래그 앤 드롭된 이벤트 처리
    const newEvent = {
      id: String(nextVacationId),
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
    };

    setVacations((prev) => [...prev, newEvent]);
    setNextVacationId((prevId) => prevId + 1);
  };

  const handleEventDragStop = (info) => {
    const trashBin = trashBinRef.current;

    if (trashBin) {
      const trashBinRect = trashBin.getBoundingClientRect();

      // 이벤트가 쓰레기통 영역에 드롭되었는지 확인
      if (
        info.jsEvent.clientX >= trashBinRect.left &&
        info.jsEvent.clientX <= trashBinRect.right &&
        info.jsEvent.clientY >= trashBinRect.top &&
        info.jsEvent.clientY <= trashBinRect.bottom
      ) {
        // 이벤트 삭제
        handleDelete(info.event.id);
      }
    }
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

    // 종료 날짜를 하루 늘림
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

    // 로컬 시간대로 변환하여 FullCalendar에 맞게 형식화
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = adjustedEndDate.toISOString();

    return {
      id: String(Number(vacation.vacationId)), // vacationId를 숫자로 변환
      title: vacationTitle,
      start: formattedStartDate,
      end: formattedEndDate,
    };
  }).filter(event => event !== null); // 유효하지 않은 이벤트는 필터링

  return (
    <div className={styles.emp}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/vacationconfirm">휴가 내역</a>
          <a href="/vacationrequest">휴가 신청</a>
            {authority === "true" && (<>
              <a href="/vacationapproval?no=1">휴가 승인</a>
              <a href="/employeeadd?no=1">직원 추가</a></>
          )}
        </nav>
        <div className={styles.info}>
          <a href="/Mypage" onClick={openPopup} className={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>

      <div className={stylesVacation.vacationMainBox}>
        <div className={stylesVacation.vacationContainer}>
          <h1 className={stylesVacation.vacationTitle}>휴가 관리 캘린더</h1>
          <div ref={externalEventsRef} className={stylesVacation.externalEvents}>
            <div className="fc-event">휴가</div>
          </div>

          {/* 쓰레기통 영역 */}
          <div ref={trashBinRef} className={stylesVacation.trashBin}>
            🗑️
          </div>

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
            droppable={true} // 외부 드래그 가능
            selectable={true}
            select={handleDateSelect} // 드래그로 날짜 범위 선택 시 실행
            eventReceive={handleEventReceive} // 외부 이벤트 드래그 앤 드롭 시 실행
            eventDragStop={handleEventDragStop} // 이벤트 드래그 종료 시 실행
            height="auto"
          />
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

export default VacationRequest;
