import React from "react";
import styles from './VacationListMobile.module.css'; 

const VacationList = ({ vacations, onApproveModal}) => {
    return (
        <div className={styles.tableContainer}>  
            <table id={styles.vacationList}>
                <thead>
                    <tr>
                        <th className={styles.columnTitle}>Number</th>
                        <th className={styles.columnTitle}>Name</th>
                        <th className={styles.columnTitle}>Start</th>
                        <th className={styles.columnTitle}>End</th>
                        <th className={styles.columnTitle}>Reason</th>
                        <th className={styles.columnTitle}>Approval</th>
                    </tr>
                </thead>  
                    <tbody id={styles.listBox}>
                        {vacations.map((vacation, index) => (
                            <tr className={styles.vacation} key={vacation.vacation_id || index}>
                                <td className={styles.column}>{vacation.vacation_id}</td>
                                <td className={styles.column}>{vacation.e_name}</td>
                                <td className={styles.column}>
                                    {new Date(vacation.start_date).toLocaleDateString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    }).replace(/\.$/, '')}
                                </td>
                                <td className={styles.column}>
                                    {new Date(vacation.end_date).toLocaleDateString('ko-KR', {
                                        timeZone: 'Asia/Seoul',
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    }).replace(/\.$/, '')}
                                </td>
                                <td className={styles.column}>{vacation.reason}</td>
                                <td className={styles.column}>
                                {vacation.approval.trim() === "0" ? (
                                <button className={styles.approveButton} onClick={() => onApproveModal(vacation.vacation_id)}> 승인 / 반려 </button>
                            ): (vacation.approval.trim() === "1" ? 
                                (<span>승인됨</span>) : (<span>반려됨</span>))
                            }
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
    );
};

export default VacationList;