import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { backgroundSync } from '../api/api';
import { white, blue, grey } from '../ui/colors';
import { Body, Title1, Title2 } from '../ui/typography';

const WelcomePage = ({ initialSetup }) => {
  const welcomeBackgroundPath = `../../../public/assets/images/welcome-bg.png`;
  const welcomeRoundIconPath = `../../../public/assets/images/icn-round.png`;

  return (
    <View>
      <WelcomeView source={require(welcomeBackgroundPath)}>
        <WelcomeIcon source={require(welcomeRoundIconPath)} />
        <WelcomeTitle>{`Welcome to\nFlashcards`}</WelcomeTitle>
      </WelcomeView>

      <WelcomeSubtitle>
        {`First thing we'll need to do is activate notifications`}
      </WelcomeSubtitle>

      <WelcomeBody>
        {`Flashcards will send you friendly reminders so you don't forget to study`}
      </WelcomeBody>

      <WelcomeButton onPress={() => initialSetup(true)}>
        <ButtonText>{`Activate notifications`}</ButtonText>
      </WelcomeButton>

      <Button
        title="Do not activate notifications"
        onPress={() => initialSetup(false)}
      />
    </View>
  );
};

const WelcomeView = styled(ImageBackground)`
  height: 50%;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
  align-items: center;
  justify-content: center;
`;

const WelcomeIcon = styled(Image)`
  width: 125px;
  height: 125px;
  margin: 10px 0px 25px;
`;

const WelcomeTitle = styled(Title1)`
  font-weight: bold;
  text-align: center;
  color: ${white};
`;

const WelcomeSubtitle = styled(Title2)`
  width: 80%;
  text-align: center;
  margin: 30px auto 10px auto;
`;

const WelcomeBody = styled(Body)`
  width: 80%;
  text-align: center;
  margin: 10px auto 15px auto;
  color: ${grey};
`;

const WelcomeButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border-radius: 10px;
  margin: 15px auto 10px auto;
  background: ${blue};
`;

const ButtonText = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${white};
`;

WelcomePage.propTypes = {
  initialSetup: PropTypes.func.isRequired,
};

export default WelcomePage;
