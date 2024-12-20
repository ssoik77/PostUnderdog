import React, { useEffect, useState } from "react";
import styles from './Register.module.css';
import axios from 'axios';

const Register = () => {

    const [idMessage, setIdMessage] = useState(""); // 아이디 입력 오류 메세지
    const [id, setId] = useState(""); // 아이디 입력값
    const [name, setName] = useState(""); // 아이디 입력값
    const [idCheckResult, setIdCheckResult] = useState(false); //아이디 체크 했는지 여부
    
    const [password, setPassword] = useState(""); // 상태 변수: 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 상태 변수: 비밀번호 확인 입력값
    const [pwMessage, setPwMessage] = useState(""); // 비밀번호 확인 메세지
    const [pwMessageStyle, setPwMessageStyle] = useState(''); // 비밀번호 확인 메세지
    const [pwCheckResult, setPwCheckResult] = useState(false); //비밀번호 일치하는지

    const [mobileCarrier, setMobileCarrier] = useState("SKT"); //통신사 선택 저장
    
    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [resultMessage, setResultMessage] = useState("");

    // ----------------준강 아이디, 아이디 중복 버튼 병합 ------------------

    // 아이디 중복 체크를 위한 비동기 함수
    const checkId = async () => {
        // 아이디 입력 값이 비어있으면 경고 메시지 설정
        if (!id.trim()) {
            setIdMessage('아이디를 입력해주세요.');
            return;
        }
        //스프링 dto 필드에 매칭이 잘 되기 위한 이름 변경
        const sendId = { m_id: id }
        try {
            // 서버로 GET 요청을 보내 아이디 중복 여부를 확인
            const response = await axios.post(
                'http://localhost:8080/underdog/register/id/check',
                sendId, 
                { headers: { 'Content-Type': 'application/json; charset=UTF-8' }}
            );
 
            // 서버로부터 받은 응답 메시지 설정
            console.log(response.data);
            setIdMessage(response.data);  // 응답에서 'message' 속성만 상태에 설정
            if (response.data === "사용 가능한 아이디입니다.") {
                setIdCheckResult(true);
            }
        } catch (error) {
            // 요청 중 오류가 발생한 경우, 오류 메시지를 상태에 설정
            setIdMessage('서버 오류 발생');
        };
    }
    // ----------------준강 아이디, 아이디 중복 버튼 병합 ------------------

    // ----------------성태 비번, 비번 체크 병합 --------------------------------------------
    
    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호 조건 확인 (최소 8자 이상, 문자, 숫자, 특수문자 포함)
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
        if (!passwordPattern.test(newPassword)) {
            setPwMessage('비밀번호는 8~16자, 문자, 숫자, 특수문자를 포함해야 합니다.');
            setPwMessageStyle(styles.errorMessage);
        } else {
            setPwMessage('');
            setPwMessageStyle('');
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
            setPwMessage('비밀번호가 일치하지 않습니다.');
            setPwMessageStyle(styles.errorMessage);
        } else if (confirmPassword) {
            setPwMessage('');
            setPwMessageStyle('');
            setPwCheckResult(true);
        }
    }, [confirmPassword, password, pwCheckResult]);
    
    // ----------------성태 비번, 비번 체크 병합 ------------------------------------------------------------
    
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

    //회원정보 통합 useeffact
    useEffect(() => {},
     // 각 입력값에 맞춰 자동 업데이트됩니다.
        [id, password, mobileCarrier,
         tel1, tel2, tel3, name,
         idMessage, idCheckResult, resultMessage]
        );

    //데이터 전송 함수
    // 회원가입 데이터 전송 함수
    const sendRegisterData = async (e) => {
        console.log("진입")
        e.preventDefault();

        if (idCheckResult) {
        if (pwCheckResult) {
         
            const regiData = {
                m_id: id,
                e_name: name,
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
                alert("회원가입에 실패했습니다.");
            }
        }else{
            setResultMessage("비밀번호 확인이 일치하지 않습니다.");
        }
        
    }else if(pwCheckResult){
        setResultMessage("아이디 체크를 다시 해주세요.");
    }else{
        setResultMessage("아이디 체크를 다시 해주세요. 비밀번호 확인이 일치하지 않습니다.");
        };

    };

    return (
        <form onSubmit={sendRegisterData}>

            {/* -----------------------준강 아이디, 아이디 중복 버튼 병합 -------------------*/}
        
            {/* 아이디 입력 */}
            <input type="text" id={styles.inputId} placeholder="아이디를 입력하세요" value={id}
                onChange={(e) => setId(e.target.value)} // 아이디 입력 값 업데이트 
                required />
            {/* 아이디 중복 체크 버튼 */}
            <button type="button" id={styles.idCheckButton} onClick={checkId}>
                아이디 중복 체크
            </button>
            {/* 아이디 중복 체크 후 메세지 출력 */}
            <div id={idMessage === "사용 가능한 아이디입니다." ? styles.successMessage : styles.errorMessage}>
                {idMessage}
            </div>

            {/* -------------------------준강 아이디, 아이디 중복 버튼 병합 ------------------*/}

            {/* -------------------------성태 비번, 비번 체크 병합 ------------------*/}
        
            {/* 메시지 출력 */}
            <div id="message" className={pwMessageStyle}>
                {pwMessage}
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

                {/* -------------------------성태 비번, 비번 체크 병합 ------------------*/}

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
            <button type="submit" className={styles.button} >완료</button>
            {/* 아이디 체크 제대로 하지 않고 정보 제출시 메세지 출력 */}
            {resultMessage}
        </form>
    );
};

export default Register;