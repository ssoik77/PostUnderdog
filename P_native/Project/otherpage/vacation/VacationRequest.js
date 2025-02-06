import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Image, Text, View, TouchableOpacity, KeyboardAvoidingView, Modal, Alert} from "react-native";
import styles from './VacationRequest.style'

const VacationRequest = ({navigation}) => {
  const [authority, setAuthority] = useState(null);
  const [loginId, setLoginId] = useState(null);

  const [myPageOpen, setMyPageOpen] = useState(false);

  // // SecureStore에서 데이터를 불러오는 useEffect
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const storedAuthority = await SecureStore.getItemAsync("authority");
  //     const storedLoginId = await SecureStore.getItemAsync("m_id");

  //       Alert.alert("==========c추가 페이지"+storedLoginId);
  //     // 로그인 아이디가 없으면 홈으로 이동
  //     if (!storedLoginId) {
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "Home" }],
  //       });
  //     }
  //   };
  //   fetchData();
  // }, []);

  return ( 

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-310} style={{ flex: 1 }}>
    <View style={styles.requestPage}>
      <View style={styles.header}>

      {/* 헤더 */}
          <Image source={require("../../assets/logo.png")} style={styles.logoImage} />

        {/* 네비게이션 */}
        { authority &&
          <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate("VacationApproval", { no: 1 })} style={styles.buttonBox}>
            <Text>휴가 승인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EmployeeAdd", { no: 1 })} style={styles.buttonBox}>
            <Text>직원 추가</Text>
          </TouchableOpacity>
        </View>
        }

        {/* 내 정보 */}
          <TouchableOpacity onPress={setMyPageOpen(!myPageOpen)} style={styles.buttonBox}>
            <Text>내 정보</Text>
          </TouchableOpacity>
      </View>

    <Modal visible={myPageOpen} animationType="fade" onRequestClose={setMyPageOpen(!myPageOpen)}>

    </Modal>

    </View>
      </KeyboardAvoidingView>
  
  );
};



export default VacationRequest;
