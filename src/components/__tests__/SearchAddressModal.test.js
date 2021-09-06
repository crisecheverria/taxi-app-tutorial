import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import SearchAddressModal from '../SearchAddressModal';
import {APIPlaceAutocomplete} from '../../utils';

describe('<SearchAddressModal />', () => {
  test('should render correctly', async () => {
    const {getByPlaceholderText, getByTestId, queryByText} = render(
      <SearchAddressModal isModalVisible={true} />,
    );

    expect(getByTestId('back-button')).toBeDefined();
    expect(getByPlaceholderText('Add destination')).toBeDefined();
    expect(getByTestId('clear-button')).toBeDefined();
    expect(queryByText(/Recent/i)).toBeDefined();
  });

  test('should render a list of predictions', async () => {
    const lodash = require('lodash');
    lodash.debounce = jest.fn(fn => fn);
    jest.useFakeTimers();
    const results = {
      predictions: [
        {
          description: 'Domkyrkan',
          place_id: '123',
        },
      ],
    };
    fetch.mockResponseOnce(JSON.stringify(results));
    const promise = Promise.resolve();
    const mockSetNewAddress = jest.fn(() => promise);
    const newAddress = 'Domkyrkan';
    const mockCurrentPlace = {
      description: 'Keillers Park',
      placeId: 'abc',
      latitude: 57.7,
      longitude: 11.93,
    };

    const onResponse = jest.fn();
    const onError = jest.fn();

    const {getByPlaceholderText, queryByTestId} = render(
      <SearchAddressModal
        newAddress={newAddress}
        setNewAddress={mockSetNewAddress}
        currentPlace={mockCurrentPlace}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Add destination'), newAddress);
    expect(mockSetNewAddress).toHaveBeenCalledWith(newAddress);

    lodash.debounce(
      APIPlaceAutocomplete(newAddress, mockCurrentPlace)
        .then(onResponse)
        .catch(onError)
        .finally(() => {
          expect(onResponse).toHaveBeenCalled();
          expect(onError).not.toHaveBeenCalled();

          expect(onResponse.mock.calls[0][0][0]).toEqual(results);
        }),
      1000,
    );

    expect(queryByTestId('prediction-row-0')).toBeNull();

    await act(() => promise);
    queryByTestId('prediction-row-0');
  });
});
