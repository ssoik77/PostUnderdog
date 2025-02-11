import React, { useRef, useState, useCallback } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import styles from './EmployeeAddMobile.module.css';
import EmployeeList from './EmployeeListMobile';

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.163:8080/underdog";

const EmployeeAddMobile = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const params = new URLSearchParams(window.location.search);
  const pageNo = parseInt(params.get('no') || 1);
  
  const employeeNumRef = useRef(null);
  const employeeNameRef = useRef(null);
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
        console.log("pageNo: " + pageNo);
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
    const employee = { e_num: employeeNum, e_name: employeeName };
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
          navigate(`/employeeadd?no=${pageNo}`); }) //자동으로 url이 변경되어 수동으로 설정
        .catch((error) => {
          console.error("There was an error adding the employee:", error);
        });
    }
  };

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
              <label>사원번호:</label>
              <input className={styles.inputNum} type="text" name="position" pattern="\d{8}" maxLength="8" placeholder='8자리 숫자만 입력 가능 합니다.' ref={employeeNumRef} autoFocus />
              <label>사원이름:</label>
              <input className={styles.inputName} type="text" placeholder="사원 이름" ref={employeeNameRef} />
            </div>
            <button type="submit" className={styles.addButton}>직원 추가</button>
          </form>
        </div>

        <div className={styles.mainBox}>
          <EmployeeList employees={employeeList} />
          <div className={styles.pageBox}>
            <a className={styles.prevnextButton} href="/employeeadd?no=1">{"<<"}</a>
                    <div id={styles.pageNumberBox}>
                    {pageNo > 2 && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo-2}`}>{pageNo-2}</a> }
                    {pageNo > 1 && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo-1}`}>{pageNo-1}</a> }
                    <div style={{cursor:"default"}}>{pageNo}</div>
                    {pageCount >= (pageNo + 1) && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo+1}`}>{pageNo+1}</a> }
                    {pageCount >= (pageNo + 2) && <a className={styles.pageNumber} href={`/employeeadd?no=${pageNo+2}`}>{pageNo+2}</a> }
                    </div>
                  <a className={styles.prevnextButton} href={`/employeeadd?no=${pageCount}`}>{">>"}</a>
                    </div>
        </div>
      </main>
      <div id={styles.brandName}>
      <h4 id={styles.brandNameone}>E.V.M</h4>
        <h6 id={styles.brandNametwo}>Employee Vacation Manager</h6>
      </div>
    </div>
  );
};

export default EmployeeAddMobile;