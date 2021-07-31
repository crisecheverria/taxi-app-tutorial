import React from 'react';
import {render, waitFor, act} from '@testing-library/react-native';
import UserScreen from '../UserScreen';
import {check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {PlaceContext} from '../../context/PlacesManager';
import Geocoder from 'react-native-geocoding';

describe('<UserScreen />', () => {
  const place = {
    currentPlace: {
      description: 'Keillers Park',
      placeId: 'abc',
      latitude: 57.7,
      longitude: 11.93,
    },
  };
  const dispatchPlace = jest.fn();
  const navigation = {
    setOptions: jest.fn(),
  };

  test('should renders MapView and Marker with user current location', async () => {
    const {getByTestId} = render(
      <PlaceContext.Provider value={{place, dispatchPlace}}>
        <UserScreen navigation={navigation} />
      </PlaceContext.Provider>,
    );

    await waitFor(() => {
      expect(check).toHaveBeenCalledTimes(1);
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
      expect(Geocoder.from).toHaveBeenCalledWith({
        latitude: 57.7,
        longitude: 11.93,
      });
      expect(getByTestId('map')).toBeDefined();
    });
  });

  test('should have called Context Providers', async () => {
    render(
      <PlaceContext.Provider value={{place, dispatchPlace}}>
        <UserScreen navigation={navigation} />
      </PlaceContext.Provider>,
    );

    await act(() => Promise.resolve());

    expect(dispatchPlace).toHaveBeenCalledWith({
      type: 'SET_CURRENT_PLACE',
      description: 'Lindholmen',
      placeId: 'abc',
      latitude: 57.7,
      longitude: 11.93,
    });
  });
});
