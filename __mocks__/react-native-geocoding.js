export default {
  init: jest.fn(),
  from: jest.fn().mockImplementation(() => {
    const position = {
      results: [
        {
          formatted_address: 'Lindholmen',
          place_id: 'abc',
          geometry: {
            location: {lat: 57.7, lng: 11.93},
          },
        },
      ],
    };
    return Promise.resolve(position);
  }),
};
