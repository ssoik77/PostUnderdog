import styles from './AppMobile.module.css';
import './register/Register.js';
import './find/Find.js';
import './vacation/vacationRequest/VacationRequest.js';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://192.168.0.2:8080/underdog";

const App = () => {

  const navigate = useNavigate();
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const [isSaveLogin, setIsSaveLogin] = useState(false);

  useEffect(() => {
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if (loginId) {
      navigate("/vacationrequest");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const id = idRef.current.value.trim();
    const pw = pwRef.current.value.trim();

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { m_id: id, m_pw: pw },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.pw_check) {
        const { e_name, authority } = response.data; // 서버에서 반환된 사용자 이름

        if (isSaveLogin) {
          localStorage.setItem("m_id", id); // 사용자 id 저장
          localStorage.setItem("e_name", e_name); // 사용자 이름 저장
          localStorage.setItem("authority", authority); // 사용자 권한 저장
        } else {
          sessionStorage.setItem("m_id", id); // 사용자 id 저장
          sessionStorage.setItem("e_name", e_name); // 사용자 이름 저장
          sessionStorage.setItem("authority", authority); // 사용자 권한 저장
        }

        alert(response.data.message || "로그인 성공!");
        navigate("/vacationrequest");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        console.error("로그인 요청 실패:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };


  return (
    
    <div id={styles.loginPage}>

     <div id={styles.loginHeader}>
      <img src="/logo.png" alt="Logo" id={styles.logo} />
        <h1 id={styles.brandNameone}>E.V.M</h1>
        <h1 id={styles.brandNametwo}>Employee Vacation Manager</h1>
     </div>
        <div id={styles.login}>
          {/* 로그인 폼 */}
          <form id={styles.loginUi} onSubmit={handleLogin}>
                    <input ref={idRef} id={styles.id} placeholder="아이디" size="10" autoComplete='off' required />
                    <input ref={pwRef} id={styles.pw} placeholder="비밀번호" size="10" type="password" required />
                    <button id={styles.loginButton} className={styles.button} type="submit">로그인</button>
          {/* 자동 로그인 체크박스 */}
          <div id={styles.loginSaveCheck}>
            <label id={styles.loginSaveCheckLabel}>
              <input id={styles.checkbox} type="checkbox"  onChange={({ target: { checked } }) => setIsSaveLogin(checked)} />
              로그인 정보 저장
            </label>
          </div>
          </form>


          <div id={styles.regiFindBox}>
            {/* 회원가입 팝업 */}
            <button id={styles.regiButton} onClick={() => navigate("/register")} className={styles.button}>
              회원가입
            </button>
            |
            {/* ID/PW 찾기 팝업 */}
            <button id={styles.findIdPwButton} onClick={() => navigate("/find")} className={styles.button}>
              ID/PW 찾기
            </button>
          </div>


        </div>
      

    </div>
  );
};

export default App;
