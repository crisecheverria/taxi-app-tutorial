import {GOOGLE_MAPS_API_KEY} from './constants';

export const formatPlaceName = placeName =>
  placeName && placeName.split(',')[0];

export const APIPlaceAutocomplete = (destination, currentPlace) => {
  const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_API_KEY}&input=${destination}&location=${currentPlace.latitude},${currentPlace.longitude}&radius=2000`;

  if (destination.length > 0) {
    return fetch(URL)
      .then(resp => resp.json())
      .catch(error => error);
  } else {
    return 'No destination Address provided';
  }
};
