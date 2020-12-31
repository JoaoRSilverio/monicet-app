/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { ApplicationProvider,Layout, Text } from '@ui-kitten/components';
import React from 'react';
import * as eva from "@eva-design/eva";




declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
  
    </ApplicationProvider>
  );
};

export default App;
