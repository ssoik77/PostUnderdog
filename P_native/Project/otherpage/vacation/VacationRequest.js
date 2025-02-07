import React, { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Text, View, Modal, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './VacationRequest.style'
import Mypage from "../myPage/Mypage";
import { TouchableOpacity } from "react-native";

const VacationRequest = ({navigation}) => {

  const [myPageOpen, setMyPageOpen] = useState(false);
 
  
  
  useEffect(() => {
    const fetch = async() =>{
      const autoId = await AsyncStorage.getItem("m_id");
      console.log("============="+autoId);
      if (autoId == null) {
        navigation.navigate("Home");
      }
    }
    fetch();
  }, [navigation]);

  return ( 

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-310} style={{ flex: 1 }}>
    <View style={styles.requestPage}>
      <View style={styles.header}>

      {/* 헤더 */}
          <Image source={require("../../assets/logo.png")} style={styles.logoImage} />

        {/* 네비게이션 */}
          <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.navigate("VacationApproval", { no: 1 })} style={styles.buttonBox}>
            <Text>휴가 승인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("EmployeeAdd", { no: 1 })} style={styles.buttonBox}>
            <Text>직원 추가</Text>
          </TouchableOpacity>
        </View>

        {/* 내 정보 */}
          <TouchableOpacity onPress={() => setMyPageOpen(!myPageOpen)} style={styles.buttonBox}>
            <Text>내 정보</Text>
          </TouchableOpacity>
      </View>

    <Modal visible={myPageOpen} animationType="fade" onRequestClose={() => setMyPageOpen(!myPageOpen)}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#f9f9f9' }}>
        <TouchableOpacity onPress={changeFindModal} style={{ alignItems: 'center', justifyContent: 'center', width: 50, height: 40, position: 'relative', left: 340, top: 10 }}>
                      <Text style={{ fontSize: 20 }}>닫기</Text>
                    </TouchableOpacity>
    <Mypage navigation={navigation}/>
      </ScrollView>
    </Modal>

    </View>
      </KeyboardAvoidingView>
  
  );
};



export default VacationRequest;
