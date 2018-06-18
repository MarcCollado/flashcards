import React from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title2, Title3, } from '../utils/ui/typography';
import { black, blue, grey, white, } from '../utils/ui/colors';

const AddQuestion = ({ navigation }) => {

  const id = navigation.getParam('id');

  return (
    <View>
      <AddQuestionTitle>
        Add a question to the deck
      </AddQuestionTitle>

      <Question>
        Question
      </Question>
      <MultilineInput
        enablesReturnKeyAutomatically={true}
        autoFocus= {true}
        maxLength = {140}
        multiline = {true}
        numberOfLines = {4}
        placeholder={`Type your question...`}
        placeholderTextColor={grey}
      >
      </MultilineInput>

      <Answer>
        Answer
      </Answer>
      <MultilineInput
        enablesReturnKeyAutomatically={true}
        maxLength = {140}
        multiline = {true}
        numberOfLines = {4}
        placeholder={`Type your answer...`}
        placeholderTextColor={grey}
      >
      </MultilineInput>

      <SubmitButton>
        <ButtonBody>Add Question</ButtonBody>
      </SubmitButton>

      <Button
        title='Cancel'
      />

    </View>
  );
}

const AddQuestionTitle = styled(Title2)`
  margin: 80px 0px 20px 25px;
`;

const Question = styled(Title3)`
  margin: 20px 0px 0px 25px;
`;

const Answer = styled(Title3)`
  margin: 20px 0px 0px 25px;
`;

const MultilineInput = styled(TextInput)`
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

export default AddQuestion;
