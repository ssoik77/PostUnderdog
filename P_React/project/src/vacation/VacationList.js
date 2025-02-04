import React from "react";
import styles from './VacationList.module.css'; 

const VacationList = ({ vacations }) => {

    return (
        <table id={styles.vacationList}>
            <thead>
                <tr>
                    <th id={styles.titlea} className={styles.columnTitle}>Vacation Number</th>
                    <th id={styles.titleb} className={styles.columnTitle}>Employee Number</th>
                    <th id={styles.titleb} className={styles.columnTitle}>Name</th>
                    <th id={styles.titlec} className={styles.columnTitle}>Start Date</th>
                    <th id={styles.titled} className={styles.columnTitle}>End Date</th>
                    <th id={styles.titlee} className={styles.columnTitle}>reason</th>
                </tr>
            </thead>
            <tbody>
                {vacations.map((vacation, index) => (
                    <tr className={styles.vacation} key={vacation.vcation_id || index}>
                        <td className={styles.column}>{vacation.vacation_id}</td>
                        <td className={styles.column}>{vacation.e_num}</td>
                        <td className={styles.column}>{vacation.e_name}</td>
                        <td className={styles.column}>{new Date(vacation.start_date)
                        .toLocaleDateString(
                            'ko-KR', {
                            timeZone: 'Asia/Seoul',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).replace(/\.$/, '')}</td>
                        <td className={styles.column}>{new Date(vacation.end_date)
                        .toLocaleDateString(
                            'ko-KR', {
                            timeZone: 'Asia/Seoul',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }).replace(/\.$/, '')}</td>
                        <td className={styles.column}>{vacation.reason}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VacationList;
