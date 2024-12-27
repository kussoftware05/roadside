import { StyleSheet, Text, View, ScrollView, TextInput, ImageBackground, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import TextForm from '../../components/forms/TextForm';
import CheckBoxKus from '../../components/forms/Checkbox';
import Loader from '../../components/Loader/Loader';
import LogoImage from '../../components/logo_image';
import {COLORS} from '../../constant/Colors';
import { scale, verticalScale } from '../../PixelRatio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userRegister } from '../../actions/authActions';

const TowingServiceScreen = props => {
   //const {phn} = route.params;

   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [lastName, setLastName] = useState('');
   const [message, setMessage] = useState('');
  
   const [errortext, setErrortext] = useState('');
   const phoneInput = useRef();
   const nameInput = useRef();
   const lastNameInput = useRef();
   const emailInput = useRef();
   const messageInput = useRef();

   const [termsAccepted, settermsAccepted] = useState(true);
   const [loading, setLoading] = useState(false);

  
   const handleSubmitPress = async() => {
       let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

       if (!name) {
           nameInput.current.validateEmail()
       }
       else if (!lastName) {
           lastNameInput.current.validateEmail()
       }
       else if (!phone) {
           phoneInput.current.validateEmail()
       }
       else if (!email) {
           emailInput.current.validateEmail()
       }
       else if (!message) {
           messageInput.current.validateEmail()
       }
       
       else{
           setLoading(true);
       // const dataToSend = {
       //     action:"register_user",
       //     phone:phn,
       //     uname:uname,
       //     age:age,
       //     gender:gender,
       //     address:address,
       //     city:city,
       //     zip:zip,
       //     guardian:guardian,
       //   };
       //   //console.log(JSON.stringify(dataToSend))
       //   await userRegister(dataToSend).then(res=>{
       //     console.log(JSON.stringify(res))
       //     setLoading(false);
       //     if(res.code==200)
       //       {
       //         navigation.replace('QrcodeScreens');
       //       }
       //     else 
       //         {
       //             setErrortext(res.message)
       //         }
       //   }).catch(err=>console.log(err))
      
       }  
   }

   const handleCheckBox = () => {
       settermsAccepted(true);
   }
  
   return (
            <ScrollView showsVerticalScrollIndicator={false} >
            <Loader loading={loading} />
           
           <View style={styles.inputContainer}>
           <View style={styles.backgroundImageStyle}>
               <View style={styles.innerContainer}>
                   <View style={styles.middleArea}>
                   <LogoImage />
                       
                       <TextForm
                           placeholder="Name"
                           type="text"
                           isRequired={true}
                           ref={nameInput}
                           onChangeText={setName}
                       />
                       <TextForm
                           placeholder="Last Name"
                           type="text"
                           isRequired={true}
                           ref={lastNameInput}
                           onChangeText={setLastName}
                       />
                        <TextForm
                           placeholder="Phone Number"
                           type="number"
                           disable={true}
                           isRequired={true}
                           ref={phoneInput}
                           //value={phn}
                           readOnly={true}
                           onChangeText={setPhone}
                           className='inputViewTextIcon'
                           maxLength = '10'
                       />
                       <TextForm
                           placeholder="Email"
                           type="email"
                           isRequired={true}
                           ref={emailInput}
                           onChangeText={setEmail}
                           maxLength = '2'
                       />
                       <TextForm
                           placeholder="Message"
                           type="text"
                           isRequired={true}
                           ref={messageInput}
                           onChangeText={setMessage}
                       />
                       <View style={styles.MainermsConditions}>
                           <CheckBoxKus
                               selected={termsAccepted}
                               onPress={handleCheckBox}
                               text='I accept your terms and condition'
                           />
                       </View>
                       {errortext != '' ? (
                           <Text style={styles.errorTextStyle}> {errortext} </Text>
                       ) : null}
                       <TouchableOpacity
                           style={styles.registerButton}
                           onPress={() => handleSubmitPress()}
                       >
                       <Text style={styles.registerText}>Join Now</Text>
                       </TouchableOpacity>
                       
                   </View>
               </View>
           </View>
           </View>
       </ScrollView>
   )
};
export default TowingServiceScreen;

const styles = StyleSheet.create({
  inputContainer: {
      flex: 1, 
      width: '100%',
       height: '100%',
      backgroundColor: COLORS.backgroundContainer,
  },
  backgroundImageStyle: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:90,
  },
  textInputStyle: {
      width: '80%',
      marginTop: 16,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: COLORS.backgroundContainer,
      borderRadius: 5
  },
  registerButton: {
      padding: 2,
      width: scale(150),
      height: verticalScale(45),
      borderRadius: 10,
      marginBottom:20,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingVertical: 6,
      backgroundColor:COLORS.button,
      alignItems: 'center',
      justifyContent: 'center'
  },
  registerText: {
      color: COLORS.white,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 18,
      padding: 5,
      letterSpacing: 1,
      justifyContent: 'space-between',
  },
  checkboxView: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'fitContent',
      width: '100%',
      height: 50,
      flexDirection: 'row'
  },
  logoImage: {
      height: '11%',
      width: '25%',
      justifyContent: 'center',
      margin: 'auto',
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20
  },
  termsText: {
      color: COLORS.white,
      fontSize: 17
  },
  middleArea: {
      width: '100%',
      height: '100%',
      alignItems: 'center'
  },
  innerContainer:{
      width: '80%',
    },
  checkboxStyle: {
      borderColor: COLORS.white,
      color: COLORS.white
  },
  loginText: {
      marginTop: 15,
      color: COLORS.label,
      fontSize: 18,
      marginBottom: 10,
      fontWeight: '500'
  },
  MainermsConditions: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      //paddingLeft: 20,
      marginBottom: 10
  },
  errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '600',
      padding: 5
    },
    errorMessage: {
      fontWeight: '500',
      fontSize: 15,
      color: COLORS.themeColor,
      width: '100%',
    },
})
