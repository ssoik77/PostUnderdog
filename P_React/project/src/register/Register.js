import React, { useEffect, useState } from "react";
import styles from './Register.module.css';
import axios from 'axios';

const Register = () => {
    const [password, setPassword] = useState(""); // 첫 번째 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 입력값
    const [isMatch, setIsMatch] = useState(null); // 일치 여부 상태
    const [mobileCarrier, setMobileCarrier] = useState("") //통신사 선택 저장
    const [message, setMessage] = useState(''); // 아이디 입력값
    const [username, setUsername] = useState(''); // 아이디 상태
    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [regiData, setRegiData] = useState({}); // 스프링으로 보낼 데이터 묶음


    // 중복체크
    const checkId = async () => {
        if (!username.trim()) {
            setMessage('아이디를 입력해주세요.');
            return;
        }

        try {
            // 서버로 GET 요청 보내기
            const response = await fetch(`http://localhost:8080/underdog?username=${username}`, {
                method: 'GET',
            });

            const result = await response.text(); // 서버로부터 받은 텍스트 결과

            // 응답 결과에 따라 메시지 설정
            setMessage(result);
        } catch (error) {
            setMessage('서버 오류 발생');
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

    // 전화번호 입력 저장 핸들러
    const handleTel1Change = (e) => {
        setTel1(e.target.value);
    };
    
    const handleTel2Change = (e) => {
        setTel2(e.target.value);
    };
    
    const handleTel3Change = (e) => {
        setTel3(e.target.value);
    };    



    //회원정보 통합 useeffact
    useEffect(()=>{
        const phoneNumber = tel1+tel2+tel3;
        setRegiData({'e_name':username, 'm_pw':password, 'e_carrier':mobileCarrier, 'e_tel_num':phoneNumber})
    },[username,password, mobileCarrier, tel1, tel2, tel3])

    //데이터 전송 함수
    const sendRegisterData = async (e) =>{
        console.log("진입")
        e.preventDefault();
        
           await axios.post('http://localhost:8080/underdog/register/set', regiData)
           .then((response)=>{
               console.log(response.data)
               alert("회원가입이 완료되었습니다."); 
               window.close();
           }).catch((error)=>{
            console.error(error);
           });
        
    };

    return (
        <form onSubmit={sendRegisterData}>

            {/* 준강 id input, id 체크 */}
            {/* 아이디 입력 칸   */}
            <input type="text" id="username" className={styles.id} placeholder="아이디를 입력하세요" value={username} 
            onChange={(e) => setUsername(e.target.value)} // 아이디 입력 값 상태 업데이트 
            required/>
            <button type="button" className={styles.button} onClick={checkId}>
                아이디 중복 체크
            </button>
            <div id="message" className={message === "사용 가능한 아이디입니다." ? styles.successMessage : styles.errorMessage}>
                {message}
            </div>
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
            <input type="tel" id={styles.tel_1} style={{ width: '50px' }} minLength="3" maxLength="3" value={tel1} onChange={handleTel1Change} required /> -
            <input type="tel" id={styles.tel_2} style={{ width: '80px' }} minLength="4" maxLength="4" pattern="\d{4}" value={tel2} onChange={handleTel2Change} required /> -
            <input type="tel" id={styles.tel_3} style={{ width: '80px' }} minLength="4" maxLength="4" pattern="\d{4}" value={tel3} onChange={handleTel3Change} required />

            {/* 지승 전화번호 입력 */}

            <button type="submit" className={styles.button} >완료</button>
        </form>
    );
};

export default Register;