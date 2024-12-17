import React, { useState } from "react";
import styles from './Register.module.css'

const Register = () => {
    const [password, setPassword] = useState(""); // 첫 번째 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값
    const [isMatch, setIsMatch] = useState(null); // 일치 여부 상태
    const [mobileCarrier, setMobileCarrier] = useState("") //통신사 선택 저자
    const [message, setMessage] = useState(''); //
    const [messageType, setMessageType] = useState(''); // 성공/실패 메시지 타입 관리 

    const checkId = async () => {
        const username = document.getElementById('username').value;
        
        if (!username.trim()) {
            setMessage('아이디를 입력해주세요.');
            setMessageType(styles.errorMessage);
            return;
        }
    
        try {
            // 서버의 API 엔드포인트 호출 (서버 주소 포함)
            const response = await fetch(`http://localhost:8080/api/check-username?username=${username}`);
            const result = await response.text(); // 서버에서 반환된 메시지
      
            // 서버에서 받은 결과에 따라 메시지와 스타일 설정
            if (result === "이미 존재하는 아이디입니다.") {
              setMessage(result);
              setMessageType(styles.errorMessage);
            } else {
              setMessage(result);
              setMessageType(styles.successMessage);
            }
          } catch (error) {
            setMessage('서버 오류 발생');
            setMessageType(styles.errorMessage);
          }
        };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsMatch(e.target.value === password); // 비밀번호 일치 여부 확인
    };

    //통신사 선택 저장 핸들러
    const selectCarrier = (e) => {
        setMobileCarrier(e.target.value)
    }

    // 완료 버튼 클릭 핸들러
    const handleCompleteClick = () => {
    alert("회원가입이 완료되었습니다."); // 완료 메시지
    window.close(); // 창 닫기 (브라우저에서 동작할 경우에만)
    
    
    
}

    return (
        <form>

            {/* 준강 id input, id 체크 */}
            {/* 아이디 입력 칸   */}
            <input type="text"id="username" className={styles.id} placeholder="아이디를 입력하세요"required />
            <button type="button" className={styles.button} onClick={checkId}></button>
            <div id="message"></div>  {/* 메시지 출력 영역 */}
            {/* 준강 id input, id 체크 */}
            <br/>
            {/* 성태 비밀번호, 비밀번호 확인 */}
            <input id={styles.pw} placeholder="비밀번호" size="10" type="password" value={password} onChange={handlePasswordChange} pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$" required />
            <br/>
            <input id={styles.confirmPw} placeholder="비밀번호 확인" size="10" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            <br/>
            {/* 성태 비밀번호, 비밀번호 확인 */}

            {/* 재훈 이름, 생년월일 input */}
            <div id={styles.registerContainer}>
                <div id={styles.nameGroup}>
                    <label htmlFor="name" id={styles.nameLabel}>이름</label>
                    <input type="text" id="nameInput" name="name" placeholder="이름 입력" className={styles.input} />
                </div>
                <div id={styles.birthGroup}>
                    <label htmlFor="birthdate" className={styles.birthLabel}>생년월일</label>
                    <input type="text" id="birthInput" name="birthdate" placeholder="예: 19990101" className={styles.input} />
                </div>
            </div>
            {/* 재훈 이름, 생년월일 input */}

            {/* 대윤 통신사 선택 */}
            <select id={styles.carrierSelectBox} onChange={selectCarrier} value={mobileCarrier} >
                <option value='SkT'>SKT</option>
                <option value='KT'>KT</option>
                <option value='LGU+'>LGU+</option>
                <option value='알뜰폰'>알뜰폰</option>
            </select>
            {/* 대윤 통신사 선택 */}

            {/* 지승 전화번호 입력 */}

            <label for="tel">전화번호:</label>
            <input type="tel" id={styles.tel_1} style={{ width: '50px' }} minLength="3" maxLength="3" value="010" required /> -
            <input type="tel" id={styles.tel_2} style={{ width: '80px' }} minLength="4" maxLength="4" pattern="\d{4}" required /> -
            <input type="tel" id={styles.tel_3} style={{ width: '80px' }} minLength="4" maxLength="4" pattern="\d{4}" required />

            {/* 지승 전화번호 입력 */}
            <button type="button" className={styles.button} onClick={handleCompleteClick}>완료</button>
        </form>
    );
};

export default Register;