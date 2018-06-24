import React from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body, Title1, Title2 } from '../utils/ui/typography';
import { green, red, white } from '../utils/ui/colors';

class Quiz extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {};

  componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    return (
      <QuizView>
        <Progress>...Progress goes here...</Progress>

        <QuestionContent>...The question goes here...</QuestionContent>

        <Button
          title="View Answer"
          onPress={() => navigation.navigate('Answer', { id })}
        />

        <DetailButton onPress={() => {}}>
          <ButtonBody>Not sure</ButtonBody>
        </DetailButton>
        <DetailButton primary>
          <ButtonBody primary>I know it</ButtonBody>
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
  margin: 60px 0px 20px 25px;
`;

const QuestionContent = styled(Title2)`
  margin: 15px 0px 0px 20px;
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

export default Quiz;
