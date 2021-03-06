import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setDailyNotification } from '../utils/notifications/local';
import { grey, blue, white } from '../utils/ui/colors';
import { Body, Title1, Title2 } from '../utils/ui/typography';

class Finished extends React.Component {
  componentWillUnmount() {
    setDailyNotification();
  }

  render() {
    const { navigation } = this.props;
    const deckTitle = navigation.getParam('deckTitle');
    const score = navigation.getParam('score');
    const numberOfCards = navigation.getParam('numberOfCards');
    const restartQuiz = navigation.getParam('restartQuiz');

    const finishedBackgroundPath = '../../public/assets/images/welcome-bg.png';
    const finishedIconPath = '../../public/assets/images/icn-finished.png';

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <FinishedView source={require(finishedBackgroundPath)}>
            <FinishedIcon source={require(finishedIconPath)} />
            <FinishedTitle>Quiz completed</FinishedTitle>
          </FinishedView>
          <Wrapper>
            <FinishedSubtitle>
              {`You correctly guessed\n${score} out of ${numberOfCards} questions \nin ${deckTitle}`}
            </FinishedSubtitle>

            <FinishedBody>
              {`From here you can either restart the quiz or go back to the deck details`}
            </FinishedBody>

            <SubmitButton
              onPress={() => navigation.navigate('Quiz', restartQuiz())}
            >
              <ButtonText>Restart quiz</ButtonText>
            </SubmitButton>

            <Button
              title="Back to deck details"
              onPress={() => navigation.navigate('DeckDetail')}
            />
          </Wrapper>
        </View>
      </SafeAreaView>
    );
  }
}

const FinishedView = styled(ImageBackground)`
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
  align-items: center;
  justify-content: center;
`;

const FinishedIcon = styled(Image)`
  width: 90px;
  height: 90px;
  margin-top: 10px;
`;

const FinishedTitle = styled(Title1)`
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  color: ${white};
`;

const Wrapper = styled(View)`
  align-items: center;
`;

const FinishedSubtitle = styled(Title2)`
  width: 80%;
  text-align: center;
  margin-top: 30px;
`;

const FinishedBody = styled(Body)`
  width: 80%;
  margin-top: 20px;
  text-align: center;
  color: ${grey};
`;

const SubmitButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border-radius: 10px;
  margin: 20px auto 5px auto;
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
