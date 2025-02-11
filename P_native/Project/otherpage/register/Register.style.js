import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  errorMessage: {
    color: 'rgb(203, 48, 48)',
  },
  successMessage: {
    color: 'rgb(11, 233, 55)',
  },
  registerPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    position: 'relative',
    bottom: 40,
  },
  registerInput: {
    width: 230,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '2 2 2 1 rgba(69, 67, 67, 0.2)',
    shadowRadius: 3,
    marginBottom: 5,
  },
  idAllBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    right: 5
  },
  idInput: {
    width: 175
  },
  buttonStyle: {
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: 'rgb(39, 143, 255)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idCheckButton: {
    position: 'relative',
    top: 19,
    left: 12,
  },
  errorMessage: {
    color: 'rgb(203, 48, 48)',
  },
  carrierBox: {
  },
  carrier: {
    width: 200,
  },
  carrier: {
    width: 230,
    height: 40,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '2 2 2 1 rgba(69, 67, 67, 0.2)',
    shadowRadius: 3,
  },
  birthBox: {
    display:'flex',
    flexDirection: 'row',
    position: 'relative',
    right: 8
  },
  numBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginMessage: {
    position: 'relative',
    top: 20
  },  
  loginButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgb(39, 143, 255)',
    color: 'white',
    fontSize: 18,
    position: 'relative',
    top: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
