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
import { Dropdown } from 'react-native-element-dropdown';
//import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactUsScreen = props => {
  const navigation = useNavigation();

  const [searchLocation, setSearchLocation] = useState('');
  const [states, setStates] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const dropDownValues = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const [photo, setPhoto] = useState([]);
  const locationInput = useRef();

  const handleSubmitPress = async () => {
    if (!searchLocation) {
      locationInput.current.validateEmail();
    }
  };

  return (
    <View style={styles.fullPage}>
      <Loader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="always">
        <View style={styles.backgroundImageStyle}>
          <View style={styles.innerContainer}>
            <View style={styles.middleArea}>
              <LogoImage />
             <Text>Contact Us screen</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ContactUsScreen;

const styles = StyleSheet.create({
  fullPage: {
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
  },
  dropdown: {
    width: '100%',
    borderRadius: 5,
    margin: 'auto',
    fontSize:22,
borderColor: COLORS.blue
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
