import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import QuizCard from './QuizCard';

import { Body } from '../utils/ui/typography';
import { greyLight, white, redApp, blueApp, purple } from '../utils/ui/colors';

class Quiz extends React.Component {
  state = {
    progress: 1,
    score: 0,
    complete: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ restartQuiz: this.restartQuiz });
  }

  restartQuiz = () => {
    this.setState(() => ({
      progress: 1,
      score: 0,
    }));
  };

  render() {
    const { navigation } = this.props;
    const { progress } = this.state;

    const deckTitle = navigation.getParam('deckTitle');
    const cards = navigation.getParam('cards');
    const restartQuiz = navigation.getParam('restartQuiz');

    const numberOfCards = cards.length;
    const { question, answer } = cards[progress - 1];

    return (
      <QuizView>
        <QuizMode>
          <QuizModeBody>
            {`Current deck: ${deckTitle}\n`}
            {progress === numberOfCards
              ? `Progress: last question`
              : `Progress: question ${progress} of ${numberOfCards}`}
          </QuizModeBody>
        </QuizMode>

        <QuizCardWrapper>
          <QuizCard question={question} answer={answer} />
        </QuizCardWrapper>

        <ActionButton
          onPress={() => {
            if (progress < numberOfCards) {
              this.setState((prevState) => ({
                progress: prevState.progress + 1,
                score: prevState.score,
              }));
            } else if (progress === numberOfCards) {
              this.setState(
                (prevState) => ({
                  score: prevState.score,
                  complete: true,
                }),
                () => {
                  const { score, complete } = this.state;
                  if (complete) {
                    navigation.navigate('Finished', {
                      score,
                      deckTitle,
                      numberOfCards,
                      restartQuiz,
                    });
                  }
                },
              );
            }
          }}
        >
          <ButtonBody>{`Don't know`}</ButtonBody>
        </ActionButton>
        <ActionButton
          primary
          onPress={() => {
            if (progress < numberOfCards) {
              this.setState((prevState) => ({
                progress: prevState.progress + 1,
                score: prevState.score + 1,
              }));
            } else if (progress === numberOfCards) {
              this.setState(
                (prevState) => ({
                  score: prevState.score + 1,
                  complete: true,
                }),
                () => {
                  const { score, complete } = this.state;
                  if (complete) {
                    navigation.navigate('Finished', {
                      score,
                      deckTitle,
                      numberOfCards,
                      restartQuiz,
                    });
                  }
                },
              );
            }
          }}
        >
          <ButtonBody primary>{`I know 👍`}</ButtonBody>
        </ActionButton>
      </QuizView>
    );
  }
}

const QuizView = styled(View)`
  height: 100%;
  background-color: ${greyLight};
`;

const QuizMode = styled(View)`
  height: 9%;
  background: ${purple};
  opacity: 0.5;
  justify-content: center;
`;

const QuizModeBody = styled(Body)`
  font-weight: bold;
  text-align: center;
  font-size: 14px;
  color: ${white};
`;

const QuizCardWrapper = styled(View)`
  margin: 35px auto 20px;
  align-self: center;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const ActionButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border-radius: 10px;
  margin: 10px auto 0px auto;
  background: ${(props) => (props.primary ? blueApp : redApp)};
`;

const ButtonBody = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${white};
`;

Quiz.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Quiz;