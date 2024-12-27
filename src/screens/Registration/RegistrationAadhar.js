import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    Image,
    Linking,
    TouchableOpacity,
    PermissionsAndroid
  } from 'react-native';
  import React, {useState, useEffect, useRef, ReactNode} from 'react';
  import LogoImage from '../../components/logo_image';
  import {useNavigation} from '@react-navigation/native';
  import TextForm from '../../components/forms/TextForm';
  import Loader from '../../components/Loader/Loader';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { COLORS } from '../../constant/Colors';
  import { scale } from '../../PixelRatio';
  import { verticalScale } from '../../components/scale';
  import AppButton from '../../components/forms/AppButton';
  
  const RegistrationAadhar = (props) => {
    const navigation = useNavigation();
  
    
    const [errortext, setErrortext] = useState('');
    const [loading, setLoading] = useState(false);
    const [frontAadhar, setFrontAadhar] = useState([]);
    const [backAadhar, setBackAadhar] = useState([]);
    const [flashMode, setFlashMode] = useState(false);
    const [zoom, setZoom] = useState(0.2);

    const registerWithAadharFront = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.openCamera({
            mediaType: 'image',
            includeBase64: true,
            compressImageQuality: 0.5,
          })
            .then(image => {
              addFrontAadhar({
                base64: image.data,
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
              });
            })
            .catch(e => alert(e));
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const addFrontAadhar = image => {
      if (frontAadhar.length) {
        let lastImage = frontAadhar.reduce((prev, current) => {
          return prev.Id > current.Id ? prev : current;
        });
        image.Id = lastImage.Id + 1;
      } else {
        image.Id = 1;
      }
      image.DateTime = Date.now();
      setFrontAadhar([...frontAadhar, image]);
    };

    const registerWithAadharBack = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openCamera({
              mediaType: 'image',
              includeBase64: true,
              compressImageQuality: 0.5,
            })
              .then(image => {
                addBackAadhar({
                  base64: image.data,
                  uri: image.path,
                  width: image.width,
                  height: image.height,
                  mime: image.mime,
                });
              })
              .catch(e => alert(e));
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
      const addBackAadhar = image => {
        if (backAadhar.length) {
          let lastImage = backAadhar.reduce((prev, current) => {
            return prev.Id > current.Id ? prev : current;
          });
          image.Id = lastImage.Id + 1;
        } else {
          image.Id = 1;
        }
        image.DateTime = Date.now();
        setBackAadhar([...backAadhar, image]);
      };
    const handleSubmitPress = async() => {
     // navigation.replace('DrawerNavigationRoutes');
      console.log('front--'+JSON.stringify(frontAadhar));
      console.log('back--'+JSON.stringify(backAadhar));
      //console.log(backAadhar);
        //setLoading(true)
    };
  const onSuccess = (e) => {
    if(e.data !== null)
      {
        //console.log(e.data);
        navigation.replace('DefaultScreens',{phn:e.data});
      }
    // Linking.openURL(e.data).catch(err =>
    //     console.error('An error occured', err)
    //   );
    console.log(e);
  }
  const bottomView = () => {
    return (
        <View
          style={{ flex: 1, flexDirection: "row", backgroundColor: "#0000004D" }}
        >
          <TouchableOpacity
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onPress={() => setFlashMode(!flashMode )}
          >
            <Text style={{ color: "#fff" }}>SCAN</Text>
          </TouchableOpacity>
        </View>
      );
  }
      /* fetch server data after login end*/
    return (
      <View style={styles.wholePage}>
        <View style={styles.container}>
        <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      </View>
      </View>
    );
  };
  export default RegistrationAadhar;
  
  const styles = StyleSheet.create({
    wholePage: {
        flex:1,
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
      width: '80%'
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
      backgroundColor: COLORS.registratioButton
    },
    registrationText:{
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
    innerBox:{
      width: '100%',
      marginTop: 50,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 2,
      borderColor: COLORS.white,
      borderRadius: 10,
      // backgroundColor: '#282828',
      //backgroundColor: 'transparent',
      //backgroundColor: 'rgba(52, 52, 52, 0.8)',
      backgroundColor: '#ADD8E6',
      opacity: 0.9,
     // shadowOpacity: 0.6,
      //shadowRadius: 3,
    },
    forgotPassword: {
      marginTop: -7,
      width: '100%',
      alignItems: 'flex-end',
    },
    loginButton:{
      marginTop: 20,
        width: '100%',
        alignItems: 'center'
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
  