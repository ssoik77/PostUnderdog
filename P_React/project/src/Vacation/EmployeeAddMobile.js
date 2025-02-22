import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router';
import axios from 'axios';
import styles from './EmployeeAdd.module.css';
import EmployeeList from './EmployeeList';

const EmployeeAdd = () => {
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
    }, [loginId, authority])
    
    useEffect(() => {
        const pullParams = new URLSearchParams(window.location.search);
        const pullPageNo = parseInt(pullParams.get('no') || 1);
        const pullPageCount = () => {
            axios.get("http://localhost:8080/underdog/employee/pagecount")
            .then((response) => {
                   setPageCount(response.data); 
                   console.log("pageCount: "+response.data);
                })
                .catch((error) => console.error("Error Fetching Page Count:", error));
        }
    
        const pullEmployee = () => {
            axios.get(`http://localhost:8080/underdog/employee/list?no=${pullPageNo}`, {
                headers: {
                    "Content-Type": "Text/plain",
                    "Accept": "application/json",
                }
            })
                .then((response) => {
                    setEmployeeList(response.data);
                    console.log("pageNo: "+pullPageNo);
                })
                .catch((error) => console.error("Error Pull Employee:", error));
        };
        pullPageCount();
        pullEmployee(); 
    }, []);

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
        })
        if(!isRegisterd){
            axios.post("http://localhost:8080/underdog/employee/add", employee, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(()=>{Navigate(`/employeeadd?no=${pageNo}`);})//자동으로 url이 변경되어 수동으로 설정
            .catch((error) => {
                console.error("There was an error adding the employee:", error);
                alert("직원 추가 중 오류가 발생했습니다. 다시 시도해 주세요.");
            })
        }
    };


    const openPopup = (e) => {
        e.preventDefault();
        const popupFeatures =
            "width=700,height=600,top=100,left=100,resizable=no,scrollbars=yes";
        window.open("/Mypage", "내 정보", popupFeatures);
    };

    return (
        <div id={styles.employeeAddPage}>

            <header id={styles.header}>
                <div id={styles.logo}>
                    <img src="/logo.png" alt="Logo" id={styles.logoImage} />
                    <h1>Post Underdog</h1>
                </div>

                <nav id={styles.nav}>
                    <Link to="/vacationapproval?no=1">휴가 승인</Link>
                    <Link to="/vacationrequest?no=1 ">휴가 신청</Link>
                </nav>

                <div id={styles.info}>
                    <a href="/Mypage" onClick={openPopup} id={styles.popupLink}>
                        내 정보
                    </a>
                </div>
            </header>

            <main id={styles.mainContainer}>

                <div id={styles.employeeBox}>
                    <form id={styles.formBox} onSubmit={handleSubmit}>
                        <div id={styles.inputGroup}>
                            <label>사원번호:</label>
                            <input id={styles.inputNum} type="text" name="position" pattern="\d{8}" maxLength="8" placeholder='8자리 숫자만 입력 가능 합니다' ref={employeeNumRef} autoFocus/>
                            <label>사원이름:</label>
                            <input id={styles.inputName} type="text" placeholder="사원 이름" ref={employeeNameRef}/>
                        </div>
                        <button type="submit" id={styles.addButton}>직원 추가</button>
                    </form>
                </div>

                <div id={styles.mainBox}>
                    <EmployeeList employees={employeeList} />
                    <div id={styles.pageBox}>
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

        </div>
    );
};

export default EmployeeAdd;