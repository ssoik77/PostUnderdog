import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./Employeemain.module.css";

const Employeemain = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState({});
  const [vacations, setVacations] = useState([]);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null); // 선택된 팀 상태 추가

  // 로그인 확인
  useEffect(() => {
    const loginId = sessionStorage.getItem("m_id") || localStorage.getItem("m_id");
    if (!loginId) {
      navigate("/");
    }
  }, [navigate]);

  // 팀 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/employees")
      .then((response) => {
        const formattedTeams = response.data.reduce((acc, employee) => {
          const teamName = employee.e_team;
          if (!acc[teamName]) {
            acc[teamName] = {
              name: `${teamName} 팀`,
              position: "팀장",
              children: [],
            };
          }
          acc[teamName].children.push({
            name: employee.e_name,
            position: employee.e_level,
            tel: employee.e_tel_num,
          });
          return acc;
        }, {});
        setTeams(formattedTeams);
      })
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  // 휴가 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/vacations/list", { withCredentials: true })
      .then((response) => setVacations(response.data))
      .catch((error) => console.error("Error fetching vacations:", error));
  }, []);

  // FullCalendar 이벤트 데이터 변환
  const calendarEvents = vacations.map((vacation) => ({
    id: String(vacation.vacation_id),
    title: `${vacation.e_name}의 휴가`,
    start: vacation.start_date,
    end: vacation.end_date,
  }));

  // 이벤트 클릭 시 상세 내용 표시
  const handleEventClick = (info) => {
    const vacationId = info.event.id;
    const vacation = vacations.find((v) => String(v.vacation_id) === vacationId);
    setSelectedVacation(vacation);
  };

  // 팀 버튼 클릭 시 해당 팀 선택
  const handleTeamClick = (teamName) => {
    if (selectedTeam === teamName) {
      // 이미 선택된 팀을 다시 클릭하면 선택 해제
      setSelectedTeam(null);
    } else {
      setSelectedTeam(teamName);
    }
  };

  return (
    <div className={styles.emp}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav className={styles.nav}>
          <Link to="/employeemain">조직도</Link>
          <Link to="/vacation">휴가 관리</Link>
        </nav>
        <div className={styles.info}>
          <Link to="/Mypage" className={styles.popupLink}>
            내 정보
          </Link>
        </div>
      </header>

      <main className={styles.mainContainer}>
        <div className={styles.teamBox}>
          <h3>명단</h3>
          {Object.keys(teams).map((team) => (
            <div key={team} className={styles.teamSection}>
              <button
                className={`${styles.teamButton} ${
                  selectedTeam === team ? styles.activeTeamButton : ""
                }`}
                onClick={() => handleTeamClick(team)}
                aria-pressed={selectedTeam === team} // 버튼의 활성화 상태 표시
              >
                {teams[team].name}
              </button>
              {/* 선택된 팀일 경우 구성원 목록 표시 */}
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
        </div>

        <div className={styles.calendarBox}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>

        {selectedVacation && (
          <div className={styles.vacationDetails}>
            <h3>휴가 상세 정보</h3>
            <p>
              <strong>이름:</strong> {selectedVacation.e_name}
            </p>
            <p>
              <strong>시작일:</strong> {selectedVacation.start_date}
            </p>
            <p>
              <strong>종료일:</strong> {selectedVacation.end_date}
            </p>
            <p>
              <strong>사유:</strong> {selectedVacation.reason || "사유 없음"}
            </p>
            <button onClick={() => setSelectedVacation(null)}>닫기</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Employeemain;
