import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { BackHandler, Alert, Linking, Platform } from "react-native";
import DefaultScreens from './src/screens/DefaultScreens/DefaultScreens';
import SplashScreen from './src/screens/SplashScreen/index'
import Routes from './src/navigations/Routes';

const App = (navigation) => {

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want exit RAW News USA?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  
  return (
   <Routes />
  );
};

export default App;