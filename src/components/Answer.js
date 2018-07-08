import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { blue, white } from '../utils/ui/colors';
import { Body, Title1, Title2 } from '../utils/ui/typography';

class Answer extends React.Component {
  render() {
    const { navigation } = this.props;
    const answer = navigation.getParam('answer');
    const numberOfCards = navigation.getParam('numberOfCards');
    const progress = navigation.getParam('progress');

    return (
      <View>
        <AnswerView>
          <AnswerText>{answer}</AnswerText>
        </AnswerView>

        <SubmitButton onPress={() => navigation.goBack()}>
          <ButtonText>Back to quiz</ButtonText>
        </SubmitButton>
      </View>
    );
  }
}

const AnswerView = styled(View)`
  width: 80%;
  height: 340;
  border-radius: 8px;
  margin: 100px auto 10px auto;
  padding: 25px;
  justify-content: center;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const AnswerText = styled(Title2)`
  margin: 20px auto 20px auto;
  text-align: center;
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

Answer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Answer;
