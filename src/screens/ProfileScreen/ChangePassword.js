import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ToastAndroid
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {COLORS} from '../../constant/Colors';
import ChangePasswordTextFiled from '../../components/forms/ChangePasswordTextField';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale} from '../../components/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileTextField from '../../components/forms/ProfileTextField';

const ChangePassword = ({navigation}) => {


  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const oldPasswordInput = useRef();
  const newPasswordInput = useRef();
  const confirmPasswordInput = useRef();
  const [termsAccepted, settermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleSubmitPress = async() => {

    let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let passwrdresult = pattern.test(newPassword);

    if (!newPassword) {
      newPasswordInput.current.validateFiled();
    } 
    else if (passwrdresult !== true) {
      //console.log('newPassword'+newPassword)
      ToastAndroid.show('Invalid Password', ToastAndroid.SHORT);
      return false;
    }
    else if (!confirmPassword) {
      confirmPasswordInput.current.validateFiled();
    } else if (confirmPassword !== newPassword) {
      //setErrorText("The password and confirm password are not the same");
      setErrorText("Passwords Don't Match");
    }
    else {
      setErrorText('');
      let dataToSend = {
        action: 'reset_password',
        userId: userId,
        password: confirmPassword,
        user_key: userKey,
        user_name: userName
      };
      setLoading(true)
    
    }
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => 
          navigation.navigate('Login')
        );
      
    } catch(e) {
      // clear error
      console.log('not able to clear')
    }
    console.log('Done.')
  }
  return (
    <ScrollView>
      <Text style={styles.heading}>Change Password</Text>
      <View style={styles.inputContainer}>
      <View style={styles.screenInner}>
        <ProfileTextField
          placeholder="New Password"
          isRequired={true}
          secureTextEntry={true}
          ref={newPasswordInput}
          value={newPassword}
          onChangeText={setNewPassword}
          className="inputViewTextIcon"
          style={styles.inputArea}
        />
        <ProfileTextField
          placeholder="Repeat Password"
          isRequired={true}
          secureTextEntry={true}
          value={confirmPassword}
          ref={confirmPasswordInput}
          onChangeText={setConfirmPassword}
          className="inputViewTextIcon"
          style={styles.inputArea}
        />
        </View>
      </View>
      {errorText ? (
        <View style={styles.errorControl}>
          <View>
            <Text style={styles.errorMsg}>
              {errorText}
            </Text>
          </View>
        </View>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSubmitPress}>
        <Text style={styles.text}>Change password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  inputArea: {
    width: scale(200),
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowOpacity: 18,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
  },
  screenInner: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    //borderWidth:1,
    //borderColor:'red'
  },
  inputContainer: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 10,
    color: COLORS.textListColorBold,
  },
  button: {
    width: scale(240),
    marginTop: 25,
    padding: 10,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: COLORS.button,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 18,
  },
  errorControl: {
    borderWidth: 2,
    alignItems: 'center',
    borderColor: COLORS.red,
    display: 'flex',
    flexDirection: 'row',
    height: 35,
    width: scale(200),
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
  },
  errorMsg:{
    color: COLORS.red,  justifyContent: 'center',
    alignItems: 'center',  marginLeft: 30,
    marginRight: 'auto', textAlign: 'center', 
    alignItems: 'center',display: 'flex', fontWeight: 'bold',
    //marginVertical: 20,
   marginHorizontal: 10,
  }
});
