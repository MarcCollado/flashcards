import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const DeckCard = ({ id, deckCoverImage, deckTitle, quiz, navigation }) => {
  const numberOfCards = quiz.length;
  return (
    <CardView>
      <CardCoverImage source={{ uri: deckCoverImage }} />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate('DeckDetail', {
            id,
            deckCoverImage,
            deckTitle,
            quiz,
          });
        }}
      >
        <CardTitle>{deckTitle}</CardTitle>
      </TouchableHighlight>
      <CardBody>{`${numberOfCards} cards in this deck`}</CardBody>
    </CardView>
  );
};

const CardView = styled(View)`
  width: 80%;
  height: 325;
  border-radius: 8px;
  margin: 5px 0px 15px 0px;
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
  margin: 20px 0px 5px 20px;
`;

const CardBody = styled(Body)`
  margin: 5px 0px 0px 20px;
`;

DeckCard.propTypes = {
  id: PropTypes.string.isRequired,
  deckCoverImage: PropTypes.string.isRequired,
  deckTitle: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  quiz: PropTypes.array.isRequired,
};

export default DeckCard;
