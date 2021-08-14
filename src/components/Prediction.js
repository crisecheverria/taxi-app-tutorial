import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

const Text = styled.Text`
  padding: 5px;
  font-size: 14px;
`;

export default function Prediction({description, place_id}) {
  return (
    <TouchableOpacity
      key={place_id}
      testID={`prediction-row-${place_id}`}
      onPress={() => {}}>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
}
