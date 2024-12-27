import React from 'react';

// Import Navigators from React Navigation

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import RoadServiceScreen from '../screens/RoadServiceScreen/RoadServiceScreen';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Appointment from '../screens/Appointment/Appointment';
import BookAppointment from '../screens/Appointment/BookAppointment';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TowingServiceScreen from '../screens/TowingServiceScreen/TowingServiceScreen';
import ContactUsScreen from '../screens/ContactUsScreen/ContactUsScreen'; 
import Registration from '../screens/Registration/Registration';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import NavigationDrawerHeader from '../components/NavigationDrawerHeader';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constant/Colors';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ChangePassword from '../screens/ProfileScreen/ChangePassword';
import DefaultScreens from '../screens/DefaultScreens/DefaultScreens';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreensStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const defaultScreensStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DefaultScreens">
      <Stack.Screen
        name="DefaultScreens"
        component={DefaultScreens}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          // headerRight: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const rosdsideServiceScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="RoadServiceScreen">
      <Stack.Screen
        name="RoadServiceScreen"
        component={RoadServiceScreen}
        options={{
          title: '', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerRight: () => (
              <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const contactUsScreensStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ContactUsScreen">
      <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{
          title: '', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
        ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const joinUsScreensStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          title: '', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
        ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};
const TowingServiceScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="TowingServiceScreen">
      <Stack.Screen
        name="TowingServiceScreen"
        component={TowingServiceScreen}
        options={{
          title: '', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
        ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};   
const InsuranceScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: '', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
        ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};  
const roadsideRefundStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ChangePassword">
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: '', //Set Header Title
          headerRight: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
        ),
          headerStyle: {
            backgroundColor: COLORS.menuBackground, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}; 
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
    screenOptions={{
        color: COLORS.blue,
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: COLORS.white,
        },
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.blue,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
      name="joinUsScreensStack"
      options={{drawerLabel: 'Join Us',
   //   drawerIcon: ({focused, size}) => (
    //     <FontAwesome
    //        name="plus-square"
    //        size={size}
    //        color={focused ? '#7cc' : '#fff'}
    //     />
    //  )
    }}
      component={joinUsScreensStack}
    />
       {/* <Drawer.Screen
        name="homeScreensStack"
        options={{drawerLabel: 'Home',
      //   drawerIcon: ({focused, size}) => (
      //     <FontAwesome
      //        name="info-circle"
      //        size={size}
      //        color={focused ? '#7cc' : '#fff'}
      //     />
      //  )
      }}
        component={homeScreensStack}
      />
       <Drawer.Screen
        name="InsuranceScreenStack"
        options={{drawerLabel: 'Insurance',
      //   drawerIcon: ({focused, size}) => (
      //     <FontAwesome
      //        name="info-circle"
      //        size={size}
      //        color={focused ? '#7cc' : '#fff'}
      //     />
      //  )
      }}
        component={InsuranceScreenStack}
      />
       <Drawer.Screen
      name="TowingServiceScreenStack"
      options={{drawerLabel: 'Towing Services',
    //   drawerIcon: ({focused, size}) => (
    //     <FontAwesome
    //        name="plus-square"
    //        size={size}
    //        color={focused ? '#7cc' : '#fff'}
    //     />
    //  )
    }
    }
      component={TowingServiceScreenStack}
    />
      <Drawer.Screen
      name="rosdsideServiceScreenStack"
      options={{drawerLabel: 'Roadside Assistance Services',
    //   drawerIcon: ({focused, size}) => (
    //     <FontAwesome
    //        name="plus-square"
    //        size={size}
    //        color={focused ? '#7cc' : '#fff'}
    //     />
    //  )
    }
    }
      component={rosdsideServiceScreenStack}
    />
     
       <Drawer.Screen
        name="roadsideRefundStack"
        options={{drawerLabel: 'RoadSide Refund',
      //   drawerIcon: ({focused, size}) => (
      //     <FontAwesome
      //        name="info-circle"
      //        size={size}
      //        color={focused ? '#7cc' : '#fff'}
      //     />
      //  )
      }}
        component={roadsideRefundStack}
      /> */}
      <Drawer.Screen
        name="contactUsScreensStack"
        options={{drawerLabel: 'Contact Us',
      //   drawerIcon: ({focused, size}) => (
      //     <FontAwesome
      //        name="info-circle"
      //        size={size}
      //        color={focused ? '#7cc' : '#fff'}
      //     />
      //  )
      }}
        component={contactUsScreensStack}
      />
      
      {/* <Drawer.Screen
      name="defaultScreensStack"
      options={{drawerLabel: 'Default',
   //   drawerIcon: ({focused, size}) => (
    //     <FontAwesome
    //        name="plus-square"
    //        size={size}
    //        color={focused ? '#7cc' : '#fff'}
    //     />
    //  )
    }}
      component={defaultScreensStack}
    /> */}
    </Drawer.Navigator>
    
  );
};

export default DrawerNavigatorRoutes;