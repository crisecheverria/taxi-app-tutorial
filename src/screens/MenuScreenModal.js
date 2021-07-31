import React from 'react';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {SignInButtonText, SignInButton} from '../styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

const MENU = [
  {
    id: '1',
    title: 'Bookings',
    icon: 'map-pin',
  },
  {
    id: '2',
    title: 'Receipts',
    icon: 'file-text',
  },
  {
    id: '3',
    title: 'Profile',
    icon: 'user',
  },
  {
    id: '4',
    title: 'Cards',
    icon: 'credit-card',
  },
];

const Container = styled.View`
  flex: 1;
  padding-vertical: 100px;
  padding-left: 10px;
  background-color: #fff;
  padding-horizontal: 20px;
`;

const MenuItemContainer = styled.View`
  padding-vertical: 10px;
`;

const MenuItemView = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const MenuItemText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-left: 10px;
`;

const SignInContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = ({title, icon, navigation}) => (
  <MenuItemContainer>
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(title)}
      testID={`menuItem-${title}`}>
      <MenuItemView>
        <FeatherIcon name={icon} size={25} color="#000" />
        <MenuItemText>{title}</MenuItemText>
      </MenuItemView>
    </TouchableWithoutFeedback>
  </MenuItemContainer>
);

export default function MenuScreenModal({navigation}) {
  const renderMenuItem = ({item}) => (
    <MenuItem {...item} navigation={navigation} />
  );

  return (
    <Container>
      <FlatList
        data={MENU}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
      />
      <SignInContainer>
        <SignInButton
          onPress={() => console.log('Sign In / Sign Up Pressed')}
          testID="signInCheck-button/">
          <SignInButtonText>Sign In / Sign Up</SignInButtonText>
        </SignInButton>
      </SignInContainer>
    </Container>
  );
}
