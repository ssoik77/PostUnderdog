import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './DispatchBrowser.module.css'; // CSS Modules 파일

const convertDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return "";
  const [year, month, day] = dateArray;
  const mm = month < 10 ? `0${month}` : month;
  const dd = day < 10 ? `0${day}` : day;
  return `${year}-${mm}-${dd}`;
};

const DispatchRequest = () => {
  const navigate = useNavigate();
  const authority = sessionStorage.getItem('authority') || localStorage.getItem('authority');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    dispatchWhere: '',
    dispatchPayment: '',
    dispatchDetail: '',
    dispatchComplete: '',
    m_id: '',
    e_name: '',
    e_key: ''
  });

  useEffect(() => {
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if (!loginId) {
      navigate("/");
    }
  }, [navigate])

  const [dispatches, setDispatches] = useState([]);
  const [nextDispatchId, setNextDispatchId] = useState(1);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // "create" or "edit"
  const externalEventsRef = useRef(null);
  const [dispatchComplete, setDispatchComplete] = useState(formData.dispatchComplete == 1 ? true : false);
  const [dispatchInProgress, setDispatchInProgress] = useState(!dispatchComplete);

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=700,height=400,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  useEffect(()=>{
    myDispatch();
  },[])


  // 로그인 정보를 기반으로 사용자 정보 가져오기 및 초기화
  const myDispatch = () => {
    setSelectedTeam(null);
    const m_id = sessionStorage.getItem('m_id') || localStorage.getItem('m_id');
    const e_name = sessionStorage.getItem('e_name') || localStorage.getItem('e_name');
    const e_key = sessionStorage.getItem('e_key') || localStorage.getItem('e_key');
    
    if (m_id) {
      setFormData((prev) => ({ ...prev, m_id, e_name, e_key }));
    }
    
    const fetchDispatchs = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/underdog/dispatch/list',
          { m_id: m_id, e_name: e_name, e_key: e_key },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setDispatches(response.data);
        console.log(response.data);

        if (response.data.length > 0) {
          const maxId = Math.max(...response.data.map((dispatch) => dispatch.dispatchId));
          setNextDispatchId(maxId + 1);
        }
      } catch (err) {
        console.error(err);
        setError('파견 신청 목록을 불러오는 중 문제가 발생했습니다.');
      }
    };
    
    if (m_id) {
      fetchDispatchs({ m_id, e_name, e_key });
    }
  };
  
  const selectTeamdispatch = (teamName) => {
    console.log(teamName);
    axios
    .post("http://localhost:8080/underdog/dispatch/select/list", teamName, {
        headers: { "Content-Type": "text/plain; charset=UTF-8" },
        withCredentials: true,
      })
      .then((response) => {
        console.log("전체 파견 데이터:", response.data);
        setDispatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dispatchs:", error);
        alert("파견 신청 목록을 불러오는 중 문제가 발생했습니다.");
      });
    };
    
    const allDispatch = () => {
      setSelectedTeam(null);
      axios
      .post("http://localhost:8080/underdog/dispatch/listAll", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log("전체 파견 데이터:", response.data);
        setDispatches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dispatchs:", error);
        alert("파견 신청 목록을 불러오는 중 문제가 발생했습니다.");
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
        e_name: sessionStorage.getItem('e_name') || localStorage.getItem('e_name'),
        e_key: sessionStorage.getItem('e_key') || localStorage.getItem('e_key')
      };
      console.log("🚀 전송할 데이터:", payload);  // 디버깅 로그 추가
      try {
        let response;
        if (selectedDispatch) {
          response = await axios.put(
            `http://localhost:8080/underdog/dispatch/${selectedDispatch.dispatchId}`,
            payload,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          );
        } else {
          response = await axios.post('http://localhost:8080/underdog/dispatch', payload, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          });
        }
        
        if (response.status === 200) {
          alert('파견 신청이 완료되었습니다.');
          setFormData({
            startDate: '',
            endDate: '',
            dispatchWhere: '',
            dispatchPayment: '',
            dispatchDetail: '',
            dispatchComplete: '',
          m_id: formData.m_id,
          e_name: formData.e_name,
          e_key: formData.e_key,
        });
        
        if (selectedDispatch) {
          setDispatches((prev) =>
            prev.map((dispatch) =>
              dispatch.dispatchId === selectedDispatch.dispatchId ? response.data : dispatch
        )
      );
    } else {
      setDispatches((prev) => [...prev, response.data]);
      setNextDispatchId((prevId) => prevId + 1);
    }
    setIsModalOpen(false);
    setSelectedDispatch(null);
    window.location.reload();
  }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("인증에 실패했습니다. 다시 로그인해주세요.");
      } else {
        console.error('파견 신청 중 오류 발생:', error);
        alert('파견 신청 중 문제가 발생했습니다.');
      }
    }
  };
  
  const handleDelete = async (dispatchId) => {
    const m_id = sessionStorage.getItem('m_id') || localStorage.getItem('m_id');
    
    if (!m_id) {
      alert("사용자 인증 정보가 없습니다. 다시 로그인하세요.");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8080/underdog/dispatch/${dispatchId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: { m_id },
          withCredentials: true,
        }
      );
      
      if (response.status === 200) {
        alert('신청된 파견이 삭제되었습니다.');
        setDispatches((prev) => prev.filter((dispatch) => dispatch.dispatchId !== dispatchId));
        setIsModalOpen(false);
        setSelectedDispatch(null);
        setModalMode("create");
        window.location.reload();
      }
    } catch (error) {
      console.error('파견 삭제 중 오류 발생:', error);
      alert('파견 삭제 중 문제가 발생했습니다.');
    }
  };
  
  useEffect(() => {
    axios
    .get("http://localhost:8080/underdog/employee?page=dispatch")
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
      const modalendDate = new Date(endDate);
      modalendDate.setDate(modalendDate.getDate() - 1);
      const formattedstartDate = startDate.toISOString().slice(0, 10);
      const formattedModalendDate = modalendDate.toISOString().slice(0, 10);
      
      setFormData((prev) => ({
        ...prev,
        startDate: formattedstartDate,
        endDate: formattedModalendDate,
      }));
      setSelectedDispatch(null);
      setModalMode("create");
      setIsModalOpen(true);
    };
    
    const handleEventReceive = (info) => {
      const newEvent = {
        id: String(nextDispatchId),
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
      };
      
      setDispatches((prev) => [...prev, newEvent]);
      setNextDispatchId((prevId) => prevId + 1);
    };
    
    const handleEventClick = (info) => {
      const dispatchId = info.event.id;
      const dispatch = dispatches.find((v) => String(v.dispatchId) === dispatchId);
      if (dispatch) {
        if (dispatch.m_id !== (sessionStorage.getItem('m_id') || localStorage.getItem('m_id')) ||
        dispatch.e_name !== (sessionStorage.getItem('e_name') || localStorage.getItem('e_name'))) {
          alert("타인의 파견 신청은 수정할 수 없습니다.");
          return;
        }
        setSelectedDispatch(dispatch);
        setModalMode("edit");
        setIsModalOpen(true);
        setFormData({
          startDate: Array.isArray(dispatch.startDate)
          ? convertDate(dispatch.startDate)
          : dispatch.startDate,
          endDate: Array.isArray(dispatch.endDate)
          ? convertDate(dispatch.endDate)
          : dispatch.endDate,
          dispatchWhere: dispatch.dispatchWhere,
          dispatchPayment: dispatch.dispatchPayment,
          dispatchDetail: dispatch.dispatchDetail,
          dispatchComplete: dispatch.dispatchComplete,
          m_id: dispatch.m_id,
          e_name: dispatch.e_name,
          approval: 0
        });
      }
    };
    
    const handleTeamClick = (teamName) => {
      if (selectedTeam === teamName) {
        setSelectedTeam(null);
      } else {
        setSelectedTeam(teamName);
        selectTeamdispatch(teamName);
      }
    };
    
    const calendarEvents = dispatches.map((dispatch) => {
      const dispatchTitle = dispatch.e_name
      ? `${dispatch.e_name}의 파견`
      : `${formData.e_name}의 파견`;
      const startDate = new Date(dispatch.startDate);
      const endDate = new Date(dispatch.endDate);
      if (isNaN(startDate) || isNaN(endDate)) {
        console.error('유효하지 않은 날짜 값:', dispatch.startDate, dispatch.endDate);
        return null;
      }
      const adjustedendDate = new Date(endDate);
      adjustedendDate.setDate(adjustedendDate.getDate() + 1);
      const formattedstartDate = startDate.toISOString();
      const formattedendDate = adjustedendDate.toISOString();
      return {
        id: String(Number(dispatch.dispatchId)),
        title: dispatchTitle,
      start: formattedstartDate,
      end: formattedendDate,
      dispatchcomplete: dispatch.dispatchComplete,
    };
  }).filter((event) => event !== null);
  
  const renderEventContent = (arg) => {
    const isApproved = Number(arg.event.extendedProps.dispatchcomplete) === 1;
    return (
      <div className={isApproved ? styles.approvedEvent : styles.customEvent}>
        {arg.event.title} [{isApproved? ' 파견 종료':'파견 중'}]
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
              <Link to="/vacationrequest?no=1 ">휴가 신청</Link>
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
          <button onClick={myDispatch} className={styles.teamButton}>내 파견</button>
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
          <button onClick={allDispatch} className={styles.teamButton}>전체 파견</button>
        </div>

        <div className={styles.dispatchContainer}>
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
                <h2>{modalMode === "edit" ? '파견 수정' : '파견 신청'}</h2>
                <form onSubmit={handleSubmit} className={styles.dispatchForm}>
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
                    <label htmlFor="dispatchWhere">위치</label>
                    <textarea
                      id="dispatchWhere"
                      name="dispatchWhere"
                      value={formData.dispatchWhere}
                      onChange={handleInputChange}
                      placeholder="위치를 입력하세요"
                      required
                    ></textarea>

                    <label htmlFor="dispatchPayment">수익</label>
                    <textarea
                      id={styles.dispatchPayment}
                      name="dispatchPayment"
                      value={formData.dispatchPayment}
                      onChange={handleInputChange}
                      placeholder="수익을 입력하세요"
                      required
                    ></textarea>

                    <label htmlFor="dispatchDetail">사유</label>
                    <textarea
                      id="dispatchDetail"
                      name="dispatchDetail"
                      value={formData.dispatchDetail}
                      onChange={handleInputChange}
                      placeholder="사유를 입력하세요"
                      required
                    ></textarea>
                    <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
                    <label className={styles.checkBoxLabel} style={{fontSize:'0.9em'}}>
                      <input className={styles.completeCheckBox} style={{width:'10%', height:'70%'}} type='checkbox'
                      checked={dispatchInProgress}
                      onChange={()=>{
                      }}/>
                      파견 진행중
                      </label>
                    <label className={styles.checkBoxLabel} style={{fontSize:'0.9em'}}>
                      <input className={styles.completeCheckBox} style={{width:'10%', height:'70%'}} 
                        checked={dispatchComplete}
                      onChange={()=>{
                      }}type='checkbox'/>
                    파견 종료
                    </label>
                    </div>
                  </div>
                  <div>
                    {dispatchComplete} {dispatchInProgress} {formData.dispatchComplete}
                    <button type="submit" className={styles.submitButton}>
                      {modalMode === "edit" ? '파견 수정' : '파견 신청'}
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedDispatch(null);
                        setModalMode("create");
                      }}
                    >
                      취소
                    </button>
                    {modalMode === "edit" && (
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => handleDelete(selectedDispatch.dispatchId)}
                      >
                        파견 삭제
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

export default DispatchRequest;