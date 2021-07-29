import React from 'react';
import {render} from '@testing-library/react-native';
import DepartureInformation from '../DepartureInformation';
import {PlaceContext} from '../../context/PlacesManager';

describe('DepartureInformation', () => {
  test('render component correctly', () => {
    const place = {
      currentPlace: {
        description: 'Keillers Park',
        placeId: 'abc',
      },
    };
    const dispatchPlace = jest.fn();
    const {getByTestId, getByText} = render(
      <PlaceContext.Provider value={{place, dispatchPlace}}>
        <DepartureInformation />
      </PlaceContext.Provider>,
    );

    expect(getByText('Departure address')).toBeDefined();
    expect(getByText('Keillers Park')).toBeDefined();
    expect(getByTestId('book-now-button')).toBeDefined();
  });
});
