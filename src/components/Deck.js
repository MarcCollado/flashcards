import React from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';

const Deck = ({ deckTitle, numberOfCards }) => (

);

Deck.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  numberOfCards: PropTypes.number.isRequired,
};

export default Deck;
