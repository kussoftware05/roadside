import * as Urls from '../constant/ConstantVariables/Urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from '../constant/ConstantVariables/config';
import { RSA } from 'react-native-rsa-native';

const fetchWithEmptyBody = async (encryptedAuthHeader) => {
  try{

      encryptedAuthHeader = encryptedAuthHeader.replace(/\n/g, '');
      encryptedAuthHeader = encryptedAuthHeader.replace(/\r/g, '');

      let response = await fetch(Urls.apiUrl, { 
          method: 'GET', 
          headers: new Headers({
              'Authorization': encryptedAuthHeader
          }),
          body: '',
      });
     
      let jsonObj = await response.json();

      if(jsonObj !== undefined && jsonObj !== null){
          return jsonObj;
      }
  }
  catch(err){
      console.log(err);            
  }

  return null;
}
const fetchWithBody = async(encryptedAuthHeader, postBody)=>{
  try{
      encryptedAuthHeader = encryptedAuthHeader.replace(/\n/g, '');
      encryptedAuthHeader = encryptedAuthHeader.replace(/\r/g, '');

      let response = await fetch(Urls.apiUrl, { 
          method: 'POST', 
          headers: new Headers({
              'Authorization': encryptedAuthHeader,
          }),
          body: postBody,
      });            
      
      let jsonObj = await response.json();

      if(jsonObj !== undefined && jsonObj !== null){
          return jsonObj;
      }
  }
  catch(err){
      console.log('fetchwithbodyerror'+err);            
  }

  return null;
}

export const userLogin = async(phoneNumber) => {
    try {

  var params = {
        action:'check_user_login',
        phone: phoneNumber,
    };  

    let authStr = JSON.stringify(params);
    let encrypted = await RSA.encrypt(authStr, Config.AuthToken);

    let data  = await fetchWithEmptyBody(encrypted);

    console.log("check_user_login==90"+ JSON.stringify(data))

    if (data && data.code == 200) {
      try {
        await AsyncStorage.setItem('user_phone', phoneNumber);
        await AsyncStorage.setItem('user_qr_code', JSON.stringify(data.qrcode));      
        } catch (error) {
          console.log('SetItem error ', error);
          return null;
        }
        return data;
  }
  else if(data.code == 401) {
    return (data);
  }
  else{
    return (data.message);
  }
    } catch (error) {
      //console.log('error' + error);
      // return custom error message from API if any
      if (error && error.message) {
        return (error.message);
      } else {
        return (error.message);
      }
    }
  };
  export const userRegister = async(dataToSend) => {
    try {

  var params = {
        action:dataToSend.action,
        name: dataToSend.uname,
        address: dataToSend.address,
        city: dataToSend.city,
        zipcode: dataToSend.zip,
        phone: dataToSend.phone,
        age: dataToSend.age,
        gender: dataToSend.gender,
        guardain_name: dataToSend.guardian,
    };  

    let authStr = JSON.stringify(params);
    let encrypted = await RSA.encrypt(authStr, Config.AuthToken);
    let postJson = params;
    let postBody = JSON.stringify(postJson);

    let data  = await fetchWithBody(encrypted,postBody);

    console.log('dt'+JSON.stringify(data))
    if (data && data.code == 200) {
      try {
        //await AsyncStorage.setItem('user_phone', phoneNumber);
        await AsyncStorage.setItem('user_qr_code', JSON.stringify(data.qrcode));      
        } catch (error) {
          console.log('SetItem error ', error);
          return null;
        }
        return data;
  }
  else if(data.code == 401) {
    return (data);
  }
  else{
    return (data.message);
  }
    } catch (error) {
      //console.log('error' + error);
      // return custom error message from API if any
      if (error && error.message) {
        return ('errr'+error.message);
      } else {
        return ('ctc'+error.message);
      }
    }
  };
  export const getUserDetails = async(phoneNumber) => {
    try {

  var params = {
        action:'scan_qrcode',
        qrnumber: phoneNumber,
    };  

    let authStr = JSON.stringify(params);
    let encrypted = await RSA.encrypt(authStr, Config.AuthToken);

    let data  = await fetchWithEmptyBody(encrypted);

    console.log("userdetails==90"+ JSON.stringify(data))

    if (data && data.code == 200) {
      
        return data;
  }
  else if(data.code == 401) {
    return (data);
  }
  else{
    return (data.message);
  }
    } catch (error) {
      //console.log('error' + error);
      // return custom error message from API if any
      if (error && error.message) {
        return (error.message);
      } else {
        return (error.message);
      }
    }
  };
const authService = {
  userLogin,
  userRegister,
  getUserDetails,
};

export default authService;
