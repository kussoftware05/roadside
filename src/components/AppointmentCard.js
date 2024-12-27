import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  Image,
  StatusBar,
} from 'react-native';
//import Icons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constant/Colors';
import Loader from '../components/Loader/Loader';
import {scale, verticalScale, moderateScale} from '../components/scale';
import {useNavigation} from '@react-navigation/native';
// import Popup from '../components/Modal';
import moment from 'moment';

export default function AppointmentCard({
  tableData,
  //groupData,
  lodeMoreData,
  renderSeparator,
  refreshData,
  ListEmptyComponent,
}) {
  const navigation = useNavigation();
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'forward';

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const Item = ({id, firstname, lastname, appoint_date, refreshData}) => {
    setIsRefreshing(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeItem, setActiveItem] = React.useState(null);

    let singleData = [];

    const goToEditPage = songId => {
      navigation.navigate('BookAppointment', {songId: songId});
      //navigation.navigate('SongList', {songId: songId, event: event, group_name:groupNames, date:date});
    };
    const onPress = item => {
      setActiveItem(item);
      setModalVisible(true);
    };
    setIsRefreshing(false);
    return (
      <View style={styles.table_body}>
        {/* <Text style={styles.eventText}>{event}</Text> */}
        <Text style={styles.eventText}>{firstname}</Text>
        {/* <Text style={styles.groupsText}>{groups}</Text> */}
        <Text style={styles.groupsText}>{lastname}</Text>
        <Text style={styles.dateText}>
          {moment(appoint_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
          {/* {moment(date).format('L')} */}
        </Text>
        <View style={styles.moreArea}>
        <TouchableOpacity style={styles.iconColor}>      
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={tableData}
      renderItem={({item}) => (
        <Item
          id={item.id}
          firstname={item.firstname}
          lastname={item.lastname}
          appoint_date={item.appoint_date}
          refreshData={refreshData}
        />
      )}
      //maxToRenderPerBatch={1000}
      onEndReached={lodeMoreData}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={ListEmptyComponent}
      refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          enabled={true}
          onRefresh={refreshData}
        />
      }
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  heading: {
    fontSize: 24,
    marginLeft: '6%',
    marginVertical: 20,
    color: COLORS.black,
    fontWeight: 'semibold',
  },
  middleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  lowerArea: {
    // alignItems: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '50%',
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    borderColor: COLORS.BadlandsOrange,
  },
  songList: {
    padding: 2,
    width: '40%',
    backgroundColor: COLORS.blue,
    borderRadius: 5,
  },
  songListText: {
    color: COLORS.white,
    textAlign: 'center',
  },
  container: {
    padding: 15,
  },
  tableHeader: {
    color: COLORS.black,
    //width: '80%'
  },
  imageArea: {
    width: '20%',
  },
  userImage: {
    width: scale(40),
    height: verticalScale(40),
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    borderStyle: 'dashed',
    borderWidth: 2,
    marginRight: 'auto',
    marginLeft: 'auto',
    //height: 130,
    height: verticalScale(120),
    borderColor: COLORS.BadlandsOrange,
  },
  buttonText1: {
    color: COLORS.black,
    fontSize: 22,
    fontWeight: '450',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonText2: {
    color: COLORS.black,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  tableContainer: {
    marginVertical: 20,
    width: '100%',
  },
  // table_head: {
  //   width: '90%',
  //   padding: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderBottomWidth: 2,
  //   borderBottomColor: COLORS.itemSeperator,
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   // color: COLORS.black,
  //   // fontWeight: 'bold'
  // },
  table_body: {
    flex: 1,
    flexGrow: 0,
    minHeight: '5%',
    width: '100%',
    padding:0,
    margin:0,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventText: {
    width: '30%',
    color: COLORS.textListColorBold,
    fontWeight: '600',
  },
  groupsText: {
    width: '30%',
    color:COLORS.textListColor
  },
  dateText: {
    width: '30%',
    color:COLORS.textListColor
  },
  // byPic: {
  //   width: '20%',
  // },
  // moreOptions: {
  //   width: '10%',
  // },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  heading_text: {
    color: COLORS.black,
    fontWeight: '500',
  },
  flatStyle: {
    flex: 1,
  },
  toolTipText:{
    color:COLORS.textListColorBold,
    fontWeight: 'bold'
  },
  moreArea: {
    width: '10%',
    margin:0,
    padding:0,
    paddingRight: 3,
    height:65,
  },
});
