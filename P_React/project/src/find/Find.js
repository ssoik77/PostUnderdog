import React, { useState } from "react";
import styles from './Find.module.css'; // CSS 모듈 파일
import axios from 'axios';

const Find = () => {
    // 상태 변수
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [tel, setTel] = useState("");
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIdFormOpen, setIsIdFormOpen] = useState({display:'block'});
    const [isPwFormOpen, setIsPwFormOpen] = useState({display:'none'});

    // ID 찾기 데이터 전송
    const sendFindIdData = async (e) => {
        e.preventDefault();
        const findData = {
            e_name: name,
            e_birth: birth,
            e_tel_num: tel,
        };
        try {
            const response = await axios.post("http://localhost:8080/underdog/find/id", findData);
            const foundId = response.data?.id || "unknown";

            setModalContent(
                <div>
                    <h1 className={styles.popupTitle}>아이디 찾기 성공</h1>
                    <p>고객님의 아이디는 다음과 같습니다:</p>
                    <p><strong>{foundId}</strong></p>
                    <button className={styles.popupButton} onClick={() => setIsModalOpen(false)}>닫기</button>
                </div>
            );
            setIsModalOpen(true);
            setMessage("");
        } catch (error) {
            setIsModalOpen(false);
            setMessage("입력한 정보로 ID를 찾을 수 없습니다.");
        }
    };
    
    const sendFindPwData = async (e) => {
        e.preventDefault();
        const findData = {
            m_id: id,
            e_tel_num: tel,
        };
        try {
            const response = await axios.post("http://localhost:8080/underdog/find/pw", findData);
            const foundPw = response.data?.pw || "unknown";

            setModalContent(
                <div>
                    <h1 className={styles.popupTitle}>비밀번호 찾기 성공</h1>
                    <p>고객님의 비밀번호는 다음과 같습니다:</p>
                    <p><strong>{foundPw}</strong></p>
                    <button className={styles.popupButton} onClick={() => setIsModalOpen(false)}>닫기</button>
                </div>
            );
            setIsModalOpen(true);
            setMessage("");
        } catch (error) {
            setIsModalOpen(false);
            setMessage("입력한 정보로 PW를 찾을 수 없습니다.");
        }
    };

   const findIdFormDisable = () => {
    setIsIdFormOpen({display: 'none'});
    setIsPwFormOpen({display: 'block'});
}
const findPwFormDisable = () => {
    setIsPwFormOpen({display: 'none'});
    setIsIdFormOpen({display: 'block'});
    }

    return (
        <>
        <div id={styles.findIdForm} style={isIdFormOpen}>
            {/* ID 찾기 폼 */}
            <form onSubmit={sendFindIdData}>
                <label>이름:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>전화번호:</label>
                <input type="text" value={tel} onChange={(e) => setTel(e.target.value)} required />

                <label>생일 (YYYY-MM-DD):</label>
                <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required />

                <button type="submit">ID 찾기</button>
            </form>

            {isModalOpen && (
                    <div className={styles.modalContent}>
                        {modalContent}
                    </div>
            )}

          {message && <p className={styles.errorMessage}>{message}</p>}
        <button onClick={findIdFormDisable}>비밀번호 찾기</button>
        </div>

        <div id={styles.findPwForm} style={isPwFormOpen}>
            {/* PW 찾기 폼 */}
            <form onSubmit={sendFindPwData}>
                <label>아이디:</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />

                <label>전화번호:</label>
                <input type="text" value={tel} onChange={(e) => setTel(e.target.value)} required />

                <button type="submit">PW 찾기</button>
            </form>

            {isModalOpen && (
                    <div className={styles.modalContent}>
                        {modalContent}
                    </div>
            )}

          {message && <p className={styles.errorMessage}>{message}</p>}
        <button onClick={findPwFormDisable}>아이디 찾기</button>
        </div>

            </>
    );
};

export default Find;
