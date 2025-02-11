import styles from './App.module.css';
import './register/Register.js';
import './find/Find.js';
import './vacation/VacationRequest.js';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 환경 변수에서 API URL 가져오기
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/underdog";

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

        console.log("🔍 로그인 응답 데이터:", response.data); // 디버깅용

        if (response.data.pw_check) {
            const { e_name, authority } = response.data; // 서버에서 반환된 사용자 이름

            console.log("🔍 저장할 e_name:", e_name); // 디버깅용

            if (isSaveLogin) {
                localStorage.setItem("m_id", id);
                localStorage.setItem("e_name", e_name);
                localStorage.setItem("authority", authority);
            } else {
                sessionStorage.setItem("m_id", id);
                sessionStorage.setItem("e_name", e_name);
                sessionStorage.setItem("authority", authority);
            }

            alert(response.data.message || "로그인 성공!");
            navigate("/vacationrequest");
        }
    } catch (error) {
        console.error("로그인 요청 실패:", error);
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
};

  const openPopup = (url, title) => {
    const popupFeatures = "width=800,height=700,top=100,left=550,resizable=no,scrollbars=no";
    window.open(url, title, popupFeatures);
  };

  return (
    <div id={styles.loginPage}>
      {/* 타이틀 */}
      <header id={styles.loginHeader}>
        <img src="/logo.png" alt="Logo" id={styles.logo} />
        <h1 id={styles.brandNametwo}>E.V.M</h1>
        <h1 id={styles.brandNameone}>Employee Vacation Manager</h1>
      </header>

      <div id={styles.loginBox}>
        <div id={styles.login}>
          {/* 로그인 폼 */}
          <form id={styles.loginUi} onSubmit={handleLogin}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input ref={idRef} id={styles.id} placeholder="아이디" size="10" autoComplete='off' required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input ref={pwRef} id={styles.pw} placeholder="비밀번호" size="10" type="password" required />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button id={styles.loginButton} className={styles.button} type="submit">로그인</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div id={styles.regiFindBox}>
            {/* 회원가입 팝업 */}
            <button id={styles.regiButton} onClick={() => openPopup("../Register", "회원가입")} className={styles.button}>
              회원가입
            </button>
            |
            {/* ID/PW 찾기 팝업 */}
            <button id={styles.findIdPwButton} onClick={() => openPopup("../Find", "ID/PW 찾기")} className={styles.button}>
              ID/PW 찾기
            </button>
          </div>

          {/* 자동 로그인 체크박스 */}
          <div id={styles.loginSaveCheck}>
            <label id={styles.loginSaveCheckLabel}>
              <input id={styles.checkbox} type="checkbox" onChange={({ target: { checked } }) => setIsSaveLogin(checked)} />
              로그인 정보 저장
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;