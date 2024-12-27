import React, {useState, useEffect, createRef} from 'react';
import {View, Text, Alert, StyleSheet, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constant/Colors';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomSidebarMenu = props => {

  const [userId, setUserId] = useState('');
  const [userKey, setUserKey] = useState('');
  const [userName, setUserName] = useState('Deepak');
  const [uploadedPicture, setUploadedPicture] = useState('');

  // useEffect(() => {
  //   readUserId('user_id');
  //   readUserKey('user_key');
  //   readUserName('user_name');
  // }, []);

  useEffect(() => {
    getUserProfile();
  }, [userName, userKey]);

  const readUserId = async user_id => {
    try {
      const userId1 = JSON.parse(await AsyncStorage.getItem(user_id));
      if (userId1 !== null) {
        setUserId(userId1);
      }
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage');
    }
  };
   // read storage data userName
  const readUserName = async user_name => {
    try {
      const username1 = JSON.parse(await AsyncStorage.getItem(user_name));
      if (username1 !== null) {
        setUserName(username1);
      }
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage');
    }
  };
   // read storage data userKey
  const readUserKey = async user_key => {
    try {
      const userKey1 = JSON.parse(await AsyncStorage.getItem(user_key));
      if (userKey1 !== null) {
        setUserKey(userKey1);
      }
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage');
    }
  };
  const getUserProfile = async() => {
      const user = {
        user_key:userKey,
        user_name :userName
      };
     
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.menuBackground,
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.menuBackground,
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    color: 'white',
    backgroundColor: COLORS.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.logoColor,
    borderWidth: 2,
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
  picture: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderColor: COLORS.logoColor,
    borderWidth: 2,
  },
});
