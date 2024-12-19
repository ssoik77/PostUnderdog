import React, { useEffect, useState } from "react";
import styles from './Register.module.css';
import axios from 'axios';

const Register = () => {
    const [password, setPassword] = useState(""); // 첫 번째 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값
    const [isMatch, setIsMatch] = useState(null); // 일치 여부 상태
    const [mobileCarrier, setMobileCarrier] = useState("SKT") //통신사 선택 저장
    const [message, setMessage] = useState(''); // 아이디 입력값
    const [username, setUsername] = useState(""); // 아이디 상태
    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리

    // 중복체크
    const checkId = async () => {
        if (!username.trim()) {
            setMessage('아이디를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/underdog?username=${username}`);
            setMessage(response.data); // 서버로부터 받은 메시지 설정
        } catch (error) {
            setMessage('서버 오류 발생');
        }
    };

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

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setIsMatch(newConfirmPassword === password); // 비밀번호 일치 여부 확인

        // 비밀번호 확인이 일치하지 않으면 오류 메시지 출력
        if (newConfirmPassword !== password) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setMessageType(styles.errorMessage);
        } else {
            setMessage('');
            setMessageType('');
        }
    };

    // 비동기 함수로 수정
    const PW = async () => {
        try {
            const response = await fetch('http://localhost:8080/underdog/register/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }), // 비밀번호만 전송
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message); // 성공 메시지
            } else {
                alert(result.message); // 실패 메시지
            }
        } catch (error) {
            alert('서버와의 연결 오류');
        }
    };

    //통신사 선택 저장 핸들러
    const selectCarrier = (e) => {
        setMobileCarrier(e.target.value);
    }

    // 전화번호 입력 저장 핸들러
    const handleTel1Change = (e) => setTel1(e.target.value);
    const handleTel2Change = (e) => setTel2(e.target.value);
    const handleTel3Change = (e) => setTel3(e.target.value);

    //회원정보 통합 useeffact
    useEffect(() => {
        // `regiData`는 각 입력값에 맞춰 자동 업데이트됩니다.
    }, [username, password, mobileCarrier, tel1, tel2, tel3]);

    //데이터 전송 함수
    const sendRegisterData = async (e) => {
        e.preventDefault();

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
            window.close();
        } catch (error) {
            console.error(error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={sendRegisterData}>
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
                아이디 중복 체크
            </button>
            <div id="message" className={message === "사용 가능한 아이디입니다." ? styles.successMessage : styles.errorMessage}>
                {message}
            </div>

            {/* 성태 비밀번호, 비밀번호 확인 */}
            <input id={styles.pw} placeholder="비밀번호" size="10" type="password" value={password} onChange={handlePasswordChange} required />
            <br />
            <input id={styles.confirmPw} placeholder="비밀번호 확인" size="10" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
            <br />
            {/* 비밀번호 조건 및 확인 메시지 */}
            {message && <div className={messageType}>{message}</div>}

            {/* 성태 비밀번호, 비밀번호 확인 */}

            <select id={styles.carrierSelectBox} onChange={selectCarrier} value={mobileCarrier}>
                <option value='SkT'>SKT</option>
                <option value='KT'>KT</option>
                <option value='LGU+'>LGU+</option>
                <option value='알뜰폰'>알뜰폰</option>
            </select>

            <label htmlFor="tel">전화번호:</label>
            <input type="tel" id={styles.tel_1} minLength="3" maxLength="3" value={tel1} onChange={handleTel1Change} required /> -
            <input type="tel" id={styles.tel_2} minLength="4" maxLength="4" value={tel2} onChange={handleTel2Change} required /> -
            <input type="tel" id={styles.tel_3} minLength="4" maxLength="4" value={tel3} onChange={handleTel3Change} required />

            <button type="submit" className={styles.button}>완료</button>
        </form>
    );
};

export default Register;