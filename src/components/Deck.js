import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const Deck = ({
  id,
  cards,
  deckCoverImage,
  deckTitle,
  navigate,
  syncState,
}) => {
  const numberOfCards = cards.length;

  return (
    <DeckView Large={deckTitle.length > 20}>
      <TouchableOpacity
        onPress={() => {
          navigate('DeckDetail', {
            id,
            deckCoverImage,
            deckTitle,
            cards,
            syncState,
          });
        }}
      >
        <CoverFrame>
          <DeckCoverImage source={{ uri: deckCoverImage }} />
        </CoverFrame>

        <DeckTitle Large={deckTitle.length > 20}>{deckTitle}</DeckTitle>

        <DeckBody>{`${numberOfCards} cards in this deck`}</DeckBody>
      </TouchableOpacity>
    </DeckView>
  );
};

const DeckView = styled(View)`
  width: 80%;
  height: ${(props) => (props.Large ? '340px' : `300px`)};
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const CoverFrame = styled(View)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`;

const DeckCoverImage = styled(Image)`
  width: 100%;
  height: 180px;
`;

const DeckTitle = styled(Title1)`
  font-size: ${(props) => (props.Large ? '26px' : `28px`)};
  margin: 25px 0px 0px 20px;
`;

const DeckBody = styled(Body)`
  margin: 5px 0px 0px 20px;
`;

Deck.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  deckCoverImage: PropTypes.string.isRequired,
  deckTitle: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  syncState: PropTypes.func.isRequired,
};

export default Deck;
