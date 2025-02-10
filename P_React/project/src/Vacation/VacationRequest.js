import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import styles from '../vacation/VacationConfirm.module.css';
import stylesVacation from './VacationRequest.module.css'; // CSS Modules 파일

const VacationRequest = () => {
  const navigate = useNavigate();
  const authority = sessionStorage.getItem('authority') || localStorage.getItem('authority');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    m_id: '',
    e_name: '',
  });

  useEffect(()=>{
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if(!loginId){
      navigate("/"); 
    }
  },[navigate])
  
  const [vacations, setVacations] = useState([]);
  const [nextVacationId, setNextVacationId] = useState(1);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const externalEventsRef = useRef(null);
  const trashBinRef = useRef(null);

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

    new Draggable(externalEventsRef.current, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return { title: eventEl.innerText };
      },
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, mId: formData.m_id, eName: formData.e_name };
    delete payload.m_id;
    delete payload.e_name;

    try {
      console.log('전송 데이터:', payload);
      let response;
      if (selectedVacation) {
        response = await axios.put(
          `http://localhost:8080/underdog/vacations/${selectedVacation.vacationId}`,
          payload,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post('http://localhost:8080/underdog/vacations', payload, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
      }

      console.log('응답 데이터:', response.data);

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
          setVacations((prev) =>
            prev.map((vacation) =>
              vacation.vacationId === selectedVacation.vacationId ? response.data : vacation
            )
          );
        } else {
          setVacations((prev) => [...prev, response.data]);
          setNextVacationId((prevId) => prevId + 1);
        }
        setIsModalOpen(false);
        setSelectedVacation(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("인증에 실패했습니다. 다시 로그인해주세요.");
      } else {
        console.error('휴가 신청 중 오류 발생:', error);
        alert('휴가 신청 중 문제가 발생했습니다.');
      }
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
    const startDate = new Date(info.startStr);
    const endDate = new Date(info.endStr);
    const modalEndDate = new Date(endDate);
    modalEndDate.setDate(modalEndDate.getDate() - 1);
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedModalEndDate = modalEndDate.toISOString().slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      startDate: formattedStartDate,
      endDate: formattedModalEndDate,
    }));

    setIsModalOpen(true);
  };

  const handleEventReceive = (info) => {
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
      if (
        info.jsEvent.clientX >= trashBinRect.left &&
        info.jsEvent.clientX <= trashBinRect.right &&
        info.jsEvent.clientY >= trashBinRect.top &&
        info.jsEvent.clientY <= trashBinRect.bottom
      ) {
        handleDelete(info.event.id);
      }
    }
  };

  const calendarEvents = vacations.map((vacation) => {
    const vacationTitle = vacation.e_name
      ? `${vacation.e_name}의 휴가`
      : `${formData.e_name}의 휴가`;
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);
    if (isNaN(startDate) || isNaN(endDate)) {
      console.error('유효하지 않은 날짜 값:', vacation.startDate, vacation.endDate);
      return null;
    }
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = adjustedEndDate.toISOString();
    return {
      id: String(Number(vacation.vacationId)),
      title: vacationTitle,
      start: formattedStartDate,
      end: formattedEndDate,
    };
  }).filter((event) => event !== null);

  return (
    <div className={styles.emp}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <Link to="/vacationconfirm">휴가 내역</Link>
          <Link to="/vacationrequest">휴가 신청</Link>
          {authority === "true" && (
            <>
              <Link to="/vacationapproval?no=1">휴가 승인</Link>
              <Link to="/employeeadd?no=1">직원 추가</Link>
            </>
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
          <h1 className={stylesVacation.vacationTitle}>휴가 신청</h1>
          <div ref={externalEventsRef} className={stylesVacation.externalEvents}>
          </div>

          {/* 쓰레기통 영역 */}
          <div ref={trashBinRef} className={stylesVacation.trashBin}>
            🗑️
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dayMaxEvents={2}
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
            droppable={true}
            selectable={true}
            select={handleDateSelect}
            eventReceive={handleEventReceive}
            eventDragStop={handleEventDragStop}
            eventContent={(arg) => {
              // CSS Modules의 customEvent 클래스를 적용하여 스타일을 지정합니다.
              return (
                <div className={stylesVacation.customEvent}>
                  {arg.event.title} 
                </div>
              );
            }}
            height="auto"
          />

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
                      onClick={() => setIsModalOpen(false)}
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
