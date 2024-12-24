import styles from './App.module.css';
import './register/Register.js';
import './find/Find.js';
import './main/Main.js';
import axios from 'axios'; // 서버 통신을 위해 axios 추가
import { useState } from 'react';

const App = () => {
  const [isSaveLogin, setIsSaveLogin] = useState(false);

  // 회원가입 팝업 열기
  const openPopup = () => {
    const popupFeatures = "width=800,height=700,top=100,left=550,resizable=no,scrollbars=no"; // 팝업창 크기와 옵션 설정
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
      if (response.data.pw_check) {//로그인 성공 여부
        const resultData = {
          a_authority: (response.data.a_authority),
          p_authority: (response.data.p_authority),
          e_authority: (response.data.e_authority)
        };
        //로그인 저장 체크 여부
        if(isSaveLogin){
          localStorage.setItem("m_id", id); // m_id를 localStorage에 저장, 서버에 데이터저장됨
          localStorage.setItem("authority", JSON.stringify(resultData)); // m_id를 localStorage에 저장, 서버에 데이터저장됨
        }else{
          sessionStorage.setItem("m_id", id); // m_id를 sessionStorage에 저장, 브라우저를 유지하는 동안만 데이터 유지 됨
          sessionStorage.setItem("authority", JSON.stringify(resultData)); // m_id를 sessionStorage에 저장, 서버에 데이터저장됨
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
          <h1 id={styles.postUnderdog}>Post Underdog</h1>
        </header>

        {/* 로그인 폼 */}
        {/* id:영문 대소문자+숫자 pw:영문 대소문자+숫자+특수문자(1개이상)+8~16자리 */}
        <form id={styles.loginUi} onSubmit={handleLogin}>
          <table>
            <tbody>
              {/* 아이디 입력 */}
              <tr><td><input id={styles.id} placeholder="아이디" size="10" pattern="^[a-zA-Z0-9]+$" required /></td></tr>
              {/* 비밀번호 입력 */}
              <tr><td><input id={styles.pw} placeholder="비밀번호" size="10" type="password" required /></td></tr>
              {/* 로그인 버튼 */}
              <tr><td><button id={styles.loginButton} className={styles.button} type="submit">로그인</button></td></tr>
            </tbody>
          </table>
        </form>

        {/* 회원가입 팝업 */}
        <button id={styles.regiButton} onClick={openPopup} className={styles.button}>회원가입</button>
        
        {/* ID/PW 찾기 팝업 */}
        <button id={styles.findIdPwButton} onClick={openFindPopup} className={styles.button}>ID/PW 찾기</button>
        {/*자동 로그인 체크박스*/}
      <div id={styles.loginSaveCheck}><input type='checkbox' onChange= {({ target: {checked}})=> setIsSaveLogin(checked)} />로그인 정보 저장</div>
      </div>
    </div>
  );
};

export default App;
