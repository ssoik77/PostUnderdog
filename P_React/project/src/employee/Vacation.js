import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Vacation.module.css";

const BASE_URL = "http://localhost:8080/underdog";

const Vacation = () => {
  const [date, setDate] = useState(new Date());
  const [vacations, setVacations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [newVacation, setNewVacation] = useState({
    employeeId: "",
    employeeName: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchLoggedInUser();
    fetchVacations();
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/userinfo`, {
        withCredentials: true, // 세션 정보를 포함
      });
      const userInfo = response.data;
      setNewVacation((prev) => ({
        ...prev,
        employeeId: userInfo.userId,
        employeeName: userInfo.userName,
      }));
    } catch (error) {
      console.error("Failed to fetch logged-in user info", error);
    }
  };

  const fetchVacations = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vacations`);
      setVacations(response.data);
    } catch (error) {
      console.error("Failed to fetch vacations", error);
    }
  };

  const handleApplyVacation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/vacations`, newVacation, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("휴가가 신청되었습니다!");
      fetchVacations();
      togglePopup();
    } catch (error) {
      alert("휴가 신청 중 오류가 발생했습니다.");
      console.error("Failed to apply vacation", error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setNewVacation((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
        reason: "",
      }));
    }
  };

  return (
    <div className={styles.mainBox}>
      <Calendar onChange={setDate} value={date} />
      <div className={styles.buttons}>
        <button onClick={togglePopup}>휴가 신청</button>
      </div>

      {showPopup && (
        <>
          {/* 오버레이 */}
          <div className={styles.overlay} onClick={togglePopup}></div>

          {/* 팝업 */}
          <div className={styles.popup}>
            <form onSubmit={handleApplyVacation} className={styles.horizontalForm}>
              <div className={styles.formRow}>
                <label>
                  시작 날짜:
                  <input
                    type="date"
                    value={newVacation.startDate}
                    onChange={(e) =>
                      setNewVacation({ ...newVacation, startDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  종료 날짜:
                  <input
                    type="date"
                    value={newVacation.endDate}
                    onChange={(e) =>
                      setNewVacation({ ...newVacation, endDate: e.target.value })
                    }
                  />
                </label>
                <label>
                  사유:
                  <textarea
                    value={newVacation.reason}
                    onChange={(e) =>
                      setNewVacation({ ...newVacation, reason: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className={styles.formButtons}>
                <button type="submit">제출</button>
                <button type="button" onClick={togglePopup}>
                  닫기
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <div className={styles.appliedVacations}>
        <p>신청한 휴가 목록:</p>
        <ul>
          {vacations.map((vacation) => (
            <li key={vacation.vacationId}>
              {vacation.employeeName} ({vacation.employeeId}):{" "}
              {vacation.startDate} ~ {vacation.endDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Vacation;
