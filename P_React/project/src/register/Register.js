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
    const [name, setName] = useState(""); // 이름 입력 상태
    const [birthDate, setBirthDate] = useState(""); // 생년월일 입력 상태


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

    // 비밀번호 확인 입력 핸들러
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsMatch(e.target.value === password); // 비밀번호 일치 여부 확인
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

        // 비밀번호 일치 여부 체크
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const regiData = {
            // e_name: username,
            e_name: name,           // 이름 추가
            e_birth: birthDate,     // 생년월일 추가
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

            <input
                id={styles.pw}
                placeholder="비밀번호"
                size="10"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                id={styles.confirmPw}
                placeholder="비밀번호 확인"
                size="10"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
            />
            {isMatch === false && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}

            {/* 이름 입력 */}
            <input
                type="text"
                id="name"
                className={styles.name}
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
            />

            {/* 생년월일 입력 */}
            <label htmlFor="birthDate">생년월일:</label>
            <input
                type="date"
                id="birthDate"
                className={styles.birthDate}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
            />

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
