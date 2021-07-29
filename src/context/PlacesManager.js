import React from 'react';

export const initialState = {
  currentPlace: {
    description: '',
    placeId: '',
    latitude: '',
    longitude: '',
  },
  destinationPlace: {
    description: '',
    placeId: '',
  },
};

export const placeReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLACE':
      return {
        ...prevState,
        currentPlace: {
          description: action.description,
          placeId: action.placeId,
          latitude: action.latitude,
          longitude: action.longitude,
        },
      };
  }
};

export const PlaceContext = React.createContext();

export const PlaceProvider = ({children}) => {
  const [place, dispatchPlace] = React.useReducer(placeReducer, initialState);

  return (
    <PlaceContext.Provider value={{place, dispatchPlace}}>
      {children}
    </PlaceContext.Provider>
  );
};

export const usePlace = () => React.useContext(PlaceContext);
