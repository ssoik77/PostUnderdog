import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Employeemain.module.css";

const Employeemain = () => {
  // 팀별 조직도 데이터
  const teams = {
    임원진: {
      name: "최고경영자",
      position: "CEO",
      children: [
        { name: "이사 A", position: "운영 이사", children: [] },
        { name: "이사 B", position: "전략 이사", children: [] },
        { name: "이사 C", position: "재무 이사", children: [] },
      ],
    },
    인사팀: {
      name: "박지영",
      position: "인사 팀장",
      children: [
        { name: "김민수", position: "채용 담당자", children: [] },
        { name: "한나영", position: "교육 담당자", children: [] },
        { name: "이준혁", position: "성과 관리 담당자", children: [] },
      ],
    },
    회계팀: {
      name: "이서연",
      position: "회계 팀장",
      children: [
        { name: "정수빈", position: "세무 담당자", children: [] },
        { name: "송하늘", position: "자산 관리 담당자", children: [] },
        { name: "윤지호", position: "재무 분석가", children: [] },
      ],
    },
    영업팀: {
      name: "김영수",
      position: "영업 팀장",
      children: [
        { name: "이슬기", position: "B2B 담당자", children: [] },
        { name: "최하늘", position: "B2C 담당자", children: [] },
        { name: "강민지", position: "고객 관리 담당자", children: [] },
      ],
    },
    홍보팀: {
      name: "정해준",
      position: "홍보 팀장",
      children: [
        { name: "한유리", position: "SNS 홍보 담당자", children: [] },
        { name: "김현준", position: "언론 홍보 담당자", children: [] },
        { name: "이지훈", position: "브랜드 마케팅", children: [] },
      ],
    },
    생산팀: {
      name: "최은호",
      position: "생산 팀장",
      children: [
        { name: "윤서진", position: "품질 관리", children: [] },
        { name: "박지훈", position: "생산 계획", children: [] },
        { name: "강다현", position: "공정 관리", children: [] },
      ],
    },
    관리팀: {
      name: "조민호",
      position: "관리 팀장",
      children: [
        { name: "최민정", position: "시설 관리", children: [] },
        { name: "서지우", position: "안전 관리", children: [] },
        { name: "박하영", position: "자재 관리", children: [] },
      ],
    },
  };

  // 선택된 팀명과 조직도 상태 관리
  const [selectedTeam, setSelectedTeam] = useState(teams["임원진"]);
  const [selectedTeamName, setSelectedTeamName] = useState("임원진");

  // Mind Map 렌더링 함수
  const renderMindMap = (node) => (
    <div className={styles.mindMapNode}>
      <div className={styles.memberCard}>
        <div className={styles.memberName}>{node.name}</div>
        <div className={styles.memberPosition}>{node.position}</div>
      </div>
      {node.children.length > 0 && (
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
          {/* <Link to="/organization">조직도</Link> */}
          <Link to="/employeemain">조직도</Link>
          <Link to="/vacation">휴가 관리</Link>
          <Link to="/fieldwork">외근 관리</Link>
          <Link to="/salary">급여 관리</Link>
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
              {renderMindMap(selectedTeam)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Employeemain;