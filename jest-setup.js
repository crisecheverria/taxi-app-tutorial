import {jest} from '@jest/globals';

jest.mock('react-native-maps', () => {
  const React = require('react');
  const {View} = require('react-native');
  class MockMapView extends React.Component {
    render() {
      const {testID, children, ...props} = this.props;

      return (
        <View
          {...{
            ...props,
            testID,
          }}>
          {children}
        </View>
      );
    }
  }

  const mockMapTypes = {
    STANDARD: 0,
    SATELLITE: 1,
    HYBRID: 2,
    TERRAIN: 3,
    NONE: 4,
    MUTEDSTANDARD: 5,
  };

  return {
    __esModule: true,
    default: MockMapView,
    MAP_TYPES: mockMapTypes,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
