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
import WelcomeScreen from './Screens/WelcomeScreen';
import RegistrationScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import HomeScreen from './Screens/HomeScreen';
console.log("Initial State", store.getState());

declare const global: {HermesInternal: null | {}};
export enum SCREENS {
  WELCOME = "Welcome",
  HOME = "Home",
  LOGIN = " Login",
  REGISTRATION = "Registration"
}
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <Stack.Navigator initialRouteName={SCREENS.HOME}>
            <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
            <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
            <Stack.Screen name={SCREENS.REGISTRATION} component={RegistrationScreen} />
            <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
          </Stack.Navigator>
        </Provider>
      </ApplicationProvider>
    </NavigationContainer>
  );
};

export default App;
