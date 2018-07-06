import React from 'react';
import {
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { addCardToDeck } from '../utils/api/api';
import { Body, Title1, Title2 } from '../utils/ui/typography';
import { black, blue, grey, red, orange, white } from '../utils/ui/colors';

class AddCard extends React.Component {
  state = {
    questionInput: null,
    answerInput: null,
    loading: false,
  };

  onPress = () => {
    const { questionInput, answerInput } = this.state;
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const syncState = navigation.getParam('syncState');

    if (questionInput !== null && answerInput !== null) {
      this.setState({
        loading: true,
      });

      addCardToDeck(id, questionInput, answerInput)
        .then((delta) => navigation.navigate('Home', syncState([delta], id)))
        .catch((err) => console.log('Error adding card to deck => ', err));
    } else {
      Alert.alert(
        `👮‍♂️`,
        `\nNeither questions nor answers can't be blank. Please ensure both are properly set.`,
        { text: 'OK' },
        { cancelable: false },
      );
    }
  };

  textValidator = (input, max, lowerLimit, upperLimit = 1) => {
    const inputCount = input === null ? 0 : input.length;
    return inputCount > lowerLimit * max && inputCount <= upperLimit * max;
  };

  render() {
    const { navigation } = this.props;
    const { loading, questionInput, answerInput } = this.state;
    const maxLength = 140;

    if (loading === true) {
      return <ActivityIndicator size="large" color={blue} />;
    }

    return (
      <View>
        <AddCardTitle>Add a new card</AddCardTitle>

        <AddCardSubtitle>Question</AddCardSubtitle>
        <MultilineInput
          enablesReturnKeyAutomatically
          autoFocus
          maxLength={maxLength}
          multiline
          numberOfLines={3}
          placeholder="Type the question..."
          placeholderTextColor={grey}
          onChangeText={(input) => this.setState({ questionInput: input })}
          warn={this.textValidator(questionInput, maxLength, 0.75, 0.9)}
          reachedLimit={this.textValidator(questionInput, maxLength, 0.9)}
        />
        <RemainingCharacters
          warn={this.textValidator(questionInput, maxLength, 0.75, 0.9)}
          reachedLimit={this.textValidator(questionInput, maxLength, 0.9)}
        >
          {`${
            questionInput === null ? 0 : questionInput.length
          } / ${maxLength}`}
        </RemainingCharacters>

        <AddCardSubtitle>Answer</AddCardSubtitle>
        <MultilineInput
          enablesReturnKeyAutomatically
          maxLength={maxLength}
          multiline
          numberOfLines={3}
          placeholder="Type the answer..."
          placeholderTextColor={grey}
          onChangeText={(input) => this.setState({ answerInput: input })}
          warn={this.textValidator(answerInput, maxLength, 0.75, 0.9)}
          reachedLimit={this.textValidator(answerInput, maxLength, 0.9)}
        />
        <RemainingCharacters
          warn={this.textValidator(answerInput, maxLength, 0.75, 0.9)}
          reachedLimit={this.textValidator(answerInput, maxLength, 0.9)}
        >
          {`${answerInput === null ? 0 : answerInput.length} / ${maxLength}`}
        </RemainingCharacters>

        <SubmitButton onPress={this.onPress}>
          <ButtonText>Add card</ButtonText>
        </SubmitButton>

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const AddCardTitle = styled(Title1)`
  margin: 60px 0px 10px 25px;
`;

const AddCardSubtitle = styled(Title2)`
  margin: 7px 0px 0px 25px;
`;

const MultilineInput = styled(TextInput)`
  margin: 15px 25px 0px 25px;
  height: 30px;
  border-bottom-color: ${(props) => {
    if (props.warn) {
      return orange;
    } else if (props.reachedLimit) {
      return red;
    }
    return black;
  }};
  border-bottom-width: 1px;
`;

const RemainingCharacters = styled(Body)`
  font-size: 10px;
  color: ${(props) => {
    if (props.warn) {
      return orange;
    } else if (props.reachedLimit) {
      return red;
    }
    return grey;
  }};
  text-align: right;
  margin-right: 25px;
  font-weight: ${(props) => {
    return props.warn || props.reachedLimit ? `bold` : `normal`;
  }};
`;

const SubmitButton = styled(TouchableOpacity)`
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

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddCard;
