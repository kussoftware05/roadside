import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Pressable,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableHighlight,
  TextInput,
  Alert,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
//import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constant/Colors';
import {useNavigation} from '@react-navigation/native';
// import {ListItem} from 'react-native-elements';
import {selectError, selectUserId, logout} from '../../redux/slices/authSlice';
import Loader from '../../components/Loader/Loader';
import {scale, verticalScale, moderateScale} from '../../components/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
//import resetStore from './../../redux/store'
import {store, persistor} from './../../redux/store';
import NetInfo from '@react-native-community/netinfo';
import AppButton from '../../components/forms/AppButton';

const ProfileSettings = ({navigation}) => {
 // const navigation = useNavigation();
  const dispatch = useDispatch();
  //const userId = useSelector(selectUserId);

  const [isAccount, setAccount] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const [userId, setUserId] = useState('');
  const [userKey, setUserKey] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    readUserId('user_id');
    readUserKey('user_key');
    readUserName('user_name')
    getNetInfo();
  }, [userKey, userName]);


// useEffect(() => {
//   getPhoneData();
// }, [deviceId]);

  // read storage data userID
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
  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        // ToastAndroid.showWithGravity(
        //   'Back to online mode.',
        //   ToastAndroid.SHORT,
        //   ToastAndroid.CENTER,
        // );
      } else {
        ToastAndroid.showWithGravity(
          'You are currently offline mode.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    });
  };
  
  const toggleAccount = () => {
    setAccount(previousState => !previousState);
  };
  const [isNew, setNew] = useState(false);
  const toggleNew = () => {
    setNew(previousState => !previousState);
  };
  const [isOpportunity, setOpportunity] = useState(false);
  const toggleOppertunity = () => {
    setOpportunity(previousState => !previousState);
  };
  const showDeleteModal = userId => {
    // setModalVisible(false);
    setDeleteModal(true);
  };
  const hideDeleteModal = () => {
    setLoading(false);
    setFeedback('');
    setDeleteModal(false);
  };
  const handleSubmitPress = () => {
    Alert.alert('Coming soon!');
    // setLoading(true);
    // let item = {
    //   action: 'edit_song',
    // };

    // dispatch(updateSonganizeAction(item)).then(res => {
    //   if (res.type == 'auth/updateSonganize/rejected') {
    //     setErrortext(res.payload);
    //   } else {
    //     setLoading(false);
    //     Alert.alert('Alert', 'You have successfully Updated.', [{text: 'OK'}], {
    //       cancelable: false,
    //     });
    //     navigation.navigate('Songanize');
    //   }
    // });
  };

// const removeItemValue = async() => {
//   try {
//       //await AsyncStorage.removeItem(key);
//       await AsyncStorage.clear();
//       AsyncStorage.removeItem('persist:root', (err, result) => {
//         console.log(err);
//     });
//     persistor.purge();
//     navigation.navigate('Login');
//       return true;
//   }
//   catch(exception) {
//       return false;
//   }
// }
const clearAll = async () => {
  let keys = []
  try {
    // await AsyncStorage.clear()
    // keys = await AsyncStorage.getAllKeys()
    // console.log(`Keys: ${keys}`) // Just to see what's going on
    // await AsyncStorage.removeItem('persist:root');
    // await AsyncStorage.removeItem('user_id');
    // await AsyncStorage.removeItem('user_key');
    // await AsyncStorage.removeItem('user_name');

    await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
      //   .then(() => 
      //   navigation.navigate('Login')
      // );
    
  } catch(e) {
    // clear error
    console.log('not able to clear')
  }
  console.log('Done.')
}
const removeItemValue = async(key) => {
  console.log(key)
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}
const handleSignOut = () => {  
  Alert.alert(
    'Sign Out',
    'Are you sure to sign out?',
    [
      {
        text: 'Cancel',
        onPress: () => {
          return null;
        },
      },
      {
        text: 'Confirm',
        onPress: () => {
         
           dispatch(logout())
           clearAll()
          navigation.navigate('Login');
        },
      },
    ],
    {cancelable: false},
  );
};
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.screenOuter}>
      <View style={styles.screenInner}>
        <View style={styles.header}>
        <Text style={styles.titleHead}>Settings</Text>
        </View>
        <Text style={styles.head}>Account</Text>
      {/* <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
        style={styles.flatlist}
      /> */}

      <View style={styles.contentArea}>
        <TouchableOpacity
          style={styles.contents}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.contentText}>Change Password</Text>
          {/* <Icons
            name="arrow-forward"
            color={COLORS.logoColor}
            style={{
              alignSelf: 'center',
            }}
            size={22}
          /> */}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.contents}>
          <Text style={styles.contentText}>Content Settings</Text>
          <Icons
            name="arrow-forward"
            color={COLORS.logoColor}
            style={{
              alignSelf: 'center',
            }}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contents}>
          <Text style={styles.contentText}>Social</Text>
          <Icons
            name="arrow-forward"
            color={COLORS.logoColor}
            style={{
              alignSelf: 'center',
            }}
            size={22}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.contents}>
          <Text style={styles.contentText}>Privacy and Security</Text>
          <Icons
            name="arrow-forward"
            color={COLORS.logoColor}
            style={{
              alignSelf: 'center',
            }}
            size={22}
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.contents}>
          <Text style={styles.contentText}>Languages</Text>
          <Icons
            name="arrow-forward"
            color={COLORS.logoColor}
            style={{
              alignSelf: 'center',
            }}
            size={22}
          />
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.head}>Notification</Text>

      <View style={styles.content}>
        <View style={styles.checkBoxes}>
          <Text style={styles.contentText}>New for you</Text>
          <View style={styles.container}>
            <Switch onValueChange={toggleNew} value={isNew} />
          </View>
        </View>
        <View style={styles.checkBoxes}>
          <Text style={styles.contentText}>Account activity</Text>
          <View style={styles.container}>
            <Switch onValueChange={toggleAccount} value={isAccount} />
          </View>
        </View>
        <View style={styles.checkBoxes}>
          <Text style={styles.contentText}>Opportunity</Text>
          <View style={styles.container}>
            <Switch onValueChange={toggleOppertunity} value={isOpportunity} />
          </View>
        </View>
      </View> */}
      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, styles.buttonBox]}
          onPress={() => showDeleteModal(userId)}>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity>
              <MaterialIcons
                name="account-cancel"
                color={COLORS.white}
                style={{
                  alignSelf: 'center',
                }}
                size={22}
              />
            </TouchableOpacity> */}
            <Text style={styles.buttonText}>Delete account</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonBox]}
          onPress={() => handleSignOut()}
          >
          <View style={styles.buttonContainer}>
            <TouchableOpacity>
              {/* <Icons
                name="logout"
                color={COLORS.white}
                style={{
                  alignSelf: 'center',
                }}
                size={22}
              /> */}
            </TouchableOpacity>
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          hideDeleteModal();
        }}>
        <ScrollView>
          <View style={styles.deleteModalView}>
            <View style={styles.deleteModalViewSub}>
              <Loader loading={loading} />
              <View style={styles.buttonCloseOptionContainer}>
                <TouchableHighlight
                  style={{
                    ...styles.closeButton,
                    backgroundColor: COLORS.logoColor,
                  }}
                  onPress={() => {
                    hideDeleteModal();
                    // setDeleteModal(!deleteModal);
                  }}>
                  {/* <Icons name="close" size={30} color={COLORS.white} /> */}
                </TouchableHighlight>
              </View>
              <Text style={styles.deleteModalHeading}>Delete Account</Text>
              <Text style={styles.deleteModalSubHeading}>
                Please be aware that your account will be deleted completly.
                Your files cannot be restored.
              </Text>
              <View style={styles.inputArea}>
                <View style={styles.inputField}>
                  <Text style={styles.inputLabel}>What can we do better?</Text>
                  <TextInput
                    textAlignVertical="top"
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={setFeedback}
                    value={feedback}
                  />
                </View>
              </View>
              <Text style={styles.inputLabelText}>ARE YOU SURE?</Text>
              <View style={styles.btngrp}>
              <View style={styles.deleteModalCancel}>
                  <AppButton
                    onPress={() => {
                      hideDeleteModal();
                      //setDeleteModal(!deleteModal);
                    }}
                    title="Cancel"
                    backgroundColor={COLORS.cancelButtonColor}
                  />
                </View>
                <View style={styles.deleteModalSave}>
                  <AppButton
                   onPress={() => handleSubmitPress()}
                    title="Yes"
                    backgroundColor={COLORS.saveButtonColor}
                  />
                  </View>
                {/* <TouchableOpacity
                  style={[styles.deleteModalButton, styles.deleteModalCancel]}
                  onPress={() => {
                    hideDeleteModal();
                    //setDeleteModal(!deleteModal);
                  }}>
                  <Text style={styles.deleteModalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteModalButton, styles.deleteModalSave]}
                  onPress={() => handleSubmitPress()}>
                  <Text style={styles.deleteModalButtonText}>Yes</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.lightgray,
  },
  screenOuter: {
    flex: 1,
    //marginTop: 10,
    backgroundColor: COLORS.lightgray,
    //height: verticalScale(800),
  },
  screenInner: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleHead: {
    fontSize: 25,
    marginVertical: 30,
    marginHorizontal: 10,
  },
  head: {
    fontSize: 20,
    color: COLORS.textListColorBold,
    marginHorizontal: '5%',
    marginBottom: 10,
  },
  header: {
    width: '100%',
    height: 'auto',
  },
  upperArea:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentArea: {
    width: '100%',
    borderTopWidth: 1,
    paddingVertical: 25,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    gap: 10,
  },
  contents: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  checkBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 4,
  },
  contentText: {
    fontSize: 16,
    color: 'black',
  },
  buttons: {
    flexDirection: 'column',
    paddingTop: verticalScale(250),
    borderTopWidth: 1,
    borderTopColor: 'black',
    //flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    //position:'relative',
    //bottom:0,
    //backgroundColor:'yellow'
  },
  button: {
    width: '90%',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'semibold',
    padding: 2,
  },
  buttonBox: {
    backgroundColor: COLORS.editButtonColor,
    borderRadius: 10,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  table_body: {
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table_body: {
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  list: {
    width: '100%',
    padding: 5,
  },
  flatlist: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // start delete modal style
  deleteModalView: {
    flex: 1,
    justifyContent: 'center',
    width: scale(350),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    elevation: 5,
    //position:'absolute',
    bottom: 0,
    borderTopColor: COLORS.lightgray,
    marginLeft: 'auto',
    marginRight: 'auto',
    //margin: 10,
    marginTop: verticalScale(120),
    paddingBottom: 20,
    // marginHorizontal: 20,
    //height: scale(500),
  },
  deleteModalViewSub: {
    width: '100%',
    height: '100%',
  },
  deleteModalHeading: {
    fontSize: 25,
    color: COLORS.black,
    marginTop: scale(20),
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  deleteModalSubHeading: {
    fontSize: 15,
    color: COLORS.black,
    marginTop: scale(15),
    marginHorizontal: 20,
  },
  btngrp: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  deleteModalButton: {
    paddingVertical: 10,
    width: scale(60),
    borderRadius: 12,
  },
  deleteModalButtonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: 'semibold',
  },
  deleteModalCancel: {
    marginTop: 20,
    width: '40%',
    alignItems: 'center',

  },
  deleteModalSave: {
    marginTop: 20,
    width: '40%',
    alignItems: 'center',

  },
  buttonCloseOptionContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inputArea: {
    width: scale(200),
    // gap: 10,
    marginVertical: 10,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  inputField: {
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 15,
    color: COLORS.black,
    marginTop: scale(15),
    paddingBottom: verticalScale(5),
  },
  inputLabelText: {
    fontSize: 15,
    color: COLORS.black,
    marginTop: scale(15),
    marginHorizontal: 20,
    fontWeight: '500',
    paddingBottom: verticalScale(10),
  },
  input: {
    width: scale(300),
    padding: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 2,
  },
});
