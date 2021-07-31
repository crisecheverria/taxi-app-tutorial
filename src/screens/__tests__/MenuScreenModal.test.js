import React from 'react';
import {render} from '@testing-library/react-native';
import MenuScreenModal from '../MenuScreenModal';

describe('<MenuScreenModal />', () => {
  const navigation = {
    setOptions: jest.fn(),
    navigate: jest.fn(),
  };
  test('should render list of menu and Sign In/Sign Up button', () => {
    const {getByTestId} = render(<MenuScreenModal navigation={navigation} />);

    expect(getByTestId(/menuItem-Bookings/)).toBeDefined();
    expect(getByTestId(/menuItem-Receipts/)).toBeDefined();
    expect(getByTestId(/menuItem-Profile/)).toBeDefined();
    expect(getByTestId(/menuItem-Cards/)).toBeDefined();
    expect(getByTestId(/signInCheck-button/)).toBeDefined();
  });
});
