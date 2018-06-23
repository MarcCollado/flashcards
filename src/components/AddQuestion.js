import React from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title2, Title3 } from '../utils/ui/typography';
import { black, blue, grey, white } from '../utils/ui/colors';

const AddQuestion = ({ navigation }) => {
  const id = navigation.getParam('id');

  return (
    <View>
      <AddQuestionTitle>Add a question to the deck</AddQuestionTitle>

      <Question>Question</Question>
      <MultilineInput
        enablesReturnKeyAutomatically
        autoFocus
        maxLength={140}
        multiline
        numberOfLines={4}
        placeholder="Type your question..."
        placeholderTextColor={grey}
      />

      <Answer>Answer</Answer>
      <MultilineInput
        enablesReturnKeyAutomatically
        maxLength={140}
        multiline
        numberOfLines={4}
        placeholder="Type your answer..."
        placeholderTextColor={grey}
      />

      <SubmitButton>
        <ButtonBody>Add Question</ButtonBody>
      </SubmitButton>

      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const AddQuestionTitle = styled(Title2)`
  margin: 60px 0px 20px 25px;
`;

const Question = styled(Title3)`
  margin: 15px 0px 0px 20px;
`;

const Answer = styled(Title3)`
  margin: 15px 0px 0px 20px;
`;

const MultilineInput = styled(TextInput)`
  margin: 15px 25px;
  height: 40;
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
