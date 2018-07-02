import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title1, Title2 } from '../utils/ui/typography';
import { green, red, white } from '../utils/ui/colors';

class Question extends React.Component {
  state = {
    progress: 1,
  };

  render() {
    const { navigation } = this.props;
    const { progress } = this.state;
    const id = navigation.getParam('id');
    const deckCoverImage = navigation.getParam('deckCoverImage');
    const deckTitle = navigation.getParam('deckTitle');
    const card = navigation.getParam('card');

    const numberOfCards = card.length;
    const { question, answer } = card[progress - 1];

    return (
      <QuizView>
        <Progress>{`Question ${progress} of ${numberOfCards}`}</Progress>

        <QuestionView>
          <QuestionText>{question}</QuestionText>
        </QuestionView>

        <Button
          title="View Answer"
          onPress={() =>
            navigation.navigate('Answer', { answer, progress, numberOfCards })
          }
        />

        <DetailButton onPress={() => {}}>
          <ButtonBody>Not sure</ButtonBody>
        </DetailButton>
        <DetailButton primary>
          <ButtonBody
            primary
            onPress={() => {
              this.setState((prevState) => {
                if (progress < numberOfCards) {
                  return { progress: prevState.progress + 1 };
                }
              });
            }}
          >
            I know it
          </ButtonBody>
        </DetailButton>
      </QuizView>
    );
  }
}

const QuizView = styled(View)`
  height: 100%;
  background-color: ${white};
`;

const Progress = styled(Title1)`
  margin: 30px auto 10px auto;
  text-align: center;
`;

const QuestionView = styled(View)`
  width: 80%;
  height: 340;
  border-radius: 8px;
  margin: 30px auto 10px auto;
  padding: 25px;
  justify-content: center;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const QuestionText = styled(Title2)`
  margin: 20px auto 20px auto;
  text-align: center;
`;

const DetailButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border: ${(props) => (props.primary ? '0px' : `1px solid ${red}`)};
  border-radius: 10px;
  margin: 10px auto 0px auto;
  background: ${(props) => (props.primary ? green : white)};
`;

const ButtonBody = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${(props) => (props.primary ? white : red)};
`;

Question.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Question;
