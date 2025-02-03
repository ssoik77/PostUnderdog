import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VacationRequestScreen from './otherpage/vacation/VacationRequest';
import RegisterScreen from './otherpage/register/Register';
import FindScreen from './otherpage/find/Find/find/Find';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/underdog";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const [isSaveLogin, setIsSaveLogin] = useState(false);

  useEffect(() => {
    const loginId = sessionStorage.getItem('m_id') || localStorage.getItem("m_id");
    if (loginId) {
      navigation.navigate("VacationRequest");
    }
  }, [navigation]);

  const handleLogin = async () => {
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

      if (response.data.pw_check) {
        const { userName, userAuthority } = response.data;

        if (isSaveLogin) {
          localStorage.setItem("m_id", id);
          localStorage.setItem("e_name", userName);
          localStorage.setItem("authority", userAuthority);
        } else {
          sessionStorage.setItem("m_id", id);
          sessionStorage.setItem("e_name", userName);
          sessionStorage.setItem("authority", userAuthority);
        }

        Alert.alert(response.data.message || "로그인 성공!");
        navigation.navigate("VacationRequest");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert("아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        console.error("로그인 요청 실패:", error);
        Alert.alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const openPopup = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.loginPage}>
      <View style={styles.loginHeader}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <Text style={styles.brandNametwo}>E.V.M</Text>
        <Text style={styles.brandNameone}>Employee Vacation Manager</Text>
      </View>

      <View style={styles.loginBox}>
        <View style={styles.login}>
          <View style={styles.loginUi}>
            <TextInput
              ref={idRef}
              style={styles.input}
              placeholder="아이디"
              autoComplete="off"
              required
            />
            <TextInput
              ref={pwRef}
              style={styles.input}
              placeholder="비밀번호"
              secureTextEntry
              required
            />
            <Button title="로그인" onPress={handleLogin} />

            <View style={styles.regiFindBox}>
              <Button title="회원가입" onPress={() => openPopup("Register")} />
              <Text> | </Text>
              <Button title="ID/PW 찾기" onPress={() => openPopup("Find")} />
            </View>

            <View style={styles.loginSaveCheck}>
              <Text>로그인 정보 저장</Text>
              <TextInput
                style={styles.checkbox}
                type="checkbox"
                onChange={({ target: { checked } }) => setIsSaveLogin(checked)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VacationRequest" component={VacationRequestScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Find" component={FindScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  brandNametwo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  brandNameone: {
    fontSize: 18,
  },
  loginBox: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  login: {
    alignItems: 'center',
  },
  loginUi: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  regiFindBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginSaveCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    marginLeft: 10,
  },
});

export default App;
