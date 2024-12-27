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
  ToastAndroid
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
import Geolocation from 'react-native-geolocation-service';

const HomeScreen = props => {
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
  const [userId, setUserId] = useState();
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  const [state, setState] = useState('');
  
  const locationInput = useRef();

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
            console.log('position11=='+position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
    //getUserLatestLocation();
    //readUserId('user_id');
    // readUserLatitude('user_latitude');
    // readUserLongitude('user_longitude');
   
  }, []);

  const handleSubmitPress = async () => {
    if (!searchLocation) {
      locationInput.current.validateEmail();
    }
    // await userLogin(phoneNumber)
    //   .then(res => {
    //     console.log(JSON.stringify(res));
    //     if (res.message == 'QRCode does not exist.') {
    //       navigation.replace('Registration', {phn: phoneNumber});
    //     } else {
    //       navigation.replace('QrcodeScreens');
    //     }
    //   })
    //   .catch(err => console.log(err));
  };
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
     // Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    console.log('granted', status);
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };
  const getUserLatestLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    if (hasPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
            Alert(position);
            ToastAndroid.show((position.coords.latitude + ', ' + position.coords.longitude),ToastAndroid.LONG);
           console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            // AsyncStorage.setItem('user_latitude', JSON.stringify(position.coords.latitude));
            // setUserLatitude(JSON.stringify(position.coords.latitude));
            // AsyncStorage.setItem('user_longitude', JSON.stringify(position.coords.longitude));
            // setUserLongitude(JSON.stringify(position.coords.longitude));
            // getUserLocation();
            // getData(1);
          },
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }
  // Somewhere in your code
const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleOneTapSignIn.signIn({
      webClientId: `autoDetect`, // works only if you use Firebase
      iosClientId: config.iosClientId, // only needed if you're not using Firebase
    });
    setState({ userInfo });
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.NO_SAVED_CREDENTIAL_FOUND:
          // Android and Apple only. No saved credential found, try calling `createAccount`
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          break;
        case statusCodes.ONE_TAP_START_FAILED:
          // Android-only, you probably have hit rate limiting.
          // On Android, you can still call `presentExplicitSignIn` in this case.
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android-only: play services not available or outdated
          // Web: when calling an unimplemented api (requestAuthorization)
          break;
        default:
        // something else happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
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
              <View style={styles.innerBox}>
                <TextForm
                  placeholder="Search Location..."
                  type="text"
                  isRequired={true}
                  ref={locationInput}
                  onChangeText={setSearchLocation}
                  className="inputViewTextIcon"
                  maxLength="10"
                />
                <View style={styles.dropdown}>
                  <Dropdown
                    data={dropDownValues}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="All States"
                    value={setStates}
                    searchPlaceholder="Search..."
                    onChange={item => {
                      //getAllStates(item.value);
                    }}
                  />
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                 <TouchableOpacity
                style={styles.registrationButton}
                onPress={() => handleSubmitPress()}>
                {/* <Icon name='person-outline' type="MaterialIcons" /> */}
                <Text style={styles.registrationText}>Search</Text>
              </TouchableOpacity>
              </View> 
              <View style={styles.loginButton}>
                  <AppButton onPress={() => navigation.navigate('Registration')}
                    title="Join Us"
                    backgroundColor={COLORS.registratioButton}
                  />
                </View>
                {/* <View><GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={() => {
    // initiate sign in
  }}
  disabled={isInProgress}
/></View> */}
 <View>
        
      </View>
                
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

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
