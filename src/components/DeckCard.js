import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const Card = ({
  deckCoverImage,
  deckTitle,
  id,
  navigation,
  numberOfCards,
  style,
}) => (
  <View style={style}>
    <CardCoverImage
      source={{ uri: deckCoverImage }}
    />
    <TouchableHighlight
      onPress={() => {
        navigation.navigate('DeckDetail', {
          deckCoverImage,
          deckTitle,
          id,
          numberOfCards,
        });
      }}
    >
      <CardTitle>
        {deckTitle}
      </CardTitle>
    </TouchableHighlight>
    <CardBody>
      {`${numberOfCards} cards in this deck`}
    </CardBody>
  </View>
);

const DeckCard = styled(Card)`
  width: 80%;
  height: 340;
  border-radius: 8px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const CardCoverImage = styled(Image)`
  width: 100%;
  height: 65%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const CardTitle = styled(Title1)`
  margin: 20px 0px 0px 20px;
`;

const CardBody = styled(Body)`
  margin: 5px 0px 0px 20px;
`;

Card.propTypes = {
  deckCoverImage: PropTypes.string.isRequired,
  deckTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  numberOfCards: PropTypes.number.isRequired,
  style: PropTypes.array.isRequired,
};

export default DeckCard;