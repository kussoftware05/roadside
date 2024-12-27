import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  UIManager,
  Modal,
  Pressable,
  RefreshControl,
  ToastAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import Animated, {ColorSpace, useAnimatedStyle} from 'react-native-reanimated';
import {COLORS} from '../../constant/Colors';
import AppointmentCard from '../../components/AppointmentCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../../components/searchBar';
import AppButton from '../../components/forms/AppButton';
import Loader from '../../components/Loader/Loader';



const Appointment = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState([{"id":"1","userid":"6",
  "appoint_date":"2024-05-26 00:00:00","appoint_time":"07:30:00","appoint_confirm":"1",
  "user_name":"test","firstname":"Deepak","middlename":"","lastname":"Singh"
},{"id":"2","userid":"6",
  "appoint_date":"2024-05-26 00:00:00","appoint_time":"07:30:00","appoint_confirm":"",
  "user_name":"test","firstname":"Deepak","middlename":"","lastname":"Singh"
},{"id":"3","userid":"6",
  "appoint_date":"2024-05-26 00:00:00","appoint_time":"07:30:00","appoint_confirm":"",
  "user_name":"test","firstname":"Deepak","middlename":"","lastname":"Singh"
}]);

  const [userId, setUserId] = useState('');
  const [userKey, setUserKey] = useState('');
  const [userName, setUserName] = useState('');

  //for sorting
  const [sortAscending, setSortAscending] = React.useState(false);
  const [sortFieldName, setSortFieldName] = React.useState(null);

  //for searching
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [mode, setMode] = useState('');

  useEffect(() => {
    readUserId('user_id');
    readUserKey('user_key');
    readUserName('user_name');

  }, []);

  // useEffect(() => {
    
  //    onRefresh();
  // }, [userKey, userName, userId]);

  
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

 const onRefresh = useCallback(async() => {
  setIsRefreshing(true);
  setLoading(true);
  setData(data); 
  setIsRefreshing(false);
  setLoading(false);  

  }, [userKey, userName, userId]);

  const lodeMoreData = async() => {
    if (!loading) {
    }
  };


  const pressed = () => {
    navigation.navigate('BookAppointment', {itemId: 0});
  };
  const goToEditPage = songId => {
    navigation.navigate('SongList', {songId: songId});
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: COLORS.itemSeperator,
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  };
  const ListEmptyComponent = ({item}) => {
    return (
      // Flat List Item
      <View style={styles.loadingCircle}>
        <Text style={styles.emptyListStyle}>No Data Found</Text>
        {isRefreshing ? (
          <ActivityIndicator size="large" color="orange"></ActivityIndicator>
        ) : (
          ''
        )}
      </View>
    );
  };
  const updateQuery = input => {
    // if(input)
    // {
    //   searchSetListDataModel(userId, input).then((data)=>{
    //     setSearchActive(true);
    //         setSearchText(input);
    //         setData(data);
    // }).catch((error) => console.log(error));
    // }
    // else
    // {
    //   setSearchText('');
    //   setSearchActive(false);
    //   onRefresh();
    // }
  };

  const sortedItems = data
    .slice()
    .sort((item1, item2) =>
      sortFieldName == 'firstname'
        ? sortAscending
          ? item1.firstname.localeCompare(item2.firstname)
          : item2.firstname.localeCompare(item1.firstname)
        : sortFieldName == 'appoint_date'
        ? sortAscending
          ? item1.appoint_date.localeCompare(item2.appoint_date)
          : item2.appoint_date.localeCompare(item1.appoint_date)
        : sortFieldName == 'lastname'
        ? sortAscending
          ? item1.lastname.localeCompare(item2.lastname)
          : item2.lastname.localeCompare(item1.lastname)
        : '',
    );

  const doSort = column => {
    console.log(column)
    if (column == 'firstname') {
      setSortAscending(!sortAscending);
      setSortFieldName('firstname');
    
    } else if (column == 'appoint_date') {
      setSortAscending(!sortAscending);
      setSortFieldName('appoint_date');
    } else if (column == 'lastname') {
      setSortAscending(!sortAscending);
      setSortFieldName('lastname');
    }
  };
 
  return (
    <ScrollView style={styles.fullScreen} nestedScrollEnabled={true} 
    refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.screenOuter}>
        <Loader loading={loading}/>
        <View style={styles.screenInner}>
          <View style={styles.textView}>
            <Text style={styles.textHeading}>My Appointment</Text>
          </View>
          
          <View style={styles.searchArea}>
          <View style={{alignContent:'flex-start',width:'50%',}}>
          <SearchBar updateQuery={updateQuery} />
          </View>
          <View style={{width:'50%',paddingTop:10,alignItems:'flex-end'}}>
          <AppButton onPress={() => pressed()} title='Add New' backgroundColor={COLORS.button}/>
         
          </View>
          </View>
          <View style={styles.lowerArea}>
            <View style={styles.table_head}>
              <Text
                style={[styles.eventText, styles.heading_text]}
                onPress={() => doSort('firstname')}>
                First Name
              </Text>
              <Text
                style={[styles.groupsText, styles.heading_text]}
                onPress={() => doSort('lastname')}>
                Last Name
              </Text>
              <Text
                style={[styles.dateText, styles.heading_text]}
                onPress={() => doSort('appoint_date')}>
                Date
              </Text>
            </View>
            { searchActive ? ( 
            <AppointmentCard
            //tableData={results}
            tableData={sortedItems}
            //tableData={mergeData}
            //groupData={groupsData}
            lodeMoreData={lodeMoreData}
            renderSeparator={renderSeparator}
            refreshData={onRefresh}
            //refreshing={isRefreshing}
            ListEmptyComponent={ListEmptyComponent}
          />): 
            (<AppointmentCard
            //tableData={results}
            tableData={sortedItems}
            //tableData={mergeData}
            //groupData={groupsData}
            lodeMoreData={lodeMoreData}
            renderSeparator={renderSeparator}
            refreshData={onRefresh}
            //refreshing={isRefreshing}
            ListEmptyComponent={ListEmptyComponent}
          />)}
          
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: COLORS.white,
  },
  listStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  textView: {
    width: '100%',
    height: 'auto',
  },
  textHeading: {
    //marginHorizontal: 30,
    marginTop: 30,
    marginBottom:20,
    fontSize: 25,
    // fontWeight: 'bold',
    color: COLORS.textListColorBold,
  },
  lowerArea: {
    flex: 1,
    // alignItems: 'center',
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    color: 'white',
  },
  screenOuter: {
    flex: 1,
    //marginTop: 10,
    backgroundColor: COLORS.white,
    //height: verticalScale(800),
    // alignItems: 'center',
    //backgroundColor: '#212121',
  },
  screenInner: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    //borderWidth:1,
    //borderColor:'red'
  },
  searchArea: {
    //flex:1,
    flexDirection:'row',
    marginBottom:30,
    
  },
  listDragBox: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'lightgrey',
    marginTop: 10,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //Table design start//
  table_head: {
    width: '100%',
    paddingTop:10,
    paddingBottom:10,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.itemSeperator,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    // color: COLORS.black,
    // fontWeight: 'bold'
  },
  table_body: {
    flex: 1,
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventText: {
    width: '30%',
    color: COLORS.black,
    fontWeight: 'bold',
  },
  groupsText: {
    width: '40%',
  },
  dateText: {
    width: '30%',
  },
  // byPic: {
  //   width: '20%',
  // },
  // moreOptions: {
  //   width: '10%',
  // },
  emptyListStyle: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textListColorBold,
  },
  heading_text: {
    color: COLORS.textListColorBold,
    fontWeight: '600',
  },
  // Table design end //
  loadingCircle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
