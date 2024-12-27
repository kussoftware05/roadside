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
import { scale } from '../scale';

const ChangePasswordTextFiled = forwardRef((props, ref) => {
    const [value, setValue] = useState('');
    const [errorText, setErrorText] = useState('');
    const [hidepass, sethidepass] = useState(true);
    const textInput = useRef();

    const [password, setPassword] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); 
    const [strength, setStrength] = useState(''); 
    useImperativeHandle(ref, () => ({
        validateFiled: validateFiled
    }));
    const validateFiled = () => {
        //console.log("checkValue"+ value)
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
            let regEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            //console.log('(regEx.test(value)444'+regEx.test(value)+'---'+value.length)
            if (value.length === 0) {
                setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter password</Text>)
            } else if (regEx.test(value) === false) {
                setErrorText(<Text style={{ color: COLORS.themeColor, textAlign: 'center' }}>Your password should be at least 7 characters. Please use also at least one uppercase letter, one lowercase letter, one number and one special signs like ! ? $ % & </Text>);
                //return false;
            }
            else {
                setErrorText('')
                setValue(value)
            }
        }
        else if (props.type == 'text') {
            if (value.length === 0) {
                setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter these field</Text>);
            } else {
                setErrorText('')
                setValue(value)
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
        else if (props.secureTextEntry !== undefined && props.secureTextEntry === true) {
            let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            //console.log('reg.test(val)'+reg.test(val))
            if (!val) {
                setErrorText(<Text style={{ color: COLORS.themeColor }}>Please enter {props.placeholder.toLowerCase()}</Text>);
            } 
            // else  if (val.length < 7) { 
            //     setErrorText(<Text style={{ color: COLORS.themeColor }}>Password should be at least 8 characters long </Text>);
            // } 
            //else if (reg.test(val) === false && reg.test(val) == null) {
            else if (reg.test(val) === false) {
                console.log('reg.test(val)55555'+reg.test(val))
                setErrorText(<Text style={{ color: COLORS.themeColor, textAlign: 'center' }}>Your password should be at least 7 characters. Please use also at least one uppercase letter, one lowercase letter, one number and one special signs like ! ? $ % & </Text>);
                //return false;
            } else {
                setErrorText('')
                setValue(val)
            }
        }
        else {
            if (props.isRequired) {
                if (!val) {
                    setErrorText(<Text style={{ color: COLORS.themeColor}}>Please enter {props.placeholder.toLowerCase()}</Text>);
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
                        : (props.secureTextEntry !== undefined && props.secureTextEntry === true && props.type === 'password') ?
                            <TextInput
                                style={{
                                    width: '100%',
                                    borderRadius: 20,
                                    paddingLeft: 10,
                                    color: COLORS.loginText,
                                    backgroundColor: COLORS.textInput,

                                }}
                                placeholder={props.placeholder}
                                onChangeText={(event) => handleChange(event)}
                                onBlur={validateFiled}
                                secureTextEntry={hidepass}
                            />
                            : (props.type === 'number') ?
                                <TextInput
                                    style={{
                                        width: '100%',
                                        borderRadius: 20,
                                        paddingLeft: 10,
                                        color: COLORS.loginText,
                                        backgroundColor: COLORS.textInput,
                                    }}
                                    onChangeText={(event) => handleChange(event)}
                                    onBlur={validateFiled}
                                    keyboardType={'numeric'}
                                />
                                : (props.type === 'text') ?
                                    <TextInput
                                        style={{
                                            width: '100%',
                                            borderRadius: 20,
                                            paddingLeft: 10,
                                            color: COLORS.loginText,
                                            backgroundColor: COLORS.textInput,
                                        }}
                                        placeholder={props.placeholder}
                                        onChangeText={(event) => handleChange(event)}
                                        onBlur={validateFiled}
                                    /> :
                                    (props.type === 'email') ?
                                        <TextInput
                                            style={{
                                                width: '100%',
                                                borderRadius: 20,
                                                paddingLeft: 10,
                                                color: COLORS.loginText,
                                                backgroundColor: COLORS.textInput,
                                            }}
                                            placeholder={props.placeholder}
                                            onChangeText={(event) => handleChange(event)}
                                            onBlur={validateFiled}
                                        /> :
                                        <TextInput
                                            style={{
                                                width: '100%',
                                                 borderRadius: 20,
                                                 paddingLeft: 10,
                                                color: COLORS.loginText,
                                                backgroundColor: COLORS.textInput,
                                            }}
                                            onChangeText={(event) => handleChange(event)}
                                            onBlur={validateFiled}
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
            <View style={styles.errorStyling}>
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

export default ChangePasswordTextFiled;

const styles = StyleSheet.create({
    errorControl: {
        borderWidth: 1,
        borderColor: COLORS.orange,
        display: 'flex',
        flexDirection: 'row',
        height: 45,
        width: '80%',
        // width: GlobalStyles.textInputError,

        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
    },
    inputViewTextIcon: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        height: 45,
        marginBottom: 4,
        marginLeft: 'auto',
        marginRight: 'auto'
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
    },
    errorStyling:{
        width:scale(280),
        margin: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        textAlign: 'center',
        //marginLeft: scale(50),
    }
});