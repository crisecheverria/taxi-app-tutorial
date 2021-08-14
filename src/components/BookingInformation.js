import React from 'react';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {formatPlaceName} from '../utils';
import {usePlace} from '../context/PlacesManager';
import {useShowState} from '../hooks';

const Container = styled.View`
  flex: 1.5;
  background-color: #fff;
  padding-vertical: 20px;
  padding-horizontal: 20px;
`;

export const Location = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LocationPlaceholder = styled.Text`
  color: #717171;
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
`;

const Text = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
`;

const LocationPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const AddDestinationText = styled.Text`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5px;
`;

const TextRight = styled(Text)`
  margin-left: auto;
`;

export default function BookingInformation() {
  const {
    place: {currentPlace, destinationPlace},
  } = usePlace();
  const [isModalVisible, togglePlaceModal] = useShowState();

  return (
    <Container>
      <Location>
        <FeatherIcon name="map-pin" size={15} color="gray" />
        <Text testID="current-place-description">
          {formatPlaceName(currentPlace.description)}
        </Text>
      </Location>

      <FeatherIcon
        name="more-vertical"
        size={15}
        color="gray"
        marginTop={-10}
      />

      <Location>
        <FeatherIcon name="more-vertical" size={15} color="gray" />
        <LocationPlaceholder testID="destination-label">
          Destination address
        </LocationPlaceholder>
      </Location>

      <LocationPressable onPress={togglePlaceModal}>
        <FeatherIcon name="circle" size={15} color="gray" />
        <AddDestinationText testID="destination-place-description">
          {formatPlaceName(destinationPlace.description) || 'Add destination'}
        </AddDestinationText>
        <TextRight>
          <FeatherIcon name="search" size={15} color="#000" />
        </TextRight>
      </LocationPressable>
    </Container>
  );
}
