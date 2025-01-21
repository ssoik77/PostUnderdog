
import React, { useRef, useState } from 'react';
import styles from './EmployeeAdd.module.css';
import { Link } from 'react-router';
import axios from 'axios';

const EmployeeAdd = () => {
    const employeeNumRef = useRef(null);
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const employeeNum = employeeNumRef.current.value.trim();
        axios.post("http://localhost:8080/underdog/employee/add", { employeeNum})
        .catch( (error) => {
                console.error("There was an error adding the employee:", error);
                alert("직원 추가 중 오류가 발생했습니다. 다시 시도해 주세요.");
     })
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
                <Link to="/vacationapproval">휴가 승인</Link>
                <Link to="/vacationrequest">휴가 신청</Link>
            </nav>

            <div id={styles.info}>
                <a href="/Mypage" onClick={openPopup} id={styles.popupLink}>
                내 정보
                </a>
            </div>
            </header>

            <main id={styles.mainContainer}>

            <div id={styles.employeeBox}>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                   <label>사원번호:</label>
                    <input type="text" name="position" pattern="\d{8}" maxLength="8" placeholder='8자리 숫자만 입력 가능 합니다' ref={employeeNumRef}/>
                </div>
                <button type="submit" className={styles.submitButton}>직원 추가</button>
                </form>
            </div>

            <div id={styles.mainBox}>

            </div>

            </main>

        </div>
        );
};

export default EmployeeAdd;