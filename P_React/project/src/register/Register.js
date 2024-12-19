import React, { useEffect, useState } from "react";
import styles from './Register.module.css';
import axios from 'axios';

const Register = () => {
    // 상태 변수: 비밀번호 입력값
    const [password, setPassword] = useState("");
    // 상태 변수: 비밀번호 확인 입력값
    const [confirmPassword, setConfirmPassword] = useState("");
    // 상태 변수: 통신사 선택값
    const [mobileCarrier, setMobileCarrier] = useState("SKT");
    // 상태 변수: 메시지 내용
    const [message, setMessage] = useState('');
    // 상태 변수: 메시지 타입 (CSS 클래스)
    const [messageType, setMessageType] = useState("");
    // 상태 변수: 아이디 입력값
    const [username, setUsername] = useState("");
    // 상태 변수: 전화번호 첫 번째 자리
    const [tel1, setTel1] = useState("010");
    // 상태 변수: 전화번호 두 번째 자리
    const [tel2, setTel2] = useState("");
    // 상태 변수: 전화번호 세 번째 자리
    const [tel3, setTel3] = useState("");

    // 아이디 중복 체크 함수
    const checkId = async () => {
        if (!username.trim()) {
            setMessage('아이디를 입력해주세요.');
            setMessageType(styles.errorMessage);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/underdog?username=${username}`);
            // 서버로부터 받은 메시지에 따라 메시지 및 스타일 설정
            setMessage(response.data);
            setMessageType(response.data === "사용 가능한 아이디입니다." ? styles.successMessage : styles.errorMessage);
        } catch (error) {
            setMessage('서버 오류 발생');
            setMessageType(styles.errorMessage);
        }
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호 조건 확인 (최소 8자 이상, 문자, 숫자, 특수문자 포함)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
        if (!passwordPattern.test(newPassword)) {
            setMessage('비밀번호는 8~16자, 문자, 숫자, 특수문자를 포함해야 합니다.');
            setMessageType(styles.errorMessage);
        } else {
            setMessage('');
            setMessageType('');
        }
    };

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
    };

    // 비밀번호 확인 상태 업데이트
    useEffect(() => {
        if (confirmPassword && confirmPassword !== password) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setMessageType(styles.errorMessage);
        } else if (confirmPassword) {
            setMessage('');
            setMessageType('');
        }
    }, [confirmPassword, password]);

    // 통신사 선택 저장 핸들러
    const selectCarrier = (e) => {
        setMobileCarrier(e.target.value);
    };

    // 전화번호 입력 저장 핸들러: 첫 번째 자리
    const handleTel1Change = (e) => setTel1(e.target.value);
    // 전화번호 입력 저장 핸들러: 두 번째 자리
    const handleTel2Change = (e) => setTel2(e.target.value);
    // 전화번호 입력 저장 핸들러: 세 번째 자리
    const handleTel3Change = (e) => setTel3(e.target.value);

    // 회원가입 데이터 전송 함수
    const sendRegisterData = async (e) => {
        e.preventDefault();

        // 서버에 전송할 회원가입 데이터 객체
        const regiData = {
            e_name: username,
            m_pw: password,
            e_carrier: mobileCarrier,
            e_tel_num: tel1 + tel2 + tel3,
        };

        try {
            console.log(regiData);
            const response = await axios.post('http://localhost:8080/underdog/register/set', regiData);
            console.log(response.data);
            alert("회원가입이 완료되었습니다.");
            window.close(); // 창 닫기
        } catch (error) {
            console.error(error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={sendRegisterData}>
            {/* 아이디 입력 필드 */}
            <input
                type="text"
                id="username"
                className={styles.id}
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
            />
            <button type="button" className={styles.button} onClick={checkId}>

            </button>
            {/* 메시지 출력 */}
            <div id="message" className={messageType}>
                {message}
            </div>

            {/* 비밀번호 입력 필드 */}
            <input 
                id={styles.pw} 
                placeholder="비밀번호" 
                type="password" 
                value={password} 
                onChange={handlePasswordChange} 
                required 
            />
            <br />
            {/* 비밀번호 확인 입력 필드 */}
            <input 
                id={styles.confirmPw} 
                placeholder="비밀번호 확인" 
                type="password" 
                value={confirmPassword} 
                onChange={handleConfirmPasswordChange} 
                required 
            />
            <br />

            {/* 통신사 선택 드롭다운 */}
            <select id={styles.carrierSelectBox} onChange={selectCarrier} value={mobileCarrier}>
                <option value='SKT'>SKT</option>
                <option value='KT'>KT</option>
                <option value='LGU+'>LGU+</option>
                <option value='알뜰폰'>알뜰폰</option>
            </select>

            {/* 전화번호 입력 필드 */}
            <label htmlFor="tel">전화번호:</label>
            <input type="tel" id={styles.tel_1} maxLength="3" value={tel1} onChange={handleTel1Change} required /> -
            <input type="tel" id={styles.tel_2} maxLength="4" value={tel2} onChange={handleTel2Change} required /> -
            <input type="tel" id={styles.tel_3} maxLength="4" value={tel3} onChange={handleTel3Change} required />

            {/* 회원가입 버튼 */}
            <button type="submit" className={styles.button}>완료</button>
        </form>
    );
};

export default Register;
