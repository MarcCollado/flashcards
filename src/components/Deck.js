import React from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';

class Deck extends React.Component {
  state = {
    deckCover: this.props.deckCover;
    deckTitle: this.props.deckTitle;
    numberOfCards: this.props.numberOfCards;
  };

}

Deck.propTypes = {
  deckCover: PropTypes.string.isRequired,
  deckTitle: PropTypes.string.isRequired,
  numberOfCards: PropTypes.number.isRequired,
};

export default Deck;
