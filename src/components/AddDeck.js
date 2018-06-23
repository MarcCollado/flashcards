import React from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title2, Title3 } from '../utils/ui/typography';
import { black, blue, grey, white } from '../utils/ui/colors';

const AddQuestion = ({ navigation }) => (
  <View>
    <AddQuestionTitle>Create a new deck</AddQuestionTitle>

    <Question>Deck Title</Question>
    <Input
      enablesReturnKeyAutomatically
      autoFocus
      maxLength={80}
      numberOfLines={4}
      placeholder="Type the deck title..."
      placeholderTextColor={grey}
    />

    <SubmitButton>
      <ButtonBody>Create Deck</ButtonBody>
    </SubmitButton>

    <Button title="Cancel" onPress={() => navigation.goBack()} />
  </View>
);

const AddQuestionTitle = styled(Title2)`
  margin: 80px 0px 20px 25px;
`;

const Question = styled(Title3)`
  margin: 20px 0px 0px 25px;
`;

const Input = styled(TextInput)`
  margin: 20px 25px;
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

AddQuestion.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddQuestion;
