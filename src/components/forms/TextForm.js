import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import GlobalStyles from '../../assests/css/Style';
import {Feather} from 'react-native-vector-icons';
import { COLORS } from '../../constant/Colors';

const TextForm = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [hidepass, sethidepass] = useState(true);
  const textInput = useRef();
  useImperativeHandle(ref, () => ({
    validateEmail: validateEmail
  }));
  const validateEmail = () => {
    console.log('validate'+ JSON.stringify(props))
    if (props.type == 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!value) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter email address</Text>);
      } else if (reg.test(value) === false) {
        setErrorText(<Text style={{ color: '#FF641E' }}>The email address must include @</Text>);
      } else {
        setErrorText('')
      }
    }
    else if (props.type == 'password') {
      if (value.length === 0) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter password</Text>)
      } else {
        setErrorText('')
        setValue(value)
      }
    }
    else if (props.type == 'text') {
      if (value.length === 0) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter {props.placeholder.toLowerCase()}</Text>);
      }  else {
        setErrorText('')
        setValue(value)
      }
    }
    else {
      if (props.isRequired) {
        if (!value) {
          setErrorText(<Text style={{ color: '#FF641E' }}>Please enter {props.placeholder.toLowerCase()}</Text>);
        } else {
          setErrorText('')
        }
      }
      else {
        setErrorText('')
      }
    }
  }

  const handleChange = (val) => {
    props.onChangeText(val);
    if (props.type == 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!val) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter email address</Text>);
      } else if (reg.test(val) === false) {
        setErrorText(<Text style={{ color: '#FF641E' }}>The email address must include @</Text>);
      } else {
        setErrorText('')
        setValue(val)
      }
    }
    else if (props.type == 'number') {
      let reg = /^[0-9\b]+$/;
      if (!val) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter {props.placeholder.toLowerCase()}</Text>);
      } else if (reg.test(val) === false) {
        setErrorText(<Text style={{ color: '#FF641E' }}>Please enter valid {props.placeholder.toLowerCase()}</Text>);
      } else {
        setErrorText('')
        setValue(val)
      }
    }
    else if (props.secureTextEntry !== undefined && props.secureTextEntry === true) {
      let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (!val) {
          setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter {props.placeholder.toLowerCase()}</Text>);
      } 
      // else  if (val.length < 7) { 
      //     setErrorText(<Text style={{ color: COLORS.themeColor }}>Password should be at least 8 characters long </Text>);
      // } 
      else if (reg.test(val) === false) {
          setErrorText(<Text style={styles.errorMessage} >Your password should be Strong </Text>);
      } else {
          setErrorText('')
          setValue(val)
      }
  }
    else {
      if (props.isRequired) {
        if (!val) {
          setErrorText(<Text style={{ color: '#FF641E' }}>Please enter {props.placeholder.toLowerCase()}</Text>);
        } else {
          setErrorText('')
          setValue(val)
        }
      }
      else {
        setErrorText('')
        setValue(val)
      }
    }
  }
  return (
    <View style={GlobalStyles.inputView}>
      {/* <Text style={GlobalStyles.signupLabel}>{props.label}{(props.isRequired) ? <Text style={{color:'red'}}> * </Text> : null}</Text> */}
      <View style={`${errorText}` ? styles.errorControl : styles.inputViewTextIcon}>
        {
          (props.readOnly !== undefined && props.readOnly === true) ?
            <TextInput
              style={styles.disableText}
              editable={false}
              contextMenuHidden={true}
              value={props.value}
            />
            : (props.secureTextEntry !== undefined && props.secureTextEntry === true) ?
            <View style={styles.passwordInput}>
              <TextInput
                style={{
                  //...GlobalStyles.textInput,
                  ...styles.passwordBox,
                  paddingLeft: 10,
                  color: COLORS.loginText,
                  backgroundColor: COLORS.textInput,
                }}
                placeholder={props.placeholder}
                onChangeText={(event) => handleChange(event)}
                onBlur={validateEmail}
                secureTextEntry={hidepass}
              />
              <View style={styles.passwordIcon}>
              {/* <Feather
              onPress={() => sethidepass(!hidepass)}
              name={hidepass ? 'eye-off' : 'eye'}
              type="Ionicons"
              style={styles.passwordIconstyle}
            /> */}
              </View>
              
            </View>
              : (props.type === 'number') ?
                <TextInput
                  style={{
                    ...GlobalStyles.textInput,
                    //width: '90%',
                    color: COLORS.loginText,
                    backgroundColor: COLORS.textInput,
                  }}
                  onChangeText={(event) => handleChange(event)}
                  onBlur={validateEmail}
                  keyboardType={'numeric'}
                  placeholder={props.placeholder}
                  value={props.value}
                  maxLength = {10}
                />
                : (props.type === 'text') ?
                  <TextInput
                    style={{
                      ...GlobalStyles.textInput,
                     // width: '90%',
                      color: COLORS.loginText,
                      backgroundColor: COLORS.textInput,
                    }}
                    placeholder={props.placeholder}
                    onChangeText={(event) => handleChange(event)}
                    onBlur={validateEmail}
                  /> :
                  (props.type === 'email') ?
                    <TextInput
                      style={{
                        ...GlobalStyles.textInput,
                        color: COLORS.loginText,
                        backgroundColor: COLORS.textInput,
                      }}
                      placeholder={props.placeholder}
                      onChangeText={(event) => handleChange(event)}
                      onBlur={validateEmail}
                    /> :
                    <TextInput
                      style={{
                        ...GlobalStyles.textInput,
                        width: '90%',
                        color: COLORS.loginText,
                        backgroundColor: COLORS.textInput,
                      }}
                      onChangeText={(event) => handleChange(event)}
                      onBlur={validateEmail}
                    />
        }
        {`${errorText}` ?
          <View>
            {/* <Image source={require('../../../assets/images/Iconly-Light-Outline-Info-Square.png')} style={styles.errorIcon} /> */}
          </View>
          : (props.type == 'password') ?
            null : null}
      </View>
      <View style={GlobalStyles.mrgnBtn}>
        {
          (errorText) ?
            <View>
              <Text>{errorText}</Text>
            </View>
            : null
        }
      </View>
    </View>
  );
});

export default TextForm;

const styles = StyleSheet.create({
  inputView:{
   flex:1,
   justifyContent: 'center',
   textAlign: 'center',
  },
  errorControl: {
    borderWidth: 1,
    borderColor: '#FF641E',
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    width: '100%',
    borderRadius: 5,
  },
  inputViewTextIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderColor: COLORS.textInputBorder,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 4,
  },
  errorIcon: {
    marginLeft: 6,
    right: 0,
    marginRight: 0,
    paddingRight: 0,
    height: 20,
    width: 20,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  passwordInput:{
   width: '100%',
   flexDirection: 'row',
   backgroundColor: COLORS.textInput,
  },
  passwordBox:{
    width: '85%',
    // width: '100%',  
    margin: 'auto',
   // borderRadius: 5,
   fontSize:18,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
   },
   passwordIcon:{
    width: '15%',
    paddingRight: 10,
    color: COLORS.editButtonColor,
    backgroundColor: COLORS.textInput,
    //borderRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
   },
   passwordIconstyle:{
    //flex: 1,
    color: COLORS.textListColorBold, 
    fontSize: 20, 
    marginTop: 10, 
    alignContent: 'flex-end',
    marginRight: 0,
   },
  disableText: {
    width: '100%',
    padding: 15,
    paddingLeft: 12,
    color: COLORS.loginText,
    backgroundColor: '#F6F5F5',
    borderRadius: 5,
    fontSize:22
  },
  errorMessage: {
    color: COLORS.themeColor,
    width: '60%',
  },
});