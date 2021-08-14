import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BookNow, BookNowButton, ButtonText} from '../styles';
import {usePlace} from '../context/PlacesManager';
import {formatPlaceName} from '../utils';

const Container = styled.View`
  flex: ${({platform}) => (platform === 'ios' ? 1.5 : 2.5)};
  background-color: #ffffff;
  padding-vertical: 20px;
  padding-horizontal: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: #717171;
  font-size: 14px;
  margin-left: 5px;
  font-weight: 600;
`;

const TextBold = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  margin-left: 5px;
`;

export default function DepartureInformation({toggleShowBookingViews}) {
  const {
    place: {currentPlace},
  } = usePlace();

  return (
    <Container platform={Platform.OS}>
      <Row>
        <FeatherIcon name="map-pin" size={20} color="gray" />
        <Text>Departure address</Text>
      </Row>

      <Row>
        <FeatherIcon name="more-vertical" size={20} color="gray" />
        <TextBold>{formatPlaceName(currentPlace.description)}</TextBold>
      </Row>

      <BookNow>
        <BookNowButton
          onPress={toggleShowBookingViews}
          testID="book-now-button">
          <ButtonText>Book now</ButtonText>
        </BookNowButton>
      </BookNow>
    </Container>
  );
}
