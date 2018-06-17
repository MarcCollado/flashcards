import React from 'react';
import { ScrollView, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';

import DeckCard from './DeckCard';
import { red, } from '../utils/ui/colors';

const renderDeckCards = (decks) => {
  const deckIDs = Object.keys(decks);

  return deckIDs.map(id => (
    <DeckCard
      style={styles.deckCard}
      key={id}
      deckCoverImage={decks[id].coverImageUrl}
      deckTitle={decks[id].title}
      numberOfCards={decks[id].questions.length}
    />
  ));
};

const DeckList = ({ children }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    {renderDeckCards(children)}
  </ScrollView>
);

DeckList.propTypes = {
  children: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deckCard: {
    marginTop: 5,
    marginBottom: 15,
  }
});

export default DeckList;
