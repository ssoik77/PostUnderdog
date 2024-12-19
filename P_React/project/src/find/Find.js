import React, { useState } from "react";
import styles from "./Find.module.css"; // CSS Module 불러오기

const Find = () => {
    const [username, setUsername] = useState(""); // 아이디 입력 상태
    const [tel, setTel] = useState(""); // 전화번호 입력 상태
    const [birthDate, setBirthDate] = useState(""); // 생년월일 입력 상태
    const [message, setMessage] = useState(""); // 안내 메시지 상태
    const [password, setPassword] = useState(null); // 비밀번호 상태 (찾은 비밀번호 저장)

    // 제출 버튼 클릭 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();

        // 임의의 로직: DB 조회 시 일치하는 데이터가 없을 경우
        if (username !== "exampleUser" || tel !== "01012345678" || birthDate !== "1999-01-01") {
            setMessage("아이디 정보가 없습니다.");
            setPassword(null); // 비밀번호 초기화
            return;
        }

        // DB에 일치하는 데이터가 있을 경우 (예: 비밀번호를 "examplePassword"로 가정)
        setPassword("examplePassword");
        setMessage(""); // 메시지 초기화
    };

    // 완료 버튼 클릭 핸들러 (팝업 닫기)
    const handleClose = () => {
        window.close();
    };

    return (
        <div id={styles.container}>
            <h2>비밀번호 찾기</h2>
            {!password ? (
                // 비밀번호 찾기 폼(확인 But, 아직 링크 직접 타이핑해서 연결)
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">아이디:</label>
                        <input
                            type="text"
                            id={styles.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="tel">전화번호:</label>
                        <input
                            type="tel"
                            id={styles.tel}
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            required
                            placeholder="예: 01012345678"
                        />
                    </div>
                    <div>
                        <label htmlFor="birthDate">생년월일:</label>
                        <input
                            type="date"
                            id={styles.birthDate}
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" id={styles.button}>제출</button>
                </form>
            ) : (
                // 비밀번호 표시 화면(미확인)
                <div>
                    <p id={styles.passwordMessage}>비밀번호는 <strong>{password}</strong> 입니다.</p>
                    <button onClick={handleClose} id={styles.button}>
                        완료
                    </button>
                </div>
            )}

            {message && <p id={styles.errorMessage}>{message}</p>}
        </div>
    );
};

export default Find;