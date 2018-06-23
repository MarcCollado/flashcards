import React from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title2, Title3 } from '../utils/ui/typography';
import { black, blue, grey, white } from '../utils/ui/colors';

const AddDeck = ({ navigation }) => (
  <View>
    <AddDeckTitle>Create a new deck</AddDeckTitle>

    <Deck>Deck Title</Deck>
    <Input
      enablesReturnKeyAutomatically
      autoFocus
      maxLength={80}
      placeholder="Type the deck title..."
      placeholderTextColor={grey}
    />

    <SubmitButton>
      <ButtonBody>Create Deck</ButtonBody>
    </SubmitButton>

    <Button title="Cancel" onPress={() => navigation.goBack()} />
  </View>
);

const AddDeckTitle = styled(Title2)`
  margin: 80px 0px 20px 25px;
`;

const Deck = styled(Title3)`
  margin: 20px 0px 0px 25px;
`;

const Input = styled(TextInput)`
  margin: 20px 25px;
  height: 40px;
  border-bottom-color: ${black};
  border-bottom-width: 1px;
`;

const SubmitButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border-radius: 10px;
  margin: 20px auto 10px auto;
  background: ${blue};
`;

const ButtonBody = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${white};
`;

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeck;
