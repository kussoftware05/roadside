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

const ProfileTextField = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [hidepass, sethidepass] = useState(true);
  const textInput = useRef();
  useImperativeHandle(ref, () => ({
    validateEmail: validateEmail
  }));
  const validateEmail = () => {
    if (props.type == 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!value) {
        setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter email address</Text>);
      } else if (reg.test(value) === false) {
        setErrorText(<Text style={{ color: COLORS.themeColor }}>The email address must include @</Text>);
      } else {
        setErrorText('')
      }
    }
    else if (props.type == 'password') {
      if (value.length === 0) {
        setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter password</Text>)
      } else {
        setErrorText('')
        setValue(value)
      }
    }
    else if (props.type == 'text') {
      if (value.length === 0) {
        setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter {props.placeholder.toLowerCase()} field</Text>);
      }  else {
        setErrorText('')
        setValue(value+'heloo')
      }
    }
    else {
      if (props.isRequired) {
        if (!value) {
          setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter {props.placeholder.toLowerCase()}</Text>);
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
        setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter email address</Text>);
      } else if (reg.test(val) === false) {
        setErrorText(<Text style={{ color: COLORS.themeColor }}>The email address must include @</Text>);
      } else {
        setErrorText('')
        setValue(val)
      }
    }
    else {
      if (props.isRequired) {
        if (!val) {
          setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter {props.placeholder.toLowerCase()}</Text>);
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
              value={'a@a.com'}
            />
            : (props.secureTextEntry !== undefined && props.secureTextEntry === true) ?
              <TextInput
                style={{
                  width: '100%',
                  color: COLORS.loginText,
                  backgroundColor: COLORS.textInput,
                  fontSize:18
                  
                }}
                placeholder={props.placeholder}
                onChangeText={(event) => handleChange(event)}
                onBlur={validateEmail}
                secureTextEntry={hidepass}
              />
              : (props.type === 'number') ?
                <TextInput
                  style={{
                    width: '100%',
                    width: '100%',
                    color: COLORS.loginText,
                    backgroundColor: COLORS.textInput,
                    fontSize:18
                  }}
                  onChangeText={(event) => handleChange(event)}
                  onBlur={validateEmail}
                  keyboardType={'numeric'}
                />
                : (props.type === 'text') ?
                  <TextInput
                    style={{
                      width: '100%',
                     // width: '90%',
                      color: COLORS.loginText,
                      backgroundColor: COLORS.textInput,
                      fontSize:18
                    }}
                    placeholder={props.placeholder}
                    onChangeText={(event) => handleChange(event)}
                    onBlur={validateEmail}
                    value={props.value}
                  /> :
                  (props.type === 'email') ?
                    <TextInput
                      style={{
                        width: '100%',
                        color: COLORS.loginText,
                        backgroundColor: COLORS.textInput,
                        fontSize:18
                      }}
                      placeholder={props.placeholder}
                      onChangeText={(event) => handleChange(event)}
                      onBlur={validateEmail}
                      value={props.value}
                    /> :
                    <TextInput
                      style={{
                        width: '100%',
                        width: '90%',
                        color: COLORS.loginText,
                        backgroundColor: COLORS.textInput,
                        fontSize:18
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
            // <Feather
            //   onPress={() => sethidepass(!hidepass)}
            //   name={hidepass ? 'eye-off' : 'eye'}
            //   type="Ionicons"
            //   style={{ color: COLORS.textInputBorder, fontSize: 20, marginTop: 10, alignContent: 'center' }}
            // /> 
            null : null}
      </View>
      <View style={GlobalStyles.mrgnBtn}>
        {
          (errorText) ?
            <View>
              <Text style={styles.errorTxt}>{errorText}</Text>
            </View>
            : null
        }
      </View>
    </View>
  );
});

export default ProfileTextField;

const styles = StyleSheet.create({
  errorControl: {
    borderWidth: 1,
    borderColor: '#FF641E',
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    width: '100%',
    // width: GlobalStyles.textInputError,

    borderRadius: 5,
  },
  inputViewTextIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderColor: COLORS.textInputBorder,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 4,
    padding:1
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
  disableText: {
    width: '100%',
    padding: 15,
    paddingLeft: 12,
    color: COLORS.loginText,
    backgroundColor: '#F6F5F5',
    borderRadius: 5,
    fontSize:18
  },
  errorTxt:{
    fontSize:18
  }
});