import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import UserScreen from '../UserScreen';
import {check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

describe('<UserScreen />', () => {
  test('should renders MapView and Marker with user current location', async () => {
    const {getByTestId} = render(<UserScreen />);

    await waitFor(() => {
      expect(check).toHaveBeenCalledTimes(1);
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
      expect(getByTestId('map')).toBeDefined();
    });
  });
});
