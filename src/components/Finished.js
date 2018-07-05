import React from 'react';
import { StatusBar, Image, Button, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { blue, white, red } from '../utils/ui/colors';
import { Body, Title1, Title2 } from '../utils/ui/typography';

class Finished extends React.Component {
  state = {};

  componenentWillUnmount() {
    console.log('finished unmounted');
  }

  onPress = () => {};

  render() {
    const { navigation } = this.props;
    const deckCoverImage = navigation.getParam('deckCoverImage');
    const deckTitle = navigation.getParam('deckTitle');
    const score = navigation.getParam('score');
    const numberOfCards = navigation.getParam('numberOfCards');
    const restartQuiz = navigation.getParam('restartQuiz');

    return (
      <View>
        <StatusBar hidden />
        <CoverImage source={{ uri: deckCoverImage }} />

        <FinishedTitle>{`Quiz completed 🎉`}</FinishedTitle>
        <FinishedSubtitle>Check out your score</FinishedSubtitle>

        <ScoreReport>
          {`You knew ${score} questions out of ${numberOfCards} in ${deckTitle}`}
        </ScoreReport>

        <SubmitButton
          onPress={() => navigation.navigate('Question', restartQuiz())}
        >
          <ButtonText>Restart quiz</ButtonText>
        </SubmitButton>

        <Button
          title="🔙 to deck details"
          onPress={() => navigation.navigate('DeckDetail')}
        />
      </View>
    );
  }
}

const CoverImage = styled(Image)`
  width: 100%;
  height: 200px;
`;

const FinishedTitle = styled(Title1)`
  margin: 20px auto 5px auto;
  text-align: center;
`;

const FinishedSubtitle = styled(Title2)`
  margin: 10px auto;
  text-align: center;
`;

const ScoreReport = styled(Body)`
  margin: 5px 0px 0px 20px;
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

Finished.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Finished;
