import { StyleSheet } from "react-native";

export default StyleSheet.create({
  requestPage: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    position: "relative",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    flex:1
  },
  header:{
    display: 'flex',
    flexDirection: "row",
    alignItems:'center',
    justifyContent: 'center',
    gap: 60,
    padding:10,
    borderBottomWidth: 2,
    borderColor: 'rgba(0, 123, 255, 1)'
  },
  logoImage: {
    width: 45,
    height: 45,
    
  },
  nav: {
    display: 'flex',
    flexDirection: "row",
    gap: 10,
    position: 'relative',
    left: 12
  },
  buttonBox: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
