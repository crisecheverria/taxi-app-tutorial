export default {
  getCurrentPosition: jest.fn().mockImplementation(successCallback => {
    const position = {
      coords: {
        latitude: 57.7,
        longitude: 11.93,
      },
    };
    successCallback(position);
  }),
};
