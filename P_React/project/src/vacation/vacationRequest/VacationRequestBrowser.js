import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './VacationRequestBrowser.module.css'; // CSS Modules 파일

const convertDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return "";
  const [year, month, day] = dateArray;
  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;
  return `${year}-${mm}-${dd}`;
};

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

  useEffect(() => {
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if (!loginId) {
      navigate("/");
    }
  }, [navigate])

  const [vacations, setVacations] = useState([]);
  const [nextVacationId, setNextVacationId] = useState(1);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const externalEventsRef = useRef(null);

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=700,height=400,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  // 로그인 정보를 기반으로 사용자 정보 가져오기 및 초기화
  const myVacation = () => {
      setSelectedTeam(null);
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
  };

  const selectTeamvacation = (teamName) => {
    console.log(teamName);
    axios
      .post("http://localhost:8080/underdog/vacations/select/list", teamName, {
        headers: { "Content-Type": "text/plain; charset=UTF-8" },
        withCredentials: true,
      })
      .then((response) => {
        console.log("전체 휴가 데이터:", response.data);
        setVacations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vacations:", error);
        alert("휴가 신청 목록을 불러오는 중 문제가 발생했습니다.");
      });
  };

  const allVacation = () => {
      setSelectedTeam(null);
    axios
      .post("http://localhost:8080/underdog/vacations/listAll", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log("전체 휴가 데이터:", response.data);
        setVacations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vacations:", error);
        alert("휴가 신청 목록을 불러오는 중 문제가 발생했습니다.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      m_id: sessionStorage.getItem('m_id') || localStorage.getItem('m_id'),
      e_name: sessionStorage.getItem('e_name') || localStorage.getItem('e_name')
    };
    console.log("🚀 전송할 데이터:", payload);  // 디버깅 로그 추가
    try {
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
    const m_id = sessionStorage.getItem('m_id') || localStorage.getItem('m_id');

    if (!m_id) {
      alert("사용자 인증 정보가 없습니다. 다시 로그인하세요.");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8080/underdog/vacations/${vacationId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { m_id },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert('신청된 휴가가 삭제되었습니다.');
        setVacations((prev) => prev.filter((vacation) => vacation.vacationId !== vacationId));
        setIsModalOpen(false);
        setSelectedVacation(null);
        setModalMode("create");
      }
    } catch (error) {
      console.error('휴가 삭제 중 오류 발생:', error);
      alert('휴가 삭제 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/employee")
      .then((response) => {
        const formattedTeams = response.data.reduce((acc, employee) => {
          const eName = employee.e_name;
          const teamName = employee.e_team;
          if (!acc[teamName]) {
            acc[teamName] = {
              name: `${teamName} 팀`,
              children: [],
            };
          }
            if (!acc[teamName].children.some(member => member.name === eName)) {
              acc[teamName].children.push({
                name: employee.e_name,
                position: employee.e_level,
                tel: employee.e_tel_num,
              });
            }
          return acc;
        }, {});
        setTeams(formattedTeams);

        console.log("팀:", response.data);
      })
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

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
    setSelectedVacation(null);
    setModalMode("create");
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

  const handleEventClick = (info) => {
    const vacationId = info.event.id;
    const vacation = vacations.find((v) => String(v.vacationId) === vacationId);
    if (vacation) {
      if (vacation.m_id !== (sessionStorage.getItem('m_id') || localStorage.getItem('m_id')) ||
        vacation.e_name !== (sessionStorage.getItem('e_name') || localStorage.getItem('e_name'))) {
        alert("타인의 휴가 신청은 수정할 수 없습니다.");
        return;
      }
      setSelectedVacation(vacation);
      setModalMode("edit");
      setIsModalOpen(true);
      setFormData({
        startDate: Array.isArray(vacation.startDate)
          ? convertDate(vacation.startDate)
          : vacation.startDate,
        endDate: Array.isArray(vacation.endDate)
          ? convertDate(vacation.endDate)
          : vacation.endDate,
        reason: vacation.reason,
        m_id: vacation.m_id,
        e_name: vacation.e_name,
        approval: 0
      });
    }
  };

  const handleTeamClick = (teamName) => {
    if (selectedTeam === teamName) {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(teamName);
      selectTeamvacation(teamName);
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
      approval: vacation.approval,
    };
  }).filter((event) => event !== null);

  const renderEventContent = (arg) => {
    const isApproved = Number(arg.event.extendedProps.approval);
    return (
      <div className={isApproved === 0 ? styles.customEvent : (isApproved === 1 ? styles.approvedEvent : styles.rejectionEvent)}>
        {arg.event.title} [{isApproved === 0 ? '승인 대기중' : (isApproved === 1 ? '승인 완료' : '반려 됨')}]
      </div>
    );
  };

  return (
    <div className={styles.emp}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
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

      <main className={styles.mainContainer}>
        <div className={styles.teamBox}>
          <h3>명단</h3>
          <button onClick={myVacation} className={styles.teamButton}>내 휴가</button>
          {Object.keys(teams).map((team) => (
            <div key={team} className={styles.teamSection}>
              <button
                className={`${styles.teamButton} ${selectedTeam === team ? styles.activeTeamButton : ""
                  }`}
                onClick={() => handleTeamClick(team)}
                aria-pressed={selectedTeam === team}
              >
                {teams[team].name}
              </button>
              {selectedTeam === team && (
                <ul className={styles.memberList}>
                  {teams[team].children.map((member, index) => (
                    <li key={index} className={styles.memberItem}>
                      <span className={styles.memberName}>{member.name}</span>
                      <span className={styles.memberPosition}>{member.position}</span>
                      <span className={styles.memberTel}>{member.tel}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <button onClick={allVacation} className={styles.teamButton}>전체 휴가</button>
        </div>

        <div className={styles.vacationContainer}>
          <div ref={externalEventsRef} className={styles.externalEvents}>
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
            editable={false}
            droppable={false}
            selectable={true}
            select={handleDateSelect}
            eventReceive={handleEventReceive}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            height="auto"
          />

          {isModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <h2>{modalMode === "edit" ? '휴가 수정' : '휴가 신청'}</h2>
                <form onSubmit={handleSubmit} className={styles.vacationForm}>
                  <div className={styles.formGroup}>
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
                  <div className={styles.formGroup}>
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
                  <div className={styles.formGroup}>
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
                    <button type="submit" className={styles.submitButton}>
                      {modalMode === "edit" ? '휴가 수정' : '휴가 신청'}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedVacation(null);
                        setModalMode("create");
                      }}
                    >
                      취소
                    </button>
                    {modalMode === "edit" && (
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => handleDelete(selectedVacation.vacationId)}
                      >
                        휴가 삭제
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VacationRequest;