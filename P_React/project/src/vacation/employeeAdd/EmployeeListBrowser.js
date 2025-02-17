import React from "react";
import styles from './EmployeeListBrowser.module.css'; 

const EmployeeList = ({ employees }) => {
    return (
        <table id={styles.employeeList}>
            <thead>
                <tr>
                    <th id={styles.titlea} className={styles.columnTitle}>Number</th>
                    <th id={styles.titleb} className={styles.columnTitle}>Name</th>
                    <th id={styles.titlec} className={styles.columnTitle}>Team</th>
                    <th id={styles.titled} className={styles.columnTitle}>Level</th>
                    <th id={styles.titlee} className={styles.columnTitle}>Birth</th>
                    <th id={styles.titlef} className={styles.columnTitle}>Phone</th>
                    <th id={styles.titleg} className={styles.columnTitle}>Status</th>
                    <th id={styles.titleh} className={styles.columnTitle}>Authority</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                (employee.m_id ? 
                    <tr className={styles.employee} key={employee.e_num || index}>
                        <td className={styles.column}>{employee.e_num}</td>
                        <td className={styles.column}>{employee.e_name}</td>
                        <td className={styles.column}>{employee.e_team}</td>
                        <td className={styles.column}>{employee.e_level}</td>
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
                        <td className={styles.column}>{employee.e_name}</td>
                        <td className={styles.column}>{employee.e_team}</td>
                        <td className={styles.column}>{employee.e_level}</td>
                        <td className={styles.column} style={{backgroundColor:'#d0d0d0'}}></td>
                        <td className={styles.column} style={{backgroundColor:'#d0d0d0'}}></td>
                        <td className={styles.column}>회원가입을 하지 않음</td>
                        <td className={styles.column} style={{backgroundColor:'#d0d0d0'}}></td>
                      </tr>)
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;
