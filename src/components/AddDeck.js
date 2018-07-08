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

import { addDeck } from '../utils/api/api';
import { black, blue, grey, red, orange, white } from '../utils/ui/colors';
import { Body, Title1, Title2 } from '../utils/ui/typography';
import { unsplash } from '../utils/api/vars';

class AddDeck extends React.Component {
  state = {
    input: null,
    loading: false,
  };

  onPress = () => {
    const deckTitle = this.state.input;
    const { navigation } = this.props;
    const syncState = navigation.getParam('syncState');

    if (deckTitle !== null) {
      this.setState({
        loading: true,
      });

      unsplash.photos
        .getRandomPhoto()
        .then((img) => img.json())
        .then((img) =>
          addDeck(deckTitle, img.urls.small).then((delta) =>
            navigation.navigate('Home', syncState([delta])),
          ),
        )
        .catch((err) => navigation.navigate('ErrorPage', { err }));
    } else {
      Alert.alert(
        `👮‍♂️`,
        `\nDeck titles can't be blank. Please type a title name for your new deck.`,
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
    const { loading, input } = this.state;
    const maxLength = 40;

    if (loading === true) {
      return <ActivityIndicator size="large" color={blue} />;
    }

    return (
      <View>
        <AddDeckTitle>Create a new deck</AddDeckTitle>

        <AddDeckSubtitle>Deck title</AddDeckSubtitle>

        <Input
          enablesReturnKeyAutomatically
          autoFocus
          clearButtonMode="while-editing"
          maxLength={maxLength}
          onChangeText={(text) => this.setState({ input: text })}
          placeholder="Type the deck title..."
          placeholderTextColor={grey}
          warn={this.textValidator(input, maxLength, 0.7, 0.9)}
          reachedLimit={this.textValidator(input, maxLength, 0.9)}
        />
        <RemainingCharacters
          warn={this.textValidator(input, maxLength, 0.7, 0.9)}
          reachedLimit={this.textValidator(input, maxLength, 0.9)}
        >
          {`${input === null ? 0 : input.length} / ${maxLength}`}
        </RemainingCharacters>
        <SubmitButton onPress={this.onPress}>
          <ButtonText>Create deck</ButtonText>
        </SubmitButton>

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const AddDeckTitle = styled(Title1)`
  margin: 80px 0px 10px 25px;
`;

const AddDeckSubtitle = styled(Title2)`
  margin: 15px 0px 0px 25px;
`;

const Input = styled(TextInput)`
  margin: 20px 25px 0px 25px;
  height: 40px;
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
  margin: 20px auto 10px auto;
  background: ${blue};
`;

const ButtonText = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${white};
`;

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeck;
