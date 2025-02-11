import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Mypage = ({navigation}) => {

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    m_id: '',
    m_pw: '',
    authority: false,
    e_name: '',
    e_birth: '',
    e_carrier: '',
    e_tel_num: '',
    m_key: null,
  });

  const Id = async () => await AsyncStorage.getItem("m_id");

  useEffect(() => {
    const fetchUserInfo = async () => {
      setError(null);

      try {
        const response = await axios.get('http://192.168.0.135:8080/underdog/mypage/userinfo', { params: { m_id } });

        if (response.data.status === 'success') {
          setUserInfo(response.data);

          const member = response.data.memberInfo;
          const employee = response.data.employeeInfo;

          setFormData({
            m_id: member.m_id,
            m_pw: member.m_pw,
            authority: member.authority,
            e_name: employee.e_name,
            e_birth: employee.e_birth,
            e_carrier: employee.e_carrier,
            e_tel_num: employee.e_tel_num,
            e_key: employee.e_key,
          });
        } else {
          setError('사용자 정보를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('서버 오류가 발생했습니다.');
      }
    };
    fetchUserInfo();
  }, [m_id]);

  const logout = () => {
      removeItem("m_id")
      removeItem("m_name")
      removeItem("authority")
     navigation.navigate("Home")
  };

  const handleInputChange = (name, text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/mypage/updateInfo`, formData);

      if (response.data.status === 'success') {
        Alert.alert('수정이 완료되었습니다.');
        const updatedEmployeeInfo = response.data.employeeInfo || {
          e_name: formData.e_name,
          e_birth: formData.e_birth,
          e_carrier: formData.e_carrier,
          e_tel_num: formData.e_tel_num,
        };
        setUserInfo((prevState) => ({
          ...prevState,
          employeeInfo: updatedEmployeeInfo,
        }));
        setEditMode(false);
      } else {
        Alert.alert('수정 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.mypageContainer}>
      <Text style={styles.header}>사용자 정보</Text>
      {userInfo ? (
        editMode ? (
          <View style={styles.editBox}>
            <View style={styles.inputGroup}>
              <Text>비밀번호:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                name="m_pw"
                value={formData.m_pw}
                onChangeText={(value) => handleInputChange('m_pw', value)}
                placeholder="비밀번호"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>이름:</Text>
              <TextInput
                style={styles.input}
                name="e_name"
                value={formData.e_name}
                onChangeText={(value) => handleInputChange('e_name', value)}
                placeholder="이름"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>생년월일:</Text>
              <TextInput
                style={styles.input}
                name="e_birth"
                value={formData.e_birth}
                onChangeText={(value) => handleInputChange('e_birth', value)}
                placeholder="생년월일"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>연락처:</Text>
              <TextInput
                style={styles.input}
                name="e_tel_num"
                value={formData.e_tel_num}
                onChangeText={(value) => handleInputChange('e_tel_num', value)}
                placeholder="연락처"
              />
            </View>
            <Button title="저장" onPress={handleSubmit} />
            <Button title="취소" onPress={() => setEditMode(false)} />
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text>
              <Text style={styles.label}>아이디:</Text> {userInfo.memberInfo.m_id}
            </Text>
            <Text>
              <Text style={styles.label}>이름:</Text> {userInfo.employeeInfo.e_name}
            </Text>
            <Text>
              <Text style={styles.label}>생년월일:</Text> {userInfo.employeeInfo.e_birth || '정보 없음'}
            </Text>
            <Text>
              <Text style={styles.label}>연락처:</Text> {userInfo.employeeInfo.e_tel_num}
            </Text>
            <View style={styles.buttonBox}>
              <Button title="정보 수정" onPress={() => setEditMode(true)} />
              <Button title="로그아웃" onPress={logout} />
            </View>
          </View>
        )
      ) : (
        <Text>정보를 불러오는 중...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mypageContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  editBox: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  infoBox: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Mypage;
