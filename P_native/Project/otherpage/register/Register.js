import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, Alert } from 'react-native';
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

     // 아이디 중복 체크를 위한 비동기 함수
     const checkId = async () => {
          if (!id) {
                setIdMessage('아이디를 입력해주세요.');
                return;
          }
          const sendId = { m_id: id }
          try {
                const response = await axios.post(
                     'http://192.168.0.135:8080/underdog/register/id/check',
                     sendId,
                     { headers: { 'Content-Type': 'application/json', 'Accept':"text/plain; charset=UTF-8" } }
                );
                setIdMessage(response.data);
                if (response.data === "사용 가능한 아이디입니다.") {
                     setIdCheckResult(true);
                }
          } catch (error) {
                setIdMessage('서버 오류 발생');
          };
     }

     // 비밀번호 입력 핸들러
     const handlePasswordChange = (newPassword) => {
          setPassword(newPassword);
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
     const handleConfirmPasswordChange = (newConfirmPassword) => {
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

     // 통신사 선택 저장 핸들러
     const selectCarrier = (e) => {
          setMobileCarrier(e.target.value);
     };

     // 전화번호 입력 저장 핸들러: 첫 번째 자리
     const handleTel1Change = (value) => setTel1(value);
     // 전화번호 입력 저장 핸들러: 두 번째 자리
     const handleTel2Change = (value) => setTel2(value);
     // 전화번호 입력 저장 핸들러: 세 번째 자리
     const handleTel3Change = (value) => setTel3(value);

     //회원정보 통합 useeffact
     useEffect(() => { },
          [id, password, mobileCarrier, tel1, tel2, tel3, name, birthDate, idMessage, idCheckResult, resultMessage, employeeNumber]
     );

     // 회원가입 데이터 전송 함수
     const sendRegisterData = async () => {
          if (idCheckResult) {
                if (pwCheckResult) {
                     const RegisterDto = {
                          e_num: employeeNumber,
                          m_id: id,
                          m_pw: password,
                          e_name: name,
                          e_birth: birthDate,
                          e_carrier: mobileCarrier,
                          e_tel_num: tel1 + tel2 + tel3,
                     };

                     try {
                          const response = await axios.post('http://192.168.0.135:8080/underdog/register/set', RegisterDto, { headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain'} });
                          console.log(response.data);
                          if(response.data === "succes"){
                                Alert.alert("회원가입이 완료되었습니다.");
                          }else if(response.data === "fail1"){
                                Alert.alert("입력하신 사원번호와 이름이 일치하지 않습니다.");
                          }else if(response.data === "fail2"){
                                Alert.alert("입력하신 사원번호가 이미 등록되어 있습니다.");
                          }
                     } catch (error) {
                          Alert.alert("회원가입에 실패했습니다.");
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
        <View style={styles.registerPage}>
             <View style={styles.registerForm}>
                 <View>
                     <Text>사원번호</Text>
                     <TextInput placeholder="사원번호를 입력해 주세요" value={employeeNumber} onChangeText={(text) => setEmployeeNumber(text)} required />
                 </View>
                 <View style={styles.idAllBox}>
                     <View style={styles.idBox}>
                          <Text>ID</Text>
                          <TextInput style={styles.idInput} className={styles.registerInput} placeholder="아이디를 입력하세요" value={id} onChangeText={(text) => setId(text)} required />
                     </View>
                     <Button title="중복 확인" style={styles.idCheckButton} onPress={checkId} />
                 </View>
                 <Text style={idCheckResult ? styles.successMessage : styles.errorMessage}>
                     {idMessage} &nbsp;
                 </Text>
                 <View>
                     <View style={styles.pwBox}>
                          <Text>비밀번호</Text>
                          <TextInput style={styles.pw} className={styles.registerInput} placeholder="비밀번호" secureTextEntry={true} value={password} onChangeText={handlePasswordChange} required />
                          <Text>비밀번호 확인</Text>
                          <TextInput style={styles.confirmPw} className={styles.registerInput} placeholder="비밀번호 확인" secureTextEntry={true} value={confirmPassword} onChangeText={handleConfirmPasswordChange} required />
                     </View>
                 </View>
                 <Text style={pwMessageStyle}>
                     {pwMessage} &nbsp;
                 </Text>
                 <View>
                     <View style={styles.nameBox}>
                          <Text>이름</Text>
                          <TextInput style={styles.name} className={styles.registerInput} placeholder="이름을 입력하세요" value={name} onChangeText={(text) => setName(text)} required />
                     </View>
                 </View>
                 <View>
                     <View style={styles.birthBox}>
                          <Text>생년월일</Text>
                          <TextInput style={styles.birth} className={styles.registerInput} placeholder="생년월일을 입력하세요" value={birthDate} onChangeText={(text) => setBirthDate(text)} required />
                     </View>
                 </View>
                 <View style={styles.numBox}>
                     <Text>전화번호</Text>
                     <View>
                          <TextInput style={styles.tel_1} className={styles.registerInput} maxLength="3" value={tel1} onChangeText={handleTel1Change} required /> -{' '}
                          <TextInput style={styles.tel_2} className={styles.registerInput} maxLength="4" value={tel2} onChangeText={handleTel2Change} required /> -{' '}
                          <TextInput style={styles.tel_3} className={styles.registerInput} maxLength="4" value={tel3} onChangeText={handleTel3Change} required />
                     </View>
                 </View>
                 <select style={styles.carrier} onChange={selectCarrier} value={mobileCarrier}>
                     <option value='SKT'>SKT</option>
                     <option value='KT'>KT</option>
                     <option value='LGU+'>LGU+</option>
                     <option value='알뜰폰'>알뜰폰</option>
                 </select>
                 <Text style={styles.loginMessage}>
                     {resultMessage}
                 </Text>
                 <Button title="완료" style={styles.loginButton} onPress={sendRegisterData} />
             </View>
        </View>
    );
};

export default Register;
