import styles from './App.module.css';
import './register/Register.js';
import './find/Find.js'

const App = () => {
  //회원가입 팝업 열기
  const openPopup = () => {
    const popupFeatures = "width=800,height=700,top=100,left=550,resizable=no,scrollbars=no"; // 팝업창 크기와 옵션 설정
    window.open(
      "../Register", // 새창에서 띄울 URL 또는 경로
      "회원가입", // 창 이름
      popupFeatures
    );
  };

  // ID/PW 찾기 팝업 열기
  const openFindPopup = ()  => {
    const popupFeatures = "width=800,height=700,top=150,left=600,resizable=no,scrollbars=no";
    window.open(
      "../Find", // 새창에서 띄울 URL
      "ID/PW 찾기", // 창 이름
      popupFeatures
    );
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
      <form id={styles.loginUi}>
        <table>
          <tr><input id={styles.id} placeholder="아이디" size="10" pattern="^[a-zA-Z0-9]+$" required /></tr>
          <br/>
          <tr><input id={styles.pw} placeholder="비밀번호" size="10" type="password" required /></tr>
          <tr><button id={styles.loginButton} className={styles.button} type="submit">로그인</button></tr>
        </table>
      </form>

      {/* 회원가입 팝업 */}
      <button id={styles.regiButton} onClick={openPopup} className={styles.button}>회원가입</button>
      
      <button id={styles.findIdPwButton} onClick={openFindPopup}className={styles.button}>ID/PW 찾기</button>
    </div>
    </div>
  );
};

export default App;
