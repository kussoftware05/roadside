import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef, ReactNode} from 'react';
import LogoImage from '../../components/logo_image';
import {useNavigation} from '@react-navigation/native';
import TextForm from '../../components/forms/TextForm';
import Loader from '../../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../../constant/Colors';
import {scale} from '../../PixelRatio';
import {verticalScale} from '../../components/scale';
import AppButton from '../../components/forms/AppButton';
import {userLogin} from '../../actions/authActions';
import Icons from 'react-native-vector-icons/MaterialIcons';

const LoginScreens = props => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const phoneInput = useRef();

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmitPress = async () => {
    navigation.navigate('DefaultScreens');
    // if (!phoneNumber) {
    //   phoneInput.current.validateEmail();
    // }
    // await userLogin(phoneNumber).then(res=>{
    //   console.log(JSON.stringify(res))
    //   if(res.message=='QRCode does not exist.')
    //     {
    //       navigation.replace('Registration',{phn:phoneNumber});
    //     }
    //     else{
    //       navigation.replace('QrcodeScreens');
    //     }
    // }).catch(err=>console.log(err))
  };

  return (
    <View style={styles.wholePage}>
      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="always">
        <View style={styles.backgroundImageStyle}>
        <View style={styles.arrowButton}>
              <Icons
                name="arrow-back"
                size={25}
                color="black"
                onPress={() => navigation.goBack()}
                style={styles.goBackArrow}
              />
            </View>
          <View style={styles.innerContainer}>
         
            <View style={styles.middleArea}>
              <LogoImage />
              <View style={styles.innerBox}>
                {/* <TextForm
              placeholder="Phone Number"
              type="email"
              isRequired={true}
              ref={phoneInput}
              onChangeText={setPhoneNumber}
              className="inputViewTextIcon"
              maxLength = '10'
            /> */}
                <TextForm
                  placeholder="E-Mail or Username"
                  type="text"
                  isRequired={true}
                  ref={emailInput}
                  onChangeText={setEmail}
                  className="inputViewTextIcon"
                  returnKeyType="next"
                  onSubmitEditing={e => passwordInput.current.focus(e)}
                  blurOnSubmit={false}
                />
                <TextForm
                  placeholder="Password"
                  type="password"
                  isRequired={true}
                  secureTextEntry={true}
                  ref={passwordInput}
                  onChangeText={setPassword}
                />

                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <View style={styles.forgotPassword}>
                  <TouchableOpacity>
                    <Text
                      style={styles.forgotPasswordText}
                      onPress={() => navigation.navigate('ForgotPassword')}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.loginButton}>
                  <AppButton
                    onPress={() => handleSubmitPress()}
                    title="LOGIN"
                    backgroundColor={COLORS.registratioButton}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreens;

const styles = StyleSheet.create({
  wholePage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundContainer,
  },
  backgroundImageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
  },
  arrowButton:{
    marginTop: verticalScale(40),
    width:'auto',
    alignSelf: 'flex-start' 
  },
  goBackArrow: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textInputStyle: {
    width: '80%',
    marginTop: 16,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  loginButtonsStyle: {
    width: '50%',
    marginTop: 16,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#FE6518',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registrationButton: {
    marginTop: 20,
    padding: 2,
    width: scale(275),
    height: verticalScale(35),
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 6,
    backgroundColor: COLORS.registratioButton,
  },
  registrationText: {
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    letterSpacing: 1,
    justifyContent: 'space-between',
  },
  middleArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  innerBox: {
    width: '100%',
    marginTop: 50,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    //borderWidth: 2,
    //borderColor: COLORS.white,
    //borderRadius: 10,
    // backgroundColor: '#282828',
    //backgroundColor: 'transparent',
    //backgroundColor: 'rgba(52, 52, 52, 0.8)',
    //backgroundColor: '#ADD8E6',
    //opacity: 0.9,
    // shadowOpacity: 0.6,
    //shadowRadius: 3,
  },
  forgotPassword: {
    marginTop: -7,
    width: '100%',
    alignItems: 'flex-end',
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: COLORS.label,
    marginTop: 0,
    fontSize: 17,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
