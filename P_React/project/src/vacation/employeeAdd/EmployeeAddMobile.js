import React, { useRef, useState, useCallback } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import styles from './EmployeeAddMobile.module.css';
import EmployeeList from './EmployeeListMobile';

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.135:8080/underdog";

const EmployeeAddMobile = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [employeeDeleteList, setEmployeeDeleteList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCart, setDeleteCart] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const pageNo = parseInt(params.get('no') || 1);

  const employeeNumRef = useRef(null);
  const employeeNameRef = useRef(null);
  const employeeTeamRef = useRef(null);
  const employeeLevelRef = useRef(null);
  const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
  const authority = sessionStorage.getItem('authority') || localStorage.getItem("authority");

  useEffect(() => {
    if (!loginId || !authority) {
      window.location.href = "../";
    }
  }, [loginId, authority]);

  const pullPageCount = useCallback(() => {
    axios.get(`${API_URL}/employee/pagecount`)
      .then((response) => {
        setPageCount(response.data);
        console.log("pageCount: " + response.data);
      })
      .catch((error) => console.error("Error Fetching Page Count:", error));
  }, []);

  const pullEmployee = useCallback(() => {
    axios.get(`${API_URL}/employee/list?no=${pageNo}`, {
      headers: {
        "Content-Type": "Text/plain",
        "Accept": "application/json",
      }
    })
      .then((response) => {
        setEmployeeList(response.data);
        setEmployeeDeleteList(response.data);
      })
      .catch((error) => console.error("Error Pull Employee:", error));
  }, [pageNo]);

  useEffect(() => {
    pullPageCount();
    pullEmployee();
  }, [pullPageCount, pullEmployee]);

  const handleSubmit = () => {
    const employeeNum = employeeNumRef.current.value.trim();
    const employeeName = employeeNameRef.current.value.trim();
    const employeeTeam = employeeTeamRef.current.value.trim();
    const employeeLevel = employeeLevelRef.current.value.trim();
    const employee = { e_num: employeeNum, e_name: employeeName, e_team: employeeTeam, e_level: employeeLevel };
    // some() 메서드는 배열 안에 있는 요소 중 true를 반환하면 즉시 메서드를 종료한다.
    const isRegisterd = employeeList.some((reponse) => {
      if (employeeNum === reponse.e_num) {
        alert("이미 등록된 직원입니다.");
        return true;
      }
      return false;
    });
    if (!isRegisterd) {
      axios.post(`${API_URL}/employee/add`, employee, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(() => {
          navigate(`/employeeadd?no=${pageNo}`);
        }) //자동으로 url이 변경되어 수동으로 설정
        .catch((error) => {
          console.error("There was an error adding the employee:", error);
        });
    }
  };
  const deleteModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const addDelteCart = (e) => {
    const e_num = e.target.getAttribute('date-e-num');
    const e_name = e.target.getAttribute('date-e-name');
    setDeleteCart((prev) => {
      if (!prev.some((item) => item.e_num === e_num)) {
        return [...prev, { e_num, e_name }];
      }
      return prev;
    });
    setEmployeeDeleteList((prev) => prev.filter(item => item.e_num !== e_num));
  };

  const removeDelteCart = (e) => {
    const e_num = e.target.getAttribute('date-e-num');
    const e_name = e.target.getAttribute('date-e-name');
    setEmployeeDeleteList((prev) => {
      if (!prev.some((item) => item.e_num === e_num)) {
        return [...prev, { e_num, e_name }];
      }
      return prev;
    });
    setDeleteCart((prev) => prev.filter(item => item.e_num !== e_num));
  }

  const deleteEmployee = () => {
    if (deleteCart === null) {
      alert('선택된 직원이 없습니다.')
    } else {
      const deleteNum = deleteCart.map(item => item.e_num);
      axios.post(`${API_URL}/employee/delete`, deleteNum, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(() => {
          pullEmployee(pageNo)
          setIsModalOpen(false);
          navigate(`/employeeadd?no=${pageNo}`);
        })//자동으로 url이 변경되어 수동으로 설정
        .catch((error) => {
          console.error("There was an error adding the employee:", error);
        })
    }
  }

  return (
    <div className={styles.employeeAddPage}>

      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>

        <nav className={styles.nav}>
          <Link to="/vacationapproval?no=1">휴가 승인</Link>
          <Link to="/vacationrequest?no=1 ">휴가 신청</Link>
        </nav>

        <div className={styles.info}>
          <button onClick={() => navigate("/mypage")} className={styles.popupLink}>
            내 정보
          </button>
        </div>
      </header>

      <main className={styles.mainContainer}>

        <div className={styles.employeeBox}>
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <div style={{ display: 'flex', gap: '5%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>사원번호</label>
                  <input id={styles.inputNum} type="text" name="position" pattern="\d{8}" maxLength="8" placeholder='8자리 숫자만 입력 가능 합니다' ref={employeeNumRef} autoFocus />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>사원이름</label>
                  <input id={styles.inputName} type="text" placeholder="사원 이름" ref={employeeNameRef} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>부서</label>
                  <input id={styles.inputName} type="text" placeholder="사원 부서" ref={employeeTeamRef} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>직책</label>
                  <input id={styles.inputName} type="text" placeholder="사원 직책" ref={employeeLevelRef} />
                </div>
              </div>
            </div>
            <button type="submit" className={styles.addButton}>직원 추가</button>
          </form>
        </div>

        <div className={styles.mainBox}>
          <EmployeeList employees={employeeList} />
          <button onClick={deleteModal} id={styles.deleteButton}>직원 삭제</button>
          <div className={styles.pageBox}>
            <a className={styles.prevnextButton} href="/employeeadd?no=1">{"<<"}</a>
            <div id={styles.pageNumberBox}>
              {pageNo > 2 && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo - 2}`}>{pageNo - 2}</a>}
              {pageNo > 1 && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo - 1}`}>{pageNo - 1}</a>}
              <div style={{ cursor: "default" }}>{pageNo}</div>
              {pageCount >= (pageNo + 1) && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo + 1}`}>{pageNo + 1}</a>}
              {pageCount >= (pageNo + 2) && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo + 2}`}>{pageNo + 2}</a>}
            </div>
            <a className={styles.prevnextButton} href={`/employeeadd?no=${pageCount}`}>{">>"}</a>
          </div>
        </div>
      </main>
      {isModalOpen &&
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            삭제할 직원 선택
            <br />
            <br />
            {employeeDeleteList.sort((a, b) => b.e_num - a.e_num).map((employee, index) => {
              return (
                <button className={styles.deleteModalButton} key={index} onClick={addDelteCart} date-e-num={employee.e_num} date-e-name={employee.e_name}>
                  사원번호 : {employee.e_num} &nbsp; 사원이름 : {employee.e_name}
                </button>
              )
            })}
          </div>
          <div className={styles.modalContent}>
            선택된 직원
            <br />
            <br />
            {deleteCart.sort((a, b) => b.e_num - a.e_num).map((employee, index) => {
              return (
                <button className={styles.deleteModalButton} key={index} onClick={removeDelteCart} date-e-num={employee.e_num} date-e-name={employee.e_name}>
                  사원번호 : {employee.e_num} &nbsp; 사원이름 : {employee.e_name}
                </button>
              )
            })}
          </div>
          <div id={styles.deleteButtonBox}>
            <button className={styles.deleteModalButton} onClick={deleteEmployee}>삭제</button>
            <button className={styles.deleteModalButton} onClick={deleteModal}>닫기</button>
          </div>
        </div>
      }
    </div>
  );
};

export default EmployeeAddMobile;