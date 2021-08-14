import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar, TextInput, FlatList} from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {debounce} from 'lodash';
import {APIPlaceAutocomplete} from '../utils';
import Prediction from './Prediction';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ModalChildrenView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ClearDestinationButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const Input = styled(TextInput)`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  width: 90%;
  padding: 10px;
`;

const Predictions = styled.View`
  margin-bottom: 20px;
`;

export default function SearchAddressModal({
  isModalVisible,
  toggleModal,
  newAddress,
  setNewAddress,
  currentPlace,
}) {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (newAddress) {
      debounceSearch(newAddress);
    } else {
      setPredictions([]);
    }
  }, [newAddress, debounceSearch]);

  const debounceSearch = useCallback(
    debounce(address => {
      APIPlaceAutocomplete(address, currentPlace)
        .then(results => {
          setPredictions(results.predictions);
        })
        .catch(e => console.warn(e));
    }, 1000),
    [],
  );

  const renderPredictions = ({item}) => <Prediction {...item} />;

  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor="white"
      backdropOpacity={1}
      animationIn="slideInUp"
      testID="search-address-modal">
      <StatusBar barStyle="dark-content" />
      <Container>
        <BackButton testID="back-button" onPress={toggleModal}>
          <FeatherIcon name="arrow-left" size={20} color="gray" />
        </BackButton>

        <ModalChildrenView>
          <SearchContainer>
            <FeatherIcon name="map-pin" size={20} color="gray" />
            <Input
              placeholder="Add destination"
              placeholderTextColor="#000000"
              value={newAddress}
              onChangeText={text => setNewAddress(text)}
            />
            <ClearDestinationButton
              testID="clear-button"
              onPress={() => setNewAddress('')}>
              <FeatherIcon name="x-circle" color="grey" size={20} />
            </ClearDestinationButton>
          </SearchContainer>
        </ModalChildrenView>
        <Predictions>
          {predictions.length > 0 && (
            <FlatList
              data={predictions}
              renderItem={renderPredictions}
              keyExtractor={item => item.place_id}
            />
          )}
        </Predictions>
      </Container>
    </Modal>
  );
}
