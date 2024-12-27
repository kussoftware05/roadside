import React, {useState, createRef, useEffect} from 'react';
import {StyleSheet, Alert, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DefaultScreens from '../screens/DefaultScreens/DefaultScreens';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import LoginScreens from '../screens/LoginScreens/LoginScreens';
import Registration from '../screens/Registration/Registration';
import RegistrationAadhar from '../screens/Registration/RegistrationAadhar';
import BookAppointment from '../screens/Appointment/BookAppointment';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SplashScreen from '../screens/SplashScreen/index';
import {Button, Image} from 'react-native';
import {COLORS} from '../constant/Colors';
import DrawerNavigationRoutes from '../navigations/DrawerNavigatorRoutes';
const Stack = createNativeStackNavigator();

//const Drawer = createDrawerNavigator();
const Routes = () => {

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
              AsyncStorage.removeItem('user_name');
              AsyncStorage.removeItem('user_token');
            },
          },
        ],
        {cancelable: false},
      );
  };
 
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="SplashScreen"
        screenOptions={{
          contentStyle:{
            backgroundColor:COLORS.backgroundContainer,
          },
        }}
      >
         <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Registration"
          component={Registration}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DefaultScreens"
          component={DefaultScreens}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BookAppointment"
          component={BookAppointment}
          // Hiding header for Navigation Drawer
          options={{headerShown: true, title:'Book Appointment'}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreens"
          component={LoginScreens}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
       
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => handleSignOut()}
                title="sign Out"
                color={COLORS.red}
              />
            ),
            headerTitle: (
              props, // App Logo
            ) => (
              <Image
                style={{width: 200, height: 50}}
                source={require('../assets/images/logo.jpg')}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ExclusiveNewsScreen"
          component={ExclusiveNewsScreen}
        />
        <Stack.Screen name="NewsAddScreen" component={NewsAddScreen} />
        <Stack.Screen
          name="NewsDetailsScreen"
          component={NewsDetailsScreen}
        />
        <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
      />
      <Stack.Screen
        name="AuthorDetailsScreen"
        component={AuthorDetailsScreen}
      />
        <Stack.Screen
          name="MasterDataEntryScreen"
          component={MasterDataEntryScreen}
        />
        <Stack.Screen
          name="UserManagmentScreen"
          component={UserManagmentScreen}
        />
        <Stack.Screen name="AddDivisionScreen" component={AddDivisionScreen} />
        <Stack.Screen name="AddSubTypeScreen" component={AddSubTypeScreen} />
        <Stack.Screen name="AddTypeScreen" component={AddTypeScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
