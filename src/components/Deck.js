import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const Deck = ({ id, deckCoverImage, deckTitle, cards, navigation }) => {
  const numberOfCards = cards.length;
  return (
    <DeckView>
      <DeckCoverImage source={{ uri: deckCoverImage }} />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('DeckDetail', {
            id,
            deckCoverImage,
            deckTitle,
            cards,
          });
        }}
      >
        <DeckTitle>{deckTitle}</DeckTitle>
      </TouchableHighlight>
      <DeckBody>{`${numberOfCards} cards in this deck`}</DeckBody>
    </DeckView>
  );
};

const DeckView = styled(View)`
  width: 80%;
  height: 325;
  border-radius: 8px;
  margin: 5px 0px 15px 0px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const DeckCoverImage = styled(Image)`
  width: 100%;
  height: 65%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const DeckTitle = styled(Title1)`
  margin: 20px 0px 5px 20px;
`;

const DeckBody = styled(Body)`
  margin: 5px 0px 0px 20px;
`;

Deck.propTypes = {
  id: PropTypes.string.isRequired,
  deckCoverImage: PropTypes.string.isRequired,
  deckTitle: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
};

export default Deck;
