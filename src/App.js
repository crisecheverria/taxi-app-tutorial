/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from './screens/UserScreen';
import {PlaceProvider} from './context/PlacesManager';
import MenuScreenModal from './screens/MenuScreenModal';
import {MenuButtonLeft} from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PlaceProvider>
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={() => ({
              headerTitle: 'Taxi App',
            })}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreenModal}
            options={({navigation}) => ({
              headerLeft: () => (
                <MenuButtonLeft
                  onPress={() => navigation.goBack()}
                  testID="back-menu">
                  <FeatherIcon
                    name="x"
                    size={25}
                    color="#000"
                    testID="close-menu"
                  />
                </MenuButtonLeft>
              ),
              headerTitle: '',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlaceProvider>
  );
};

export default App;
