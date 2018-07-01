import React from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title1, Title2 } from '../utils/ui/typography';
import { black, blue, grey, white } from '../utils/ui/colors';

const AddQuestion = ({ navigation }) => {
  const id = navigation.getParam('id');

  return (
    <View>
      <AddQuestionTitle>Add a new question</AddQuestionTitle>

      <AddQuestionSubtitle>Question</AddQuestionSubtitle>
      <MultilineInput
        enablesReturnKeyAutomatically
        autoFocus
        maxLength={140}
        multiline
        numberOfLines={3}
        placeholder="Type the question..."
        placeholderTextColor={grey}
      />

      <AddQuestionSubtitle>Answer</AddQuestionSubtitle>
      <MultilineInput
        enablesReturnKeyAutomatically
        maxLength={140}
        multiline
        numberOfLines={3}
        placeholder="Type the answer..."
        placeholderTextColor={grey}
      />

      <SubmitButton>
        <ButtonText>Add Question</ButtonText>
      </SubmitButton>

      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const AddQuestionTitle = styled(Title1)`
  margin: 60px 0px 20px 25px;
`;

const AddQuestionSubtitle = styled(Title2)`
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

const ButtonText = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${white};
`;

AddQuestion.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddQuestion;