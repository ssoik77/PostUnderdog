import styles from './App.module.css';
import './register/Register.js';
import './find/Find.js';
import './main/Main.js';
import axios from 'axios'; // 서버 통신을 위해 axios 추가
import { useEffect, useState } from 'react';

const App = () => {
  const autoLoginId = localStorage.getItem("m_id");
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
      "../Register", // 새창에서 띄울 URL 또는 경로
      "회원가입", // 창 이름
      popupFeatures
    );
  };

  // ID/PW 찾기 팝업 열기
  const openFindPopup = () => {
    const popupFeatures = "width=800,height=700,top=150,left=600,resizable=no,scrollbars=no";
    window.open(
      "../Find", // 새창에서 띄울 URL
      "ID/PW 찾기", // 창 이름
      popupFeatures
    );
  };

  // 로그인 처리 함수
  const handleLogin = async (event) => {
    event.preventDefault(); // 폼 기본 동작 방지

    const id = document.getElementById(styles.id).value;
    const pw = document.getElementById(styles.pw).value;

    try {
      const response = await axios.post("http://localhost:8080/underdog/login", { m_id: id, m_pw: pw });
      if (response.data.pw_check) { // 로그인 성공 여부
        const resultData = {
          a_authority: response.data.a_authority,
          p_authority: response.data.p_authority,
          e_authority: response.data.e_authority
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
        window.location.href = "/main"; // 이동할 페이지 경로
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div id={styles.loginpop}>
      <div className={styles.App}>
        {/* 타이틀 */}
        <header className={styles.AppHeader}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <h1 id={styles.postUnderdog}>Post Underdog</h1>
        </header>

        {/* 로그인 폼 */}
        <form id={styles.loginUi} onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td><input id={styles.id} placeholder="아이디" size="10" pattern="^[a-zA-Z0-9]+$" required /></td>
              </tr>
              <tr>
                <td><input id={styles.pw} placeholder="비밀번호" size="10" type="password" required /></td>
              </tr>
              <tr>
                <td><button id={styles.loginButton} className={styles.button} type="submit">로그인</button></td>
              </tr>
            </tbody>
          </table>
        </form>

        {/* 회원가입 링크 */}
        <a
          href="/register"
          onClick={(e) => {
            e.preventDefault();
            openPopup();
          }}
          className={styles.linkButton}
        >
          회원가입
        </a>

        {/* ID/PW 찾기 링크 */}
        <a
          href="/find"
          onClick={(e) => {
            e.preventDefault();
            openFindPopup();
          }}
          className={styles.linkButton}
        >
          ID/PW 찾기
        </a>

        {/* 자동 로그인 체크박스 */}
        <div id={styles.loginSaveCheck}>
          <input type="checkbox" onChange={({ target: { checked } }) => setIsSaveLogin(checked)} />
          로그인 정보 저장
        </div>
      </div>
    </div>
  );
};

export default App;
