import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef, ReactNode} from 'react';
import TextForm from '../../components/forms/TextForm';
import Loader from '../../components/Loader/Loader';
import {COLORS} from '../../constant/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {scale, verticalScale} from '../../PixelRatio';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';


const DefaultScreens = ({props, route}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [newsFile,setNewsFile] = useState('');
  const [address, setAddress] = useState('');

  const [errortext, setErrortext] = useState('');
  const phoneInput = useRef();
  const nameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const messageInput = useRef();
  const addressInput = useRef();

  const [loading, setLoading] = useState(false);
  const selectNewsFile =  () => {
      ImagePicker.openPicker({
        mediaType: 'image',
        includeBase64: true,
        compressImageQuality: 0.5,
      }).then(image => {
      
          let newsFile1 = "data:"+image.mime+";base64,"+image.data;
          setNewsFile(newsFile1);
      });
  };
  return (
    <View style={styles.wholePage}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="always">
        <View style={styles.innerContainer}>
          <View style={styles.patientCard}>
            <View style={styles.dataInd}>
              <Text style={styles.labelSubTitle}>About</Text>
            </View>
            <View style={styles.dataInd}>
              <Text style={styles.labelText}>
                24 Hour Roadside Assistance Service in Las Vegas: Finding
                yourself stuck on the side of the Las Vegas road with an
                unresponsive vehicle is a stressful time, you’re running behind,
                you have places to be but there is nothing you can do about your
                situation without assistance in Las Vegas. This is where the
                benefit and importance of the roadside assistance that Las Vegas
                Towing & Roadside Assistance provides to the city demonstrates
                its value. We bring you the rapid response you’re looking for
                that can tackle your issues head on, providing you with quick
                and reliable results that will allow you to get back on your
                way. From a tire change to tow truck from mobile mechanic to car
                lockout, we bring you the dependable experts necessary to get
                back on the road of life and on with your day
              </Text>
            </View>
          </View>
          <View style={styles.middleArea}>
            <TextForm
              placeholder="Full Name"
              type="text"
              isRequired={true}
              ref={nameInput}
              onChangeText={setName}
            />
            <TextForm
              placeholder="Email"
              type="email"
              isRequired={true}
              ref={emailInput}
              onChangeText={setEmail}
              maxLength="2"
            />
            <TextForm
              placeholder="Phone Number"
              type="number"
              isRequired={true}
              ref={phoneInput}
              onChangeText={setPhone}
              className="inputViewTextIcon"
              maxLength="10"
            />
            <TextForm
              placeholder="Address"
              type="text"
              isRequired={true}
              ref={addressInput}
              onChangeText={setAddress}
            />
            <TextForm
              placeholder="Message"
              type="text"
              isRequired={true}
              ref={messageInput}
              onChangeText={setMessage}
            />
            <View style={styles.camragrp}>
              <TouchableOpacity
                onPress={() => selectNewsFile()}
                style={styles.capturebtn}>
                <FontAwesome
                  name="folder"
                  size={24}
                  color= "blue"
                  style={styles.plusIcon}
                />
                <Text style={styles.browseText}>Browse...</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btngrp}>
              <TouchableOpacity
                onPress={() => handleSubmitPress()}
                style={styles.postBtn}>
                <Text style={styles.loginTextPic}>Post</Text>
              </TouchableOpacity>
            </View>

            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default DefaultScreens;

const styles = StyleSheet.create({
  wholePage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderColor: 'yellow',
    borderWidth: 2,
  },
  patientCard: {
    marginTop: 15,
    width: scale(310),
    height: verticalScale(500),
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.borderColor,
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    width:'95%',
    margin: 0,
    borderColor: 'red',
    borderWidth: 2,
  },
  middleArea: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
   
  },
  postBtn: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: COLORS.button, 
    color: '#fff',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  plusIcon: {
    padding:0,
    paddingRight:10,
  },
  browseText: {
    color: COLORS.button, 
    fontSize:20,
  },
  loginTextPic: {
    color: COLORS.white, 
    fontSize: 22,
  },
  labelText: {
    fontSize: 20,
    color: COLORS.button,
    alignContent: 'space-around',
    fontWeight: '400',
  },
  labelTitle: {
    fontSize: 26,
    color: COLORS.button,
    fontWeight: 'bold',
  },
  labelSubTitle: {
    fontSize: 22,
    color: COLORS.button,
    fontWeight: 'bold',
  },
  dataInd: {
    marginTop: 0,
  },
});
