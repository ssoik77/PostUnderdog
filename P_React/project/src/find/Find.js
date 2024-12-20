import React, { useState, useEffect } from "react";
import styles from './Find.module.css';
import axios from 'axios';

const Find = () => {
    const [username, setUsername] = useState(''); // 아이디 상태 추가
    const [birthdate, setBirthdate] = useState(''); // 생년월일 상태 추가
    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [regiData, setRegiData] = useState({}); // 스프링으로 보낼 데이터 묶음
    const [password, setPassword] = useState(""); // 비밀번호 상태 추가

    // 아이디 입력 핸들러
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    // 생년월일 입력 핸들러
    const handleBirthdateChange = (e) => {
        setBirthdate(e.target.value);
    };

    // 전화번호 입력 핸들러
    const handleTel1Change = (e) => {
        setTel1(e.target.value);
    };
    
    const handleTel2Change = (e) => {
        setTel2(e.target.value);
    };
    
    const handleTel3Change = (e) => {
        setTel3(e.target.value);
    };

    // 회원정보 통합 useEffect
    useEffect(() => {
        const phoneNumber = tel1 + tel2 + tel3;
        setRegiData({
<<<<<<< HEAD
            'm_id': username,
=======
            'e_name': username,
>>>>>>> 7c3a438c7d31201220158dcbfad847082ea8784e
            'e_birthdate': birthdate,
            'e_tel_num': phoneNumber,
        });
    }, [username, birthdate, tel1, tel2, tel3]);

    // 데이터 전송 함수
    const sendRegisterData = async (e) => {
        e.preventDefault();
        
        try {
            // 서버에 정보 전송 (비밀번호를 요청)
            const response = await axios.get('http://localhost:8080/underdog/find/password', {
                params: regiData
            });
            console.log(response.data);
            setPassword(response.data);  // 응답 받은 비밀번호를 상태에 저장

            // 인증 후 비밀번호를 보여주거나 다른 페이지로 이동할 수 있음
            alert("비밀번호 찾기 성공!");
<<<<<<< HEAD
=======
            // 예: window.location.href = '/change-password'; // 비밀번호 변경 화면으로 이동
>>>>>>> 7c3a438c7d31201220158dcbfad847082ea8784e
        } catch (error) {
            console.error(error);
            alert("인증에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <form onSubmit={sendRegisterData}>
            {/* 아이디 입력 */}
            <label htmlFor="username" className={styles.id}>아이디</label>
            <input 
                type="text" 
                id="username" 
                placeholder="아이디를 입력하세요" 
                value={username} 
                onChange={handleUsernameChange} 
                required
            />
            <br />

            {/* 생년월일 입력 */}
            <div id={styles.registerContainer}>
                <div id={styles.birthGroup}>
                    <label htmlFor="birthdate" className={styles.birthLabel}>생년월일</label>
                    <input 
                        type="text" 
                        id="birthInput" 
                        name="birthdate" 
                        placeholder="예: 19990101" 
                        className={styles.input} 
                        value={birthdate}
                        onChange={handleBirthdateChange}
                        required
                    />
                </div>
            </div>

            {/* 전화번호 입력 */}
            <label htmlFor="tel">전화번호:</label>
            <input 
                type="tel" 
                id={styles.tel_1} 
                style={{ width: '50px' }} 
                minLength="3" 
                maxLength="3" 
                value={tel1} 
                onChange={handleTel1Change} 
                required 
            /> - 
            <input 
                type="tel" 
                id={styles.tel_2} 
                style={{ width: '80px' }} 
                minLength="4" 
                maxLength="4" 
                value={tel2} 
                onChange={handleTel2Change} 
                required 
            /> - 
            <input 
                type="tel" 
                id={styles.tel_3} 
                style={{ width: '80px' }} 
                minLength="4" 
                maxLength="4" 
                value={tel3} 
                onChange={handleTel3Change} 
                required 
            />

            <button type="submit" className={styles.button}>다음</button>

            {/* 비밀번호 표시 */}
            {password && (
                <div>
                    <p>찾으신 비밀번호는: {password}</p>
                </div>
            )}
        </form>
    );
};

export default Find;
