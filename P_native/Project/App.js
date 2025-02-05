import React, { use, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Switch, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import styles from './App.style';
// import VacationRequestScreen from './otherpage/vacation/VacationRequest';
import RegisterScreen from './otherpage/register/Register';
// import FindScreen from './otherpage/find/Find/find/Find';
import axios from 'axios';


const Stack = createStackNavigator();

const HomeScreen = () => {

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [registerModal, setRegisterModal] = useState(false);
  const [findModal, setFindModal] = useState(false);
  const autoId = SecureStore.getItemAsync("m_id");

  useEffect(() => {
    if(autoId !== null){
     Alert.alert("자동 로그인 되었습니다.");
     // navigation.navigate("VacationRequest");
    }
  },[])


  const handleLogin = async () => {
    if (!id || !pw) {
      Alert.alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.0.135:8080/underdog/login',
        { m_id: id, m_pw: pw },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.pw_check) {
        const { userName, userAuthority } = response.data;

          SecureStore.setItemAsync("m_id", id);
          SecureStore.setItemAsync("e_name", userName);
          SecureStore.setItemAsync("authority", String(userAuthority));

        Alert.alert(userName + userAuthority);
        // navigation.navigate("VacationRequest");
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

  const changeRegisterModal = () => {
    setRegisterModal(!registerModal)
  };

  const changeFindModal = () => {
   setFindModal(!findModal)
  }

  return (
    <View style={styles.loginPage}>
      <View style={styles.loginHeader}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.brandNametwo}>E.V.M</Text>
        <Text style={styles.brandNameone}>Employee Vacation Manager</Text>
      </View>

      <View style={styles.loginBox}>
          <View style={styles.loginUi}>
            <TextInput
              style={styles.input}
              placeholder="아이디"
              autoComplete="off"
              onChangeText={setId}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              secureTextEntry
              onChangeText={setPw}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

            <View style={styles.regiFindBox}>
              <TouchableOpacity onPress={changeRegisterModal}>
                <Text style={styles.link}>회원가입</Text>
              </TouchableOpacity>
              <Text> | </Text>
              <TouchableOpacity onPress={changeFindModal}>
                <Text style={styles.link}>ID/PW 찾기</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>

    <Modal visible={registerModal} animationType="slide" onRequestClose={changeRegisterModal}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{backgroundColor: '#f9f9f9'}}>
    <TouchableOpacity onPress={changeRegisterModal} style={{alignItems:'center', justifyContent:'center', width: 50, height: 40, position: 'relative', left: 340, top:10}}>
      <Text style={{fontSize: 20}}>닫기</Text>
    </TouchableOpacity>
      <RegisterScreen />
      </ScrollView>
    </Modal>

    <Modal visible={findModal} animationType="slide" onRequestClose={() => setRegisterModal(!registerModal)}>
      <View>
      {/* <FindScreen /> */}
    <TouchableOpacity onPress={changeFindModal}>
      <Text>닫기</Text>
    </TouchableOpacity>
      </View>
    </Modal>

    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="E.V.M">
        <Stack.Screen name="E.V.M" options={{headerShown:false}} component={HomeScreen} />
        {/* <Stack.Screen name="VacationRequest" component={VacationRequestScreen} />
        <Stack.Screen name="Find" component={FindScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
