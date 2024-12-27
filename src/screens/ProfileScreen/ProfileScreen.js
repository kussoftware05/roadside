import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
//import Icons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constant/Colors';
import {useNavigation} from '@react-navigation/native';
import ProfileTextField from '../../components/forms/ProfileTextField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader/Loader';
import {scale, verticalScale} from '../../PixelRatio';
import AppButton from '../../components/forms/AppButton';


const ProfileScreen = () => {
  const navigation = useNavigation();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [familyname, setFamilyname] = useState('');

  const [loading, setLoading] = useState(false);
  const usernameInput = useRef();
  const emailInput = useRef();
  const firstnameInput = useRef();
  const familynameInput = useRef();


  // auto loaded
  // useEffect(() => {
  //   getUserProfile();
  // }, [userKey, userName, userId]);

  // const getUserProfile = async () => {
  //   if (userId) {
  //     setLoading(true);
  //   }
  // };
  const handleSubmitPress = async () => {
    setLoading(true);
   
    
  };
  
  return (
    <ScrollView
      style={styles.wholePage}
      >
      <View style={styles.screenOuter}>
        <Loader loading={loading}/>
        <View style={styles.screenInner}>
          <Loader loading={loading} />
          <View style={styles.upperArea}>
            <Text style={styles.heading}>My Profile</Text>
          </View>
          <View style={styles.fieldSection}>
            <View style={styles.inputField}>
              <Text style={styles.label}>Username:</Text>
              <ProfileTextField
                placeholder="Username"
                type="text"
                isRequired={true}
                ref={usernameInput}
                onChangeText={setUsername}
                value={username}
                className="inputViewTextIcon"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Email:</Text>
              <ProfileTextField
                placeholder="Email"
                type="email"
                isRequired={true}
                ref={emailInput}
                onChangeText={setEmail}
                keyboardType="email-address"
                value={email}
                className="inputViewTextIcon"
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Firstname:</Text>
              <ProfileTextField
                placeholder="First Name"
                type="text"
                isRequired={true}
                ref={firstnameInput}
                onChangeText={setFirstname}
                className="inputViewTextIcon"
                value={firstname}
              />
            </View>
            <View style={styles.inputField}>
              <Text style={styles.label}>Familyname:</Text>
              <ProfileTextField
                placeholder="Family Name"
                type="text"
                isRequired={true}
                ref={familynameInput}
                onChangeText={setFamilyname}
                className="inputViewTextIcon"
                value={familyname}
              />
            </View>
          </View>
          <View style={styles.buttonArea}>
            <View style={styles.save}>
              <AppButton
                onPress={() => handleSubmitPress()}
                title="Save"
                backgroundColor={COLORS.button}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  screenOuter: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  screenInner: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    //borderWidth:1,
    //borderColor:'red'
  },
  upperArea: {
    width: '100%',
    height: 50,
    // borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 25,
     fontWeight: 'bold',
    color: COLORS.textListColorBold,
  },
  fieldSection: {
    //paddingVertical: 20,
    width: '100%',
  },
  inputField: {
    width: '100%',
    flexDirection: 'column',
    //marginHorizontal: 10,
    margin: 'auto',
  },
  label: {
    fontSize: 18,
    color: COLORS.borderColor,
    padding: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cancel: {
    marginTop: 20,
    width: '40%',
    alignItems: 'center',
  },
  save: {
    marginTop: 15,
    width: '40%',
    alignItems: 'center',
  },
  saveBtn: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
