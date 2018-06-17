import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import DeckCard from './DeckCard';

const renderDeckCards = (decks) => {
  const deckIDs = Object.keys(decks);

  return deckIDs.map(id => (
    <DeckCard
      key={id}
      deckCoverImage={decks[id].coverImageUrl}
      deckTitle={decks[id].title}
      numberOfCards={decks[id].questions.length}
    />
  ));
};

const DeckList = ({ children }) => (
  <ScrollView>
    {renderDeckCards(children)}
  </ScrollView>
);

DeckList.propTypes = {
  children: PropTypes.object.isRequired,
};

export default DeckList;
