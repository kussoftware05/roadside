import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Switch,
  Button,
  Alert,
  Modal,
  ScrollView,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import Loader from '../../components/Loader/Loader';
//import Icons from 'react-native-vector-icons/MaterialIcons';

//import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constant/Colors';
import {scale, verticalScale, moderateScale} from '../../components/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import AppButton from '../../components/forms/AppButton';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const datet = new Date();
const year = datet.getFullYear();
const month = datet.getMonth();
const day = datet.getDate();

const BookAppointment = ({route}) => {
  const navigation = useNavigation();

  const {itemId} = route.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = React.useState(new Date());
  const [dateModal, setdateModal] = useState(false);
  const [eventName, setEventName] = useState('');
  //const [switchValue, setSwitchValue] = useState({gid: '', toggled: false});
  const [switchValue, setSwitchValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dob, setdob] = React.useState(new Date());
  const [errortext, setErrortext] = useState('');
  const [setListId, setSetListId] = useState('');
  const [addSongsModal, setAddSongsModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [toggleData, setToggleData] = useState([]);
  const [toggleGroupsData, setToggleGroupsData] = useState([]);
  const [toggleGroupIdsData, setToggleGroupIdsData] = useState([]);
  const [mergeGroups, setMergeGroups] = useState([]);
  const [toggleDataName, setToggleDataName] = useState([]);
  const [songShare, setSongShare] = useState(false);

  const [userId, setUserId] = useState('');
  const [userKey, setUserKey] = useState('');
  const [userName, setUserName] = useState('');

  const [state, setState] = useState({
    switches: {},
  });


  const goToPage = (id) => {
    navigation.navigate('SongList', {songId: id});
  }
  const handleSubmitPress = async() => {
    if (eventName == '') {
      Alert.alert('Please enter Event Name');
      return false;
    } 
    else
    {
      var resArray = [];
      if (state.switches) {     
        Object.entries(state.switches).forEach(([key, value]) => {
          if (value === true) {
            resArray.push(key);
          }
        });
      }
        var nwDt = '';
        if(selectedDate !== null)
        {
          const selDtArr = selectedDate.split("/");
          nwDt = selDtArr[2]+"-"+selDtArr[1]+"-"+selDtArr[0];
        }
        
        var eventDate = (selectedDate === null) ? moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD') : nwDt;
        if (itemId > 0) {
         setLoading(true);
         setSetListId(itemId);
         goToPage(itemId);  
         setLoading(false);
        
    }
  }
  };

  const onChange = selectedDate => {
    console.log("currentDate"+selectedDate)
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    setdateModal(false);
    setSelectedDate(moment(currentDate, 'YYYY-MM-DD').format('DD/MM/YYYY'));
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
 
  return (
    // <NativeBaseProvider>
    <ScrollView contentContainerStyle={styles.outerBox}>
      <View style={styles.screenOuter}>
      <View style={styles.screenInner}>
      <Loader loading={loading} />
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Book New Appointment</Text>
      </View> */}
      <View style={styles.dateInputView}>
        <Text style={styles.inputText}>Date</Text>
        <View style={styles.inputBoxcalender}>
          <TextInput style={styles.smallInput}>
            <Text style={styles.inputshowDatecalender}>
              {selectedDate && itemId > 0
                ? selectedDate
                : selectedDate
                ? selectedDate
                : new Date().toLocaleDateString()}
            </Text>
          </TextInput>
          <View style={styles.calenderArea}>
          <TouchableOpacity
            style={styles.showcalender}
            onPress={() => setdateModal(true)}>
            {/* <Icon name="calendar" color="#1D3B5E" size={25} /> */}
          </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.saveButton}> 
      <AppButton onPress={() => handleSubmitPress()} title='Save' backgroundColor={COLORS.button}/>
      </View>
      
        </View>
        </View>
    </ScrollView>
    // </NativeBaseProvider>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  outerBox:{
    flex:1,
  },
  screenOuter: {
    flex: 1,
    //marginTop: 10,
    backgroundColor: COLORS.white,
    //height: verticalScale(800),
  },
  screenInner: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //marginLeft: 20,
  },
  headerText: {
    //textAlign: 'center',
    fontSize: 20,
    color: COLORS.textListColorBold,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginTop: 25,
  },
  dateInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
    //marginLeft: 20,
  },
  addSongsButton: {
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#FE6518',
    height: 45,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 35,
  },
  addSongButtonText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 20,
  },
  saveButton: {
    margin: 20,
    alignItems: 'center'
  },
  textInput: {
    width: '70%',
    padding: 7,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    color: COLORS.textListColorBold,
    paddingVertical: 4
  },
  inputText: {
    color: COLORS.textListColorBold,
    fontSize: 18,
    width: '30%',
  },
  inputTextName: {
    color: 'black',
    fontSize: 18,
    padding: 2,
  },
  smallInput: {
    // height: 45,
    // margin: 12,
    // borderWidth: 1.5,
    // padding: 10,
    // width: '90%',
    // borderRadius: 10,
    // backgroundColor: 'lightgray',

    width: '80%',
    padding: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    color: COLORS.black,
    //paddingVertical: 3
  },
  groupArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginHorizontal: 20,
    marginTop: 18,
  },
  // switching: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  textSwitch: {
    flexDirection: 'row',
    width: '100%',
    marginTop:10,
  },
  textSwitchName:{
    width: '70%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSwitchText: {
    color: COLORS.textListColorBold,
    fontSize: 16,
    width: '100%',
  },
  switchesButtons: {
    flexDirection: 'column',
    width: '70%',
  },
  inputBoxcalender: {
    backgroundColor: 'transparent',
    margin: 5,
    flexDirection: 'row',
    width: '70%',
    //height: verticalScale(30)
  },
  inputshowDatecalender: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 20,
  },
  showcalender: {
    //paddingHorizontal: 2,
    //marginTop: 18,
    padding: 5,
    width: '100%'
  },
  calenderArea: {
    width: '20%',
    margin:0,
    padding:0,
    // paddingRight: 3,
    // height:65,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //add songs modal view
  addSongsModalSub: {
    width: '100%',
    height: '100%',
  },
  // input: {
  //   width: '70%',
  //   padding: 10,
  //   backgroundColor: COLORS.white,
  //   borderWidth: 1,
  //   borderColor: COLORS.lightgray,
  //   borderRadius: 10,
  // },
  checkboxContainer: {
     alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '30%',//scale(50), //scale(180),
  },
  addSongsModalHeading: {
    fontSize: 25,
    color: COLORS.black,
    marginTop: 30,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  btngrp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addSongsModalButton: {
    paddingVertical: 10,
    width: '25%',
    borderRadius: 10,
  },
  addSongsModalButtonText: {
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: 'semibold',
  },
  addSongsModalCancel: {
    backgroundColor: COLORS.red,
  },
  addSongsModalSave: {
    backgroundColor: COLORS.green,
  },
  addSongsModalView: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    elevation: 5,
    //position:'absolute',
    bottom: 0,
    borderTopColor: COLORS.lightgray,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: scale(80),
    paddingBottom: 20,
    borderRadius: 10,
  },
  addSongsModalClose: {
    borderRadius: 10,
    padding: 5,
    position: 'relative',
  },
  addSongsModalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  songListings: {
    width: '90%',
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 5,
  },
  shareModalClose: {
    borderRadius: 10,
    padding: 5,
    position: 'relative',
  },
  addSongsModalcheckBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 4,
    justifyContent: 'flex-end',
  },
  addSongsModalButtons: {
    marginTop: 20,
  },
  addSongsModalContentText: {
    fontSize: 18,
    color: 'black',
    marginRight: 5,
    fontWeight: 'bold',
  },
  buttonCloseOptionContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  // end view modal
});
