import React from 'react';
import { ScrollView, StatusBar, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';

import DeckCard from './DeckCard';
import { red, } from '../utils/ui/colors';

const renderDeckCards = (decks, navigation) => {
  const deckIDs = Object.keys(decks);

  return deckIDs.map(id => (
    <DeckCard
      deckCoverImage={decks[id].coverImageUrl}
      deckTitle={decks[id].title}
      key={id}
      navigation={navigation}
      numberOfCards={decks[id].questions.length}
      style={styles.deckCard}
    />
  ));
};

const DeckList = ({ children, navigation, }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    {renderDeckCards(children, navigation)}
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
