import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import TextForm from '../../components/forms/TextForm';
import LogoImage from '../../components/logo_image';
import Loader from '../../components/Loader/Loader';
import { scale, verticalScale } from '../../PixelRatio';
import { COLORS } from '../../constant/Colors';

const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const emailInput = useRef();
  const [termsAccepted, settermsAccepted] = useState(true);

  const handleSubmitPress = () => {
    // navigation.navigate('ResetPassword')
    if (!email) {
      emailInput.current.validateEmail();
    } else {
      setErrortext('');
      let dataToSend = {
        action: 'forgot_password',
        email: email,
      };
      setLoading(true);
    }
  };

  return (
    <View style={styles.outerView}>
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
            <View style={styles.outerMiddle}>
              <LogoImage />
              <View style={styles.middleArea}>
                <Text style={{color: COLORS.label, fontSize: 23, fontWeight: 600}}>
                  Find your account
                </Text>
                <TextForm
                  //placeholder="E-Mail or Username"
                  placeholder="E-Mail"
                  type="text"
                  isRequired={true}
                  ref={emailInput}
                  onChangeText={setEmail}
                  className="inputViewTextIcon"
                />
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => handleSubmitPress()}>
                  <Text style={styles.findButtonText}>Find Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  outerView: {
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
  innerContainer:{
    width: '90%'
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
    width: '90%',
    marginTop: 16,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  sendButton: {
    padding: 2,
    width: scale(150),
    height: verticalScale(35),
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 6,
    backgroundColor: COLORS.button,
    alignItems: 'center',
    justifyContent: 'center'
  },
  findButtonText: {
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    letterSpacing: 1,
    justifyContent: 'space-between',
},
  logoImage: {
    height: '20%',
    width: '45%',
    justifyContent: 'center',
    margin: 'auto',
    flexDirection: 'row',
    marginTop: 20,
  },
  middleArea: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  outerMiddle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  errorTextStyle: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
});
