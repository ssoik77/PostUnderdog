import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './Find.style';
import axios from 'axios';

const Find = () => {
    // 상태 변수
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [birth, setBirth] = useState(new Date());
    const [openBirthDate, setOpenBirthDate] = useState(false);
    const [message, setMessage] = useState("");
    const [id, setId] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isIdFormOpen, setIsIdFormOpen] = useState({ display: 'block' });
    const [isPwFormOpen, setIsPwFormOpen] = useState({ display: 'none' });

    // ID 찾기 데이터 전송
    const sendFindIdData = async () => {
        const findData = {
            e_name: name,
            e_birth: birth.toISOString().split('T')[0],
            e_tel_num: tel,
        };
        try {
            const response = await axios.post("http://192.168.0.135:8080/underdog/find/id", findData);
            const foundId = response.data?.id || "unknown";

            if (foundId === "unknown") {
                setModalContent(
                    <View style={styles.idpwFindResult}>
                        <Text style={styles.popupTitle}>아이디 찾기 실패</Text>
                        <TouchableOpacity style={styles.popupButton} onPress={()=>setIsModalOpen(false)}>
                            <Text style={{color: 'white'}}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                );
                setIsModalOpen(true);
                setMessage("");
            } else {
                setModalContent(
                    <View style={styles.idpwFindResult}>
                        <Text style={styles.popupTitle}>아이디 찾기 성공</Text>
                        <Text>아이디는 다음과 같습니다</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{foundId}</Text>
                        <TouchableOpacity style={styles.popupButton} onPress={()=>setIsModalOpen(false)}>
                            <Text style={{color: 'white'}}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                );
                setIsModalOpen(true);
                setMessage("");
            }
        } catch (error) {
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
            const response = await axios.post("http://192.168.0.135:8080/underdog/find/pw", findData);
            const foundPw = response.data?.pw || "unknown";

            if (foundPw === "unknown") {
                setModalContent(
                    <View style={styles.idpwFindResult}>
                        <Text style={styles.popupTitle}>비밀번호 찾기 실패</Text>
                        <TouchableOpacity style={styles.popupButton} onPress={()=>setIsModalOpen(false)}>
                            <Text style={{color: 'white'}}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                );
                setIsModalOpen(true);
                setMessage("");
            } else {
                setModalContent(
                    <View style={styles.idpwFindResult}>
                        <Text style={styles.popupTitle}>비밀번호 찾기 성공</Text>
                        <Text>비밀번호는 다음과 같습니다</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{foundPw}</Text>
                        <TouchableOpacity style={styles.popupButton} onPress={()=>setIsModalOpen(false)}>
                            <Text  style={{color: 'white'}}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                );
                setIsModalOpen(true);
                setMessage("");
            }
        } catch (error) {
            setIsModalOpen(false);
            setMessage("입력한 정보로 PW를 찾을 수 없습니다.");
        }
    };



    const findIdFormDisable = () => {
        setIsModalOpen(false);
        setIsIdFormOpen({ display: 'none' });
        setIsPwFormOpen({ display: 'block' });
    }
    const findPwFormDisable = () => {
        setIsModalOpen(false);
        setIsPwFormOpen({ display: 'none' });
        setIsIdFormOpen({ display: 'block' });
    }

useEffect(()=>{},[isModalOpen])

    return (
        <View style={styles.idpwFindPage}>
            <View style={styles.idpwFindBox}>

                {/* ID 찾기 폼 */}
                <View style={[{width:300, height:220, justifyContent:'center', alignItems:'center'}, isIdFormOpen ]}>
                    {isModalOpen && (
                        <View>
                            {modalContent}
                        </View>
                    )}

                    {!isModalOpen && (
                        <View>
                            <Text>이름</Text>
                            <TextInput style={styles.findInput} onChangeText={setName} />

                            <Text>전화번호</Text>
                            <TextInput style={styles.findInput} onChangeText={setTel} keyboardType="phone-pad" />

                            <Text>생일</Text>
                            <TouchableOpacity style={[styles.findInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => setOpenBirthDate(!openBirthDate)}>
                                <Text>{birth.toLocaleDateString().slice(0, -1)}</Text>
                            </TouchableOpacity>
                            {openBirthDate && (
                                <DateTimePicker mode="date" display="spinner" value={birth}
                                    onChange={(e, date) => { setBirth(date); setOpenBirthDate(!openBirthDate); }} />
                            )}

                            <TouchableOpacity style={styles.idFormButton} onPress={sendFindIdData}>
                                <Text style={{color: 'white'}}>입력 완료</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {message && <Text style={styles.errorMessage}>{message}</Text>}
                    <TouchableOpacity style={styles.pwFindButton} onPress={findIdFormDisable}>
                        <Text style={{color: 'white'}}>비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>

                {/* PW 찾기 폼 */}
                <View style={[{width:300, height:220, justifyContent:'center', alignItems:'center'},isPwFormOpen]}>

                    {isModalOpen && (
                        <View>
                            {modalContent}
                        </View>
                    )}

                    {!isModalOpen && (
                        <View>
                            <Text>아이디</Text>
                            <TextInput style={styles.findInput} onChangeText={setId} />

                            <Text>전화번호</Text>
                            <TextInput style={styles.findInput} onChangeText={setTel} keyboardType="phone-pad" />

                            <TouchableOpacity style={styles.pwFormButton} onPress={sendFindPwData}>
                                <Text style={{color: 'white'}}>입력 완료</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {message && <Text style={styles.errorMessage}>{message}</Text>}
                    <TouchableOpacity style={styles.idFindButton} onPress={findPwFormDisable}>
                        <Text style={{color: 'white'}}>아이디 찾기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default Find;
