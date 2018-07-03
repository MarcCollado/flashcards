import React from 'react';
import {
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
import { black, blue, grey, white } from '../utils/ui/colors';

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

    this.setState({
      loading: true,
    });

    addCardToDeck(id, questionInput, answerInput)
      .then((delta) => navigation.navigate('Home', syncState([delta], id)))
      .catch((err) =>
        console.log('Error while adding the card to deck => ', err),
      );
  };

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;

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
          maxLength={140}
          multiline
          numberOfLines={3}
          placeholder="Type the question..."
          placeholderTextColor={grey}
          onChangeText={(input) => this.setState({ questionInput: input })}
        />

        <AddCardSubtitle>Answer</AddCardSubtitle>
        <MultilineInput
          enablesReturnKeyAutomatically
          maxLength={140}
          multiline
          numberOfLines={3}
          placeholder="Type the answer..."
          placeholderTextColor={grey}
          onChangeText={(input) => this.setState({ answerInput: input })}
        />

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
  margin: 10px 0px 0px 25px;
`;

const MultilineInput = styled(TextInput)`
  margin: 15px 20px;
  height: 40px;
  border-bottom-color: ${black};
  border-bottom-width: 1px;
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
