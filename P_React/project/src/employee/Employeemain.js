import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Employeemain.module.css";

const Employeemain = () => {
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
// 
  // 백엔드에서 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/underdog/employees") // API 호출 경로
      .then((response) => {
        // 데이터를 적절히 가공하여 teams로 설정
        const formattedTeams = response.data.reduce((acc, employee) => {
          const teamName = employee.e_team; // e_team을 팀 이름으로 사용
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
            tel: employee.e_tel_num, // 전화번호 추가
          });
          return acc;
        }, {});
        setTeams(formattedTeams);
        setSelectedTeam(formattedTeams["영업팀"]); // 기본 선택 팀 설정
        setSelectedTeamName("영업팀");
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, []);

  // Mind Map 렌더링 함수
  const renderMindMap = (node) => (
    <div className={styles.mindMapNode}>
      <div className={styles.memberCard}>
        <div className={styles.memberName}>이름: {node.name}</div>
        <div className={styles.memberPosition}>직급: {node.position}</div>
        <div className={styles.memberTel}>전화번호: {node.tel}</div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className={styles.mindMapChildren}>
          {node.children.map((child, index) => (
            <div key={index}>{renderMindMap(child)}</div>
          ))}
        </div>
      )}
    </div>
  );

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures =
      "width=600,height=400,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
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
          <a href="/Mypage" onClick={openPopup} className={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.teamBox}>
          <h3>팀 선택</h3>
          {Object.keys(teams).map((team) => (
            <button
              key={team}
              className={styles.teamButton}
              onClick={() => {
                setSelectedTeam(teams[team]);
                setSelectedTeamName(team);
              }}
            >
              {team}
            </button>
          ))}
        </div>
        <div className={styles.mainBox}>
          <section className={styles.organizationChart}>
            {/* 팀명 + 조직도 표시 */}
            <h2>{selectedTeamName} 조직도</h2>
            <div className={styles.mindMapContainer}>
              {selectedTeam && renderMindMap(selectedTeam)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Employeemain;
