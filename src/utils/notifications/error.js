import React from 'react';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { Body, Title1, Title2 } from '../ui/typography';
import { redError, white } from '../ui/colors';
import { backgroundSync } from '../api/api';

const ErrorPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ErrorView>
          <ErrorIcon name="error-outline" size={100} color={white} />
          <ErrorTitle>Error</ErrorTitle>
        </ErrorView>
        <Wrapper>
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
        </Wrapper>
      </View>
    </SafeAreaView>
  );
};

const ErrorView = styled(View)`
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
  align-items: center;
  justify-content: center;
  background-color: ${redError};
`;

const ErrorIcon = styled(MaterialIcons)`
  margin-top: 10px;
`;

const ErrorTitle = styled(Title1)`
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
  color: ${white};
`;

const Wrapper = styled(View)`
  align-items: center;
`;

const ErrorSubtitle = styled(Title2)`
  width: 80%;
  text-align: center;
  margin-top: 30px;
`;

const ErrorButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border: 1px solid ${redError};
  border-radius: 10px;
  margin: 20px auto 5px auto;
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
