import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import styles from './VacationApproval.module.css';
import VacationList from './VacationList';

const VacationApproval = () => {
  const [vacationList, setVacationList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const params = new URLSearchParams(window.location.search);
  const pageNo = parseInt(params.get('no') || 1);

  const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
  const authority = sessionStorage.getItem('authority') || localStorage.getItem("authority");

  useEffect(() => {
    if (!loginId || !authority) {
      window.location.href = "../";
    }
  }, [loginId, authority]);

  const pullPageCount = useCallback(() => {
    axios.get("http://localhost:8080/underdog/vacations/pagecount")
      .then((response) => {
        setPageCount(response.data);
        console.log("pageCount: " + response.data);
      })
      .catch((error) => console.error("Error Fetching Page Count:", error));
  }, []);

  const pullEmployee = useCallback(() => {
    axios.get(`http://localhost:8080/underdog/vacations/approval?no=${pageNo}`, {
      headers: {
        "Content-Type": "Text/plain",
        "Accept": "application/json",
      }
    })
      .then((response) => {
        setVacationList(response.data);
        console.log("pageNo: " + pageNo);
      })
      .catch((error) => console.error("Error Pull Employee:", error));
  }, [pageNo]);

  useEffect(() => {
    pullPageCount();
    pullEmployee();
  }, [pullPageCount, pullEmployee]);

  const openPopup = (e) => {
    e.preventDefault();
    const popupFeatures = "width=700,height=600,top=100,left=100,resizable=no,scrollbars=yes";
    window.open("/Mypage", "내 정보", popupFeatures);
  };

    const handleApproval = async (vacationId) => {
    try {
        const response = await axios.put(
        `http://localhost:8080/underdog/vacations/approval/${vacationId}`,
        { approval: 1 },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        );
        if (response.status === 200) {
        alert("승인 처리 완료");
        pullEmployee();
      }
    } catch (error) {
      console.error("승인 처리 중 오류 발생:", error);
      alert("승인 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div id={styles.vacationApprovalPage}>
      <header id={styles.header}>
        <div id={styles.logo}>
          <img src="/logo.png" alt="Logo" id={styles.logoImage} />
          <h1>Post Underdog</h1>
        </div>
        <nav id={styles.nav}>
          <Link to="/employeeadd?no=1">직원 추가</Link>
          <Link to="/vacationconfirm">휴가 내역</Link>
        </nav>
        <div id={styles.info}>
          <a href="/Mypage" onClick={openPopup} id={styles.popupLink}>
            내 정보
          </a>
        </div>
      </header>
      <main id={styles.mainContainer}>
        <div id={styles.mainBox}>
          {/* VacationList에 onApprove prop 추가 */}
          <VacationList vacations={vacationList} onApprove={handleApproval} />
          <div id={styles.pageBox}>
            <a className={styles.prevnextButton} href="/vacationapproval?no=1">{"<<"}</a>
            <div id={styles.pageNumberBox}>
              {pageNo > 2 && <a className={styles.pageNumber} href={`/vacationapproval?no=${pageNo - 2}`}>{pageNo - 2}</a>}
              {pageNo > 1 && <a className={styles.pageNumber} href={`/vacationapproval?no=${pageNo - 1}`}>{pageNo - 1}</a>}
              <div style={{ cursor: "default" }}>{pageNo}</div>
              {pageCount >= (pageNo + 1) && <a className={styles.pageNumber} href={`/vacationapproval?no=${pageNo + 1}`}>{pageNo + 1}</a>}
              {pageCount >= (pageNo + 2) && <a className={styles.pageNumber} href={`/vacationapproval?no=${pageNo + 2}`}>{pageNo + 2}</a>}
            </div>
            <a className={styles.prevnextButton} href={`/vacationapproval?no=${pageCount}`}>{">>"}</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VacationApproval;
