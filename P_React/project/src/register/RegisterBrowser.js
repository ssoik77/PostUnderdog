import React, { useEffect, useState } from "react";
import styles from './RegisterBrowser.module.css';
import axios from 'axios';

const Register = () => {

   const [employeeNumber, setEmployeeNumber] = useState(""); // 사원번호 입력값

    const [id, setId] = useState(""); // 아이디 입력값
    const [idMessage, setIdMessage] = useState(""); // 아이디 입력 오류 메세지
    const [idCheckResult, setIdCheckResult] = useState(false); //아이디 체크 했는지 여부

    const [password, setPassword] = useState(""); // 상태 변수: 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 상태 변수: 비밀번호 확인 입력값
    const [pwMessage, setPwMessage] = useState(""); // 비밀번호 확인 메세지
    const [pwMessageStyle, setPwMessageStyle] = useState(''); // 비밀번호 확인 메세지
    const [pwCheckResult, setPwCheckResult] = useState(false); //비밀번호 일치하는지

    const [name, setName] = useState(""); // 이름 입력 상태
    const [birthDate, setBirthDate] = useState(""); // 생년월일 입력 상태

    const [mobileCarrier, setMobileCarrier] = useState("SKT"); //통신사 선택 저장

    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [resultMessage, setResultMessage] = useState(""); // 회원가입 결과 메시지

    // ----------------준강 아이디, 아이디 중복 버튼 병합 ------------------

    // 아이디 중복 체크를 위한 비동기 함수
    const checkId = async () => {
        // 아이디 입력 값이 비어있으면 경고 메시지 설정
        if (!id) {
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
                { headers: { 'Content-Type': 'application/json', 'Accept':"text/plain; charset=UTF-8" } }
            );

            // 서버로부터 받은 응답 메시지 설정
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
    useEffect(() => { },
        // 각 입력값에 맞춰 자동 업데이트됩니다.
        [id, password, mobileCarrier,
            tel1, tel2, tel3, name, birthDate,
            idMessage, idCheckResult, resultMessage, employeeNumber]
    );

    //데이터 전송 함수
    // 회원가입 데이터 전송 함수
    const sendRegisterData = async (e) => {
        e.preventDefault();

        if (idCheckResult) {
            if (pwCheckResult) {

                const RegisterDto = {
                    e_num: employeeNumber,
                    m_id: id,
                    m_pw: password,
                    e_name: name,           // 이름 추가
                    e_birth: birthDate,     // 생년월일 추가
                    e_carrier: mobileCarrier,
                    e_tel_num: tel1 + tel2 + tel3,
                };

                try {
                    const response = await axios.post('http://localhost:8080/underdog/register/set', RegisterDto, { headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain'} });
                    console.log(response.data);
                    if(response.data === "succes"){
                        alert("회원가입이 완료되었습니다.");
                        window.close();
                    }else if(response.data === "fail1"){
                        alert("입력하신 사원번호와 이름이 일치하지 않습니다.");
                    }else if(response.data === "fail2"){
                        alert("입력하신 사원번호가 이미 등록되어 있습니다.");
                    }
                } catch (error) {
                    alert("회원가입에 실패했습니다.");
                }
            } else {
                setResultMessage("비밀번호 확인이 일치하지 않습니다.");
            }

        } else if (pwCheckResult) {
            setResultMessage("아이디 체크를 다시 해주세요.");
        } else {
            setResultMessage("아이디 체크를 다시 해주세요. 비밀번호 확인이 일치하지 않습니다.");
        };

    };

    return (
        <div id={styles.registerPage}>
            <form id={styles.registerForm} onSubmit={sendRegisterData}>
                <div id={styles.enumBox}>
                사원번호
                <input style={{fontSize:15}} className={styles.registerInput} type="text" placeholder="사원번호를 입력해 주세요" value={employeeNumber} onChange={(e)=>setEmployeeNumber(e.target.value)} required/>
                </div>
                {/* -----------------------준강 아이디, 아이디 중복 버튼 병합 -------------------*/}
                <div id={styles.idAllBox}>
                    {/* 아이디 입력 필드 */}
                    <div id={styles.idBox}>
                        ID
                        <input type="text" id={styles.idInput} className={styles.registerInput} placeholder="아이디를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                    {/* 아이디 중복 체크 버튼 */}
                    <button type="button" id={styles.idCheckButton} onClick={checkId}>
                        중복 확인
                    </button>
                </div>
                        {/* 아이디 중복 체크 결과 메시지 */}
                        <div id={styles.idMessage} className={idCheckResult ? styles.successMessage : styles.errorMessage}>
                            {idMessage} &nbsp;
                        </div>
                {/* -------------------------준강 아이디, 아이디 중복 버튼 병합 ------------------*/}

                {/* -------------------------성태 비번, 비번 체크 병합 ------------------*/}

                <div>
                    {/* 비밀번호 입력 필드 */}
                    <div id={styles.pwBox}>
                        비밀번호
                        <input id={styles.pw} className={styles.registerInput} placeholder="비밀번호" type="password" value={password} onChange={handlePasswordChange} required />
                        비밀번호 확인
                        <input id={styles.confirmPw} className={styles.registerInput} placeholder="비밀번호 확인" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                    </div>
                </div>
                        {/* 메시지 출력 */}
                        <div id={styles.pwMessage} className={pwMessageStyle}>
                            {pwMessage} &nbsp;
                        </div>

                {/* -------------------------성태 비번, 비번 체크 병합 ------------------*/}

                {/* -------------------------재훈 이름, 생년월일 저장 병합 ------------------*/}
                <div>
                    {/* 이름 입력 */}
                    <div id={styles.nameBox}>
                        이름
                        <input type="text" id={styles.name} className={styles.registerInput} placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div>
                    {/* 생년월일 입력 */}
                    <div id={styles.birthBox}>
                        생년월일
                        <input type="date" id={styles.birth} className={styles.registerInput} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                    </div>
                </div>

                {/* -------------------------재훈 이름, 생년월일 저장 병합 ------------------*/}

                <div id={styles.numBox}>
                            전화번호
                    {/* 통신사 선택 드롭다운 */}
                    <div >
                        {/* 전화번호 입력 필드 */}
                        <input type="tel" id={styles.tel_1} className={styles.registerInput} maxLength="3" value={tel1} onChange={handleTel1Change} required /> -{' '}
                        <input type="tel" id={styles.tel_2} className={styles.registerInput} maxLength="4" value={tel2} onChange={handleTel2Change} required /> -{' '}
                        <input type="tel" id={styles.tel_3} className={styles.registerInput} maxLength="4" value={tel3} onChange={handleTel3Change} required />
                    </div>
                </div>
                        <select id={styles.carrier} onChange={selectCarrier} value={mobileCarrier}>
                            <option value='SKT'>SKT</option>
                            <option value='KT'>KT</option>
                            <option value='LGU+'>LGU+</option>
                            <option value='알뜰폰'>알뜰폰</option>
                        </select>

                        <div id={styles.loginMessage}>
                    {/* 아이디 체크 제대로 하지 않고 정보 제출시 메세지 출력 */}
                    {resultMessage}
                        </div>

                    {/* 회원가입 버튼 */}
                    <button id={styles.loginButton} type="submit"  >완료</button>
            </form>
        </div>
    );
};

export default Register;