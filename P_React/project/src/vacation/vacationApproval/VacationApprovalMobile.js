import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import styles from './VacationApprovalMobile.module.css';
import VacationListMobile from './VacationListMobile';

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.135:8080/underdog";

const VacationApproval = () => {
  const navigate = useNavigate();
  const [vacationList, setVacationList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveVacationId, setSaveVacationId] = useState();

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
    axios.get(`${API_URL}/vacations/pagecount`)
      .then((response) => {
        setPageCount(response.data);
        console.log("pageCount: " + response.data);
      })
      .catch((error) => console.error("Error Fetching Page Count:", error));
  }, []);

  const pullEmployee = useCallback(() => {
    axios.get(`${API_URL}/vacations/approval?no=${pageNo}`, {
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


    const handleApproval = async (vacationId) => {
    try {
        const response = await axios.put(
        `${API_URL}/vacations/approval/${vacationId}`,
        { m_id: sessionStorage.getItem('m_id') || localStorage.getItem('m_id'), approval: 1 },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        }
        );
        if (response.status === 200) {
          setIsModalOpen(!isModalOpen)
        alert("승인 처리 완료");
        pullEmployee();
      }
    } catch (error) {
      console.error("승인 처리 중 오류 발생:", error);
      alert("승인 처리 중 문제가 발생했습니다.");
    }
  };

  const handleApprovalRejection = async (vacationId) => {
    try {
        const response = await axios.put(
         `${API_URL}/vacations/rejection/${vacationId}`,
        { m_id: sessionStorage.getItem('m_id') || localStorage.getItem('m_id'), approval: 2 },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsModalOpen(!isModalOpen)
          alert("반려 처리 완료");
          pullEmployee();
        }
      } catch (error) {
        console.error("반려 처리 중 오류 발생:", error);
      alert("반려 처리 중 문제가 발생했습니다.");
    }
  };

  const approvalModal = (vacationId) => {
    setSaveVacationId(vacationId);
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div id={styles.vacationApprovalPage}>
      <header id={styles.header}>
        <div id={styles.logo}>
          <img src="/logo.png" alt="Logo" id={styles.logoImage} />
        </div>
        <nav id={styles.nav}>
          <Link to="/vacationrequest">휴가 신청</Link>
        <Link to="/employeeadd?no=1">직원 추가</Link>
        <Link to="/dispatch">직원 파견</Link>
        </nav>
        <div id={styles.info}>
        <button onClick={() => navigate("/mypage")} className={styles.popupLink}>
            내 정보
          </button>
        </div>
      </header>
      <main id={styles.mainContainer}>
        <div id={styles.mainBox}>
        <VacationListMobile vacations={vacationList} onApproveModal={approvalModal}/>
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
      {isModalOpen &&
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.buttonBox}>
          <button className={styles.approveButton} style={{color:'green'}} onClick={() => handleApproval(saveVacationId)}> 승인 </button>
          <button className={styles.approveButton} style={{color:'red'}} onClick={() => handleApprovalRejection(saveVacationId)}> 반려 </button>
            </div>
            <button id={styles.closeModal} onClick={approvalModal}>닫기</button>
          </div>
        </div>
      }
    </div>
  );
};

export default VacationApproval;