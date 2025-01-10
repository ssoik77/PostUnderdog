import styles from './App.module.css';
import './register/Register.js';
import './find/Find.js';
import './main/Main.js';
import axios from 'axios'; // 서버 통신을 위해 axios 추가
import { useEffect, useState, useRef } from 'react';

const App = () => {
  const autoLoginId = localStorage.getItem("m_id");
  const idRef = useRef(null);
  const pwRef = useRef(null);

  useEffect(() => {
    if (autoLoginId != null) {
      window.location.href = "/main";
    }
  }, [autoLoginId]);

  const [isSaveLogin, setIsSaveLogin] = useState(false);

  // 회원가입 팝업 열기
  const openPopup = () => {
    const popupFeatures = "width=800,height=700,top=100,left=550,resizable=no,scrollbars=no";
    window.open(
      "../Register",
      "회원가입",
      popupFeatures
    );
  };

  // ID/PW 찾기 팝업 열기
  const openFindPopup = () => {
    const popupFeatures = "width=800,height=700,top=150,left=600,resizable=no,scrollbars=no";
    window.open(
      "../Find",
      "ID/PW 찾기",
      popupFeatures
    );
  };

  // 로그인 처리 함수
  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 기본 동작 방지

    const id = idRef.current.value.trim();
    const pw = pwRef.current.value.trim();

    if (!id || !pw) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/underdog/login", { m_id: id, m_pw: pw });

      if (response.data?.pw_check) { // 응답 데이터 검증
        const resultData = {
          a_authority: response.data.a_authority,
          p_authority: response.data.p_authority,
          e_authority: response.data.e_authority,
        };

        // 로그인 저장 체크 여부
        if (isSaveLogin) {
          localStorage.setItem("m_id", id);
          localStorage.setItem("authority", JSON.stringify(resultData));
        } else {
          sessionStorage.setItem("m_id", id);
          sessionStorage.setItem("authority", JSON.stringify(resultData));
        }

        alert("로그인 성공!");
        window.location.href = "/main";
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div id={styles.loginpop}>
      <div className={styles.App}>
        {/* 타이틀 */}
        <header className={styles.AppHeader}>
          <h1 id={styles.postUnderdog}>Post Underdog</h1>
        </header>

        {/* 로그인 폼 */}
        <form id={styles.loginUi} onSubmit={handleLogin}>
          <table>
            <tbody>
              {/* 아이디 입력 */}
              <tr>
                <td>
                  <input
                    ref={idRef}
                    id={styles.id}
                    placeholder="아이디"
                    size="10"
                    pattern="^[a-zA-Z0-9]+$"
                    required
                  />
                </td>
              </tr>
              {/* 비밀번호 입력 */}
              <tr>
                <td>
                  <input
                    ref={pwRef}
                    id={styles.pw}
                    placeholder="비밀번호"
                    size="10"
                    type="password"
                    required
                  />
                </td>
              </tr>
              {/* 로그인 버튼 */}
              <tr>
                <td>
                  <button id={styles.loginButton} className={styles.button} type="submit">로그인</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {/* 회원가입 팝업 */}
        <button id={styles.regiButton} onClick={openPopup} className={styles.button}>회원가입</button>

        {/* ID/PW 찾기 팝업 */}
        <button id={styles.findIdPwButton} onClick={openFindPopup} className={styles.button}>ID/PW 찾기</button>

        {/* 자동 로그인 체크박스 */}
        <div id={styles.loginSaveCheck}>
          <input type="checkbox" onChange={({ target: { checked } }) => setIsSaveLogin(checked)} />로그인 정보 저장
        </div>
      </div>
    </div>
  );
};

export default App;
