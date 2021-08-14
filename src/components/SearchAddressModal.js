import React from 'react';
import {StatusBar, TextInput} from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

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

export default function SearchAddressModal({
  isModalVisible,
  toggleModal,
  newAddress,
  setNewAddress,
}) {
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
      </Container>
    </Modal>
  );
}
