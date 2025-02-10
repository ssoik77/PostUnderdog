import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./VacationConfirm.module.css";

const VacationConfirm = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState({});
  const [vacations, setVacations] = useState([]);
  const [selectedVacation, setSelectedVacation] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const authority = sessionStorage.getItem('authority') || localStorage.getItem('authority');

  useEffect(() => {
    axios
      .post("http://localhost:8080/underdog/vacations/listAll", { withCredentials: true })
      .then((response) => {
        console.log("전체 휴가 데이터:", response.data);
        setVacations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vacations:", error);
        alert("휴가 신청 목록을 불러오는 중 문제가 발생했습니다.");
      });
  }, []);

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=700,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

  useEffect(() => {
    const loginId = sessionStorage.getItem("m_id") || localStorage.getItem("m_id");
    if (!loginId) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/employee")
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

  const calendarEvents = vacations.map((vacation) => {
    const vacationTitle = vacation.ename && vacation.ename.trim() !== ""
    ? `${vacation.ename}의 휴가`
    : "이름 없음";
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

  const handleEventClick = (info) => {
    const vacationId = info.event.id;
    const vacation = vacations.find((v) => String(v.vacation_id) === vacationId);
    setSelectedVacation(vacation);
  };

  const handleTeamClick = (teamName) => {
    if (selectedTeam === teamName) {
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

export default VacationConfirm;
