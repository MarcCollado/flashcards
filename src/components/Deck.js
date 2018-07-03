import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const Deck = ({
  id,
  deckCoverImage,
  deckTitle,
  cards,
  navigation,
  syncState,
}) => {
  const numberOfCards = cards.length;
  return (
    <DeckView Large={deckTitle.length > 20}>
      <DeckCoverImage source={{ uri: deckCoverImage }} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DeckDetail', {
            id,
            deckCoverImage,
            deckTitle,
            cards,
            syncState,
          });
        }}
      >
        <DeckTitle Large={deckTitle.length > 20}>{deckTitle}</DeckTitle>
      </TouchableOpacity>
      <DeckBody>{`${numberOfCards} cards in this deck`}</DeckBody>
    </DeckView>
  );
};

const DeckView = styled(View)`
  width: 80%;
  height: ${(props) => (props.Large ? '365px' : `325px`)};
  border-radius: 8px;
  margin: 5px 0px 15px 0px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const DeckCoverImage = styled(Image)`
  width: 100%;
  height: 210px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const DeckTitle = styled(Title1)`
  font-size: ${(props) => (props.Large ? '26px' : `28px`)};
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
  syncState: PropTypes.func.isRequired,
};

export default Deck;
