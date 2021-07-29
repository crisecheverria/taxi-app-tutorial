/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import UserScreen from './screens/UserScreen';
import {PlaceProvider} from './context/PlacesManager';

const App = () => {
  return (
    <PlaceProvider>
      <UserScreen />
    </PlaceProvider>
  );
};

export default App;
