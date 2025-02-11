import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    loginPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      },
      loginHeader: {
        alignItems: 'center',
        position: 'relative',
        bottom: 80,
      },
      logo: {
        width: 100,
        height: 100,
      },
      brandNametwo: {
        fontSize: 40,
        fontWeight: 'bold',
      },
      brandNameone: {
        fontSize: 12,
      },
      loginBox: {
        width: '80%',
        height: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        position: 'relative',
        bottom: 50,
      },
      loginUi: {
        width: '100%',
        marginTop: 20
      },
      input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
      regiFindBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
      },
      link: {
        color: '#007bff',
      },
      loginSaveCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        bottom: 15,
      },
      checkbox: {
        marginLeft: 10,
      },
});