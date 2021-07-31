/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, Platform, Image} from 'react-native';
import styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {customStyleMap, MenuButtonLeft} from '../styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DepartureInformation from '../components/DepartureInformation';
import Geocoder from 'react-native-geocoding';
import {usePlace} from '../context/PlacesManager';
import {GOOGLE_MAPS_API_KEY} from '../utils/constants';
import marker from '../assets/icons-marker.png';

Geocoder.init(GOOGLE_MAPS_API_KEY, {language: 'en'});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const mapContainer = {
  flex: 7,
};

const FixedMarker = styled.View`
  left: 50%;
  margin-left: -16px;
  margin-top: -125px;
  position: absolute;
  top: 50%;
`;

const markerStyle = {
  height: 36,
  width: 36,
};

const UserScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const {place, dispatchPlace} = usePlace();

  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (permissionCheck === RESULTS.DENIED) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('Location perrmission denied.');
      }
    }
  };

  useEffect(() => {
    handleLocationPermission();
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        Geocoder.from({
          latitude: latitude,
          longitude: longitude,
        }).then(res => {
          const {
            formatted_address,
            place_id,
            geometry: {
              location: {lat, lng},
            },
          } = res.results[0];
          setLocation({latitude, longitude});
          dispatchPlace({
            type: 'SET_CURRENT_PLACE',
            description: formatted_address,
            placeId: place_id,
            latitude: lat,
            longitude: lng,
          });
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatchPlace]);

  const onRegionChange = ({latitude, longitude}) => {
    Geocoder.from({
      latitude,
      longitude,
    }).then(res => {
      const {
        formatted_address,
        place_id,
        geometry: {
          location: {lat, lng},
        },
      } = res.results[0];

      dispatchPlace({
        type: 'SET_CURRENT_PLACE',
        description: formatted_address,
        placeId: place_id,
        latitude: lat,
        longitude: lng,
      });
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuButtonLeft
          onPress={() => navigation.navigate('Menu')}
          testID="modal-menu">
          <FeatherIcon name="menu" size={25} color="#000" />
        </MenuButtonLeft>
      ),
    });
  }, [navigation]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      {location && (
        <MapView
          testID="map"
          style={mapContainer}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={onRegionChange}
          showsUserLocation={true}
          customMapStyle={customStyleMap}
          paddingAdjustmentBehavior="automatic"
          showsMyLocationButton={true}
          showsBuildings={true}
          maxZoomLevel={17.5}
          loadingEnabled={true}
          loadingIndicatorColor="#fcb103"
          loadingBackgroundColor="#242f3e"
        />
      )}

      <FixedMarker testID="fixed-marker">
        <Image style={markerStyle} source={marker} />
      </FixedMarker>

      <DepartureInformation />
    </Container>
  );
};

export default UserScreen;
