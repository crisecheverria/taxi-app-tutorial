/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const App = () => {
  const handleLocationPermission = async () => {
    const permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    if (permissionCheck === RESULTS.DENIED) {
      const permissionRequest = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      permissionRequest === RESULTS.GRANTED
        ? console.warn('Location permission granted.')
        : console.warn('Location perrmission denied.');
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127,
          longitude: 11.934746,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
