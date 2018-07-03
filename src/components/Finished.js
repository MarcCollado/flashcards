import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { blue, white } from '../utils/ui/colors';
import { Body, Title1, Title2 } from '../utils/ui/typography';

class Finished extends React.Component {
  state = {};

  onPress = () => {};

  render() {
    const { navigation } = this.props;
    const score = navigation.getParam('score');

    return (
      <View>
        <Progress>{score}</Progress>

        <SubmitButton onPress={this.onPress}>
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

const Progress = styled(Title1)`
  margin: 60px auto 10px auto;
  text-align: center;
`;

const FinishedText = styled(Title2)`
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

Finished.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Finished;
