import React, { useState } from "react";
import styles from './EmployeeList.module.css'; 

const EmployeeList = ({ employees }) => {

    return (
        <table id={styles.employeeList}>
            <thead>
                <tr>
                    <th id={styles.titlea} className={styles.columnTitle}>Employee Number</th>
                    <th id={styles.titleb} className={styles.columnTitle}>Name</th>
                    <th id={styles.titlec} className={styles.columnTitle}>Birth Date</th>
                    <th id={styles.titled} className={styles.columnTitle}>Phone Number</th>
                    <th id={styles.titlee} className={styles.columnTitle}>Registration Status</th>
                    <th id={styles.titlef} className={styles.columnTitle}>Authority</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                (employee.m_id ? 
                    <tr className={styles.employee} key={employee.e_num}>
                        <td className={styles.column}>{employee.e_num}</td>
                        <td className={styles.column}>{employee.e_name}</td>
                        <td className={styles.column}>{new Date(employee.e_birth)
                        .toLocaleDateString(
                            'ko-KR', {
                            timeZone: 'Asia/Seoul',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).replace(/\.$/, '')}</td>
                        <td className={styles.column}>{employee.e_tel_num}</td>
                            <td className={styles.column}>회원 가입 완료</td>
                        <td className={styles.column}>
                            <button style=
                        {employee.authority ? {backgroundColor:'green', pointerEvents: 'none' }:{backgroundColor:'red'}}>
                            {employee.authority ? '있음' : '없음'}     
                            </button>
                            </td>
                    </tr> :
                     <tr className={styles.employee} key={employee.e_num}>
                        <td className={styles.column}>{employee.e_num}</td>
                        <td className={styles.column} style={{backgroundColor:"rgb(146, 146, 146)"}}></td>
                        <td className={styles.column} style={{backgroundColor:"rgb(146, 146, 146)"}}></td>
                        <td className={styles.column} style={{backgroundColor:"rgb(146, 146, 146)"}}></td>
                        <td className={styles.column}>아직 회원가입을 하지 않았습니다.</td>
                        <td className={styles.column} style={{backgroundColor:"rgb(146, 146, 146)"}}></td>
                     </tr>)
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;
