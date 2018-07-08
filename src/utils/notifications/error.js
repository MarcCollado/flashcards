import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { Body, Title1, Title2 } from '../ui/typography';
import { redError, white } from '../ui/colors';
import { backgroundSync } from '../api/api';

const ErrorPage = ({ navigation }) => {
  return (
    <View>
      <ErrorView>
        <ErrorIcon name="error-outline" size={100} color={white} />
        <ErrorTitle>Error</ErrorTitle>
      </ErrorView>

      <ErrorSubtitle>
        {`Ooops! Something went terribly wrong 😰 please, go back and try again`}
      </ErrorSubtitle>

      <ErrorButton
        onPress={() => {
          backgroundSync().then(navigation.navigate('Home'));
        }}
      >
        <ButtonText>{`Go back 🤞`}</ButtonText>
      </ErrorButton>
    </View>
  );
};

const ErrorView = styled(View)`
  height: 50%;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
  background-color: ${redError};
  align-items: center;
  justify-content: center;
`;

const ErrorIcon = styled(MaterialIcons)`
  margin: 20px 0px;
`;

const ErrorTitle = styled(Title1)`
  font-weight: bold;
  text-align: center;
  color: ${white};
`;

const ErrorSubtitle = styled(Title2)`
  width: 80%;
  text-align: center;
  margin: 20% auto 15% auto;
`;

const ErrorButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border: 1px solid ${redError};
  border-radius: 10px;
  margin: 0px auto;
`;

const ButtonText = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${redError};
`;

ErrorPage.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ErrorPage;
