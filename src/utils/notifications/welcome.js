import React from 'react';
import {
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white, blue, grey } from '../ui/colors';
import { Body, Title1, Title2 } from '../ui/typography';

const WelcomePage = ({ initialSetup }) => {
  const BACKGROUND = `../../../public/assets/images/welcome-bg.png`;
  const ICON = `../../../public/assets/images/icn-round.png`;

  return (
    <ScrollView>
      <WelcomeView source={require(BACKGROUND)}>
        <WelcomeIcon source={require(ICON)} />
        <WelcomeTitle>{`Welcome to\nFlashcards`}</WelcomeTitle>
      </WelcomeView>
      <Wrapper>
        <WelcomeSubtitle>
          {`First thing we'll need to do is activate notifications`}
        </WelcomeSubtitle>

        <WelcomeBody>
          {`Flashcards will send you friendly reminders so you don't forget to study`}
        </WelcomeBody>

        <WelcomeButton onPress={() => initialSetup(true)}>
          <ButtonText>Activate notifications</ButtonText>
        </WelcomeButton>

        <Button
          title="Do not activate notifications"
          onPress={() => initialSetup(false)}
        />
      </Wrapper>
    </ScrollView>
  );
};

const WelcomeView = styled(ImageBackground)`
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
  align-items: center;
  justify-content: center;
`;

const WelcomeIcon = styled(Image)`
  width: 90px;
  height: 90px;
  margin-top: 10px;
`;

const WelcomeTitle = styled(Title1)`
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: ${white};
`;

const Wrapper = styled(View)`
  align-items: center;
`;

const WelcomeSubtitle = styled(Title2)`
  width: 80%;
  text-align: center;
  margin-top: 30px;
`;

const WelcomeBody = styled(Body)`
  width: 80%;
  margin-top: 20px;
  text-align: center;
  color: ${grey};
`;

const WelcomeButton = styled(TouchableOpacity)`
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

WelcomePage.propTypes = {
  initialSetup: PropTypes.func.isRequired,
};

export default WelcomePage;
