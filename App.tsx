/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";


import store from "./Store/store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from './Screens/WelcomeScreen';
import RegistrationScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import HomeScreen from './Screens/HomeScreen';
import SightingScreen from './Screens/CreateSightingScreen';
import { ProfileScreen } from './Screens/ProfileScreen';
import PreviousSortiesScreen from './Screens/PreviousSortiesScreen';
import PreviousSortiesMapScreen from './Screens/PreviousSortieMapScreen';
import PreviousSortiesDetailScreen from './Screens/PreviousSortiesDetailScreen';
console.log("Initial State", store.getState());

declare const global: {HermesInternal: null | {}};
export enum SCREENS {
  WELCOME = "Welcome",
  HOME = "Home",
  PROFILE = "Profile",
  NAV_MAIN_MENU_TABS = "Main",
  NAV_SORTIE_STACK = "NavSortie",
  NAV_PREVIOUS_SORTIES_STACK = "PrevStackSortie",
  PREVIOUS_SORTIE_HOME = "prevSortieHome",
  PREVIOUS_SORTIE_DETAIL = "prevSortieDetail",
  PREVIOUS_SORTIE_MAP = "prevSortieMap",
  LOGIN = " Login",
  REGISTRATION = "Registration",
  SIGHTING_CREATE = "CreateSighting",

}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={SCREENS.WELCOME}>
            <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
            <Stack.Screen
              options={{
                // headerTitle: props => null,
                header: props => null
              }}
              name={SCREENS.NAV_MAIN_MENU_TABS} component={HomeTabs} />
            <Stack.Screen name={SCREENS.REGISTRATION} component={RegistrationScreen} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          </Stack.Navigator>
        </Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={SCREENS.NAV_SORTIE_STACK} component={SortieStack} />
      <Tab.Screen name={SCREENS.NAV_PREVIOUS_SORTIES_STACK} component={PreviousSorties} />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function SortieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          // headerTitle: props => null,
          header: props => null
        }}
        name={SCREENS.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREENS.SIGHTING_CREATE} component={SightingScreen} />
    </Stack.Navigator>
  )
}

function PreviousSorties() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          // headerTitle: props => null,
          header: props => null
        }}
        name={SCREENS.PREVIOUS_SORTIE_HOME} component={PreviousSortiesScreen} />
      <Stack.Screen name={SCREENS.PREVIOUS_SORTIE_DETAIL} component={PreviousSortiesDetailScreen} />
      <Stack.Screen name={SCREENS.PREVIOUS_SORTIE_MAP} component={PreviousSortiesMapScreen} />

    </Stack.Navigator>
  )
}

export default App;
