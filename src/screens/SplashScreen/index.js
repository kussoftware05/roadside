
// Import React and Component
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

//import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoImage from '../../components/logo_image';
import { COLORS } from '../../constant/Colors';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //navigation.replace('HomeScreen')
      navigation.replace('DrawerNavigationRoutes')
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <LogoImage />
      <ActivityIndicator
        animating={animating}
        color= {COLORS.blue}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
