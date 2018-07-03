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

import { addDeck } from '../utils/api/api';
import { black, blue, grey, white } from '../utils/ui/colors';
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

    this.setState({
      loading: true,
    });

    unsplash.photos
      .getRandomPhoto()
      .then((img) => img.json())
      .then((img) =>
        addDeck(deckTitle, img.urls.small).then((res) =>
          navigation.navigate('Home'),
        ),
      )
      .catch((err) => console.log('Error while adding the deck => ', err));
  };

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;

    if (loading === true) {
      return <ActivityIndicator size="large" color={blue} />;
    }

    return (
      <View>
        <AddDeckTitle>Create a new deck</AddDeckTitle>

        <AddDeckSubtitle>Deck Title</AddDeckSubtitle>

        <Input
          enablesReturnKeyAutomatically
          autoFocus
          maxLength={70}
          placeholder="Type the deck title..."
          placeholderTextColor={grey}
          onChangeText={(input) => this.setState({ input })}
        />

        <SubmitButton onPress={this.onPress}>
          <ButtonText>Create Deck</ButtonText>
        </SubmitButton>

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const AddDeckTitle = styled(Title1)`
  margin: 80px 0px 20px 25px;
`;

const AddDeckSubtitle = styled(Title2)`
  margin: 20px 0px 0px 25px;
`;

const Input = styled(TextInput)`
  margin: 20px 25px;
  height: 40px;
  border-bottom-color: ${black};
  border-bottom-width: 1px;
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
