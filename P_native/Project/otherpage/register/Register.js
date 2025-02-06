import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
import axios from 'axios';
import styles from './Register.style';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";

const Register = () => {

    const [employeeNumber, setEmployeeNumber] = useState(""); // 사원번호 입력값

    const [id, setId] = useState(""); // 아이디 입력값
    const [idMessage, setIdMessage] = useState(""); // 아이디 입력 오류 메세지
    const [idCheckResult, setIdCheckResult] = useState(false); //아이디 체크 했는지 여부

    const [password, setPassword] = useState(""); // 상태 변수: 비밀번호 입력값
    const [confirmPassword, setConfirmPassword] = useState(""); // 상태 변수: 비밀번호 확인 입력값
    const [pwMessage, setPwMessage] = useState(""); // 비밀번호 확인 메세지
    const [pwMessageStyle, setPwMessageStyle] = useState(null); // 비밀번호 확인 메세지
    const [pwCheckResult, setPwCheckResult] = useState(false); //비밀번호 일치하는지

    const [name, setName] = useState(""); // 이름 입력 상태

    const [birthDate, setBirthDate] = useState(new Date()); // 생년월일 입력 상태
    const [openBirthDate, setOpenBirthDate] = useState(false); // 생년월일 입력 상태

    const [mobileCarrier, setMobileCarrier] = useState([
        { label: 'SKT', value: 'SKT' },
        { label: 'KT', value: 'KT' },
        { label: 'LGU+', value: 'LGU+' },
        { label: '알뜰폰', value: '알뜰폰' }
    ]); //통신사 선택 저장

    const [carrierBoxOpen, setCarrierBoxOpen] = useState(false);
    const [carrierValue, setCarrierValue] = useState(null);

    const [tel1, setTel1] = useState("010"); // 전화번호 첫 번째 자리
    const [tel2, setTel2] = useState(""); // 전화번호 두 번째 자리
    const [tel3, setTel3] = useState(""); // 전화번호 세 번째 자리
    const [resultMessage, setResultMessage] = useState(""); // 회원가입 결과 메시지



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
                'http://192.168.0.135:8080/underdog/register/id/check',
                sendId,
                { headers: { 'Content-Type': 'application/json', 'Accept': "text/plain; charset=UTF-8" } }
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

    // 비밀번호 입력 핸들러
    // 비밀번호 확인 입력 핸들러
    useEffect(() => {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
        if (!passwordPattern.test(password) && password.length > 0) {
            setPwMessage('비밀번호는 8~16자, 문자, 숫자, 특수문자를 포함해야 합니다.');
            setPwMessageStyle(styles.errorMessage);
        } else if (confirmPassword !== password) {
            setPwMessage('비밀번호가 일치하지 않습니다.');
            setPwMessageStyle(styles.errorMessage);
        } else {
            setPwMessage('');
            setPwMessageStyle('');
            setPwCheckResult(true);
        }
    }, [password, confirmPassword]);

    //데이터 전송 함수
    // 회원가입 데이터 전송 함수
    const sendRegisterData = async () => {

        if (idCheckResult) {
            if (pwCheckResult) {

                const RegisterDto = {
                    e_num: employeeNumber,
                    m_id: id,
                    m_pw: password,
                    e_name: name,           // 이름 추가
                    e_birth: birthDate.toISOString().split('T')[0],     // 생년월일 추가
                    e_carrier: carrierValue,
                    e_tel_num: tel1 + tel2 + tel3,
                };

                try {
                    console.log("회원가입 데이터======"+RegisterDto.e_birth);
                    const response = await axios.post('http://192.168.0.135:8080/underdog/register/set', RegisterDto, { headers: { 'Content-Type': 'application/json', 'Accept': 'text/plain' } });
                    if (response.data === "success") {
                        Alert.alert("회원가입이 완료되었습니다.");
                        navigation.goBack();
                    } else if (response.data === "fail1") {
                        Alert.alert("입력하신 사원번호와 이름이 일치하지 않습니다.");
                    } else if (response.data === "fail2") {
                        Alert.alert("입력하신 사원번호가 이미 등록되어 있습니다.");
                    }
                } catch (error) {
                    Alert.alert("회원가입에 실패했습니다.");
                }

            } else {
                setResultMessage("비밀번호 확인이 일치하지 않습니다.");
                return;
            }
            
        } else if (pwCheckResult) {
            setResultMessage("아이디 체크를 다시 해주세요.");
            return;
        } else {
            setResultMessage("아이디 체크를 다시 해주세요. 비밀번호 확인이 일치하지 않습니다.");
            return;
        };

    };

    return (
        <View style={styles.registerPage}>
            <View>
                <Text>사원번호</Text>
                <TextInput style={[styles.enumInput, styles.registerInput]} placeholder="사원번호를 입력해 주세요" onChangeText={setEmployeeNumber} />
            </View>

            <View style={styles.idAllBox}>
                <View style={styles.idBox}>
                    <Text>ID</Text>
                    <TextInput style={[styles.registerInput, styles.idInput]} placeholder="아이디를 입력하세요" onChangeText={setId} />
                </View>

                <TouchableOpacity style={[styles.buttonStyle, styles.idCheckButton]} onPress={checkId}>
                    <Text style={{ color: 'white', position: 'relative', left:2 }}>중복 확인</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.idMessage]} >
                <Text style={idCheckResult ? styles.successMessage : styles.errorMessage}>{idMessage ?? ''}</Text>
            </View>

            <View style={styles.pwBox}>
                <Text>비밀번호</Text>
                <TextInput style={[styles.pw, styles.registerInput]} placeholder="비밀번호" onChangeText={setPassword} secureTextEntry />
                <Text>비밀번호 확인</Text>
                <TextInput style={[styles.confirmPw, styles.registerInput]} placeholder="비밀번호 확인" onChangeText={setConfirmPassword} secureTextEntry />
            </View>

            <View >
                <Text style={pwMessageStyle}>{pwMessage ?? ''}</Text>
            </View>

            <View style={styles.nameBox}>
                <Text>이름</Text>
                <TextInput style={[styles.name, styles.registerInput]} placeholder="이름을 입력하세요" onChangeText={setName} />
            </View>

            <View >
                <Text>생년월일</Text>
                <View style={styles.birthBox}>
                    <TouchableOpacity style={[styles.registerInput, { position: 'relative', left: 7, justifyContent:'center', alignItems:'center' }]} onPress={() => setOpenBirthDate(!openBirthDate)}>
                        <Text style={{ position: 'relative', left:2}}>{birthDate.toLocaleDateString().slice(0, -1)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {openBirthDate && (
                <DateTimePicker mode="date" display="spinner" value={birthDate}
                    onChange={(e, date) => { setBirthDate(date); setOpenBirthDate(!openBirthDate); }} />
            )}


            <View>
                <Text style={{right: 4}}>전화번호</Text>
                <View style={styles.numBox}>
                    <TextInput style={[styles.registerInput, {width: 58, textAlign: 'center', marginRight: 10}]} maxLength={3} onChangeText={setTel1} keyboardType="phone-pad" /><Text style={{fontSize: 25}}>-</Text>
                    <TextInput style={[styles.registerInput, {width: 58, textAlign: 'center', marginLeft: 10, marginRight: 10}]} maxLength={4} onChangeText={setTel2} keyboardType="phone-pad"/><Text style={{fontSize: 25}}>-</Text>
                    <TextInput style={[styles.registerInput, {width: 58, textAlign: 'center', marginLeft: 10}]} maxLength={4} onChangeText={setTel3} keyboardType="phone-pad" />
                </View>
            </View>

            <View style={styles.carrierBox}>
                <Text>통신사 선택</Text>
                <DropDownPicker
                  placeholder='통신사 선택'
                    items={mobileCarrier}
                    value={carrierValue}
                    open={carrierBoxOpen}
                    setItems={setMobileCarrier}
                    setOpen={setCarrierBoxOpen}
                    setValue={setCarrierValue}
                    listMode="SCROLLVIEW"
                    style={styles.carrier}
                    textStyle={{ fontSize: 13, color: carrierValue ? 'black' : 'gray' }}
                    dropDownContainerStyle={{
                        width: 200,
                        height: 100,
                        borderStyle: 'solid',
                        borderRadius: 5,
                        borderColor: 'rgba(0, 0, 0, 0)',
                        position: "absolute",
                        bottom: 40,
                    }}
                />
            </View>

            <View style={styles.loginMessage}>
                <Text>{resultMessage ?? ''}</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={sendRegisterData}>
                <Text style={{color: 'white', fontSize: 19}}>완료</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
