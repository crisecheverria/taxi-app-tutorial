import React from 'react';
import {render} from '@testing-library/react-native';
import BookingInformation from '../BookingInformation';
import {PlaceContext} from '../../context/PlacesManager';

describe('<BookingInformation />', () => {
  test('should render correctly when not selected destination', () => {
    const place = {
      currentPlace: {
        description: 'Keillers Park',
        placeId: 'abc',
      },
      destinationPlace: {description: '', placeId: ''},
    };
    const dispatchPlace = jest.fn();
    const {getByTestId, getByText} = render(
      <PlaceContext.Provider value={{place, dispatchPlace}}>
        <BookingInformation />
      </PlaceContext.Provider>,
    );

    expect(getByText('Keillers Park')).toBeDefined();
    expect(getByText('Add destination')).toBeDefined();
    expect(getByTestId('destination-label')).toBeDefined();
  });
});
