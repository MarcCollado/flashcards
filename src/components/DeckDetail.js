import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { blue, white } from '../utils/ui/colors';
import { Title1, Body } from '../utils/ui/typography';

const DeckDetail = ({ navigation }) => {
  const id = navigation.getParam('id');
  const deckCoverImage = navigation.getParam('deckCoverImage');
  const deckTitle = navigation.getParam('deckTitle');
  const cards = navigation.getParam('cards');
  const syncState = navigation.getParam('syncState');

  const numberOfCards = cards.length;

  return (
    <DetailView>
      <CoverImage source={{ uri: deckCoverImage }} />
      <DetailTitle>{deckTitle}</DetailTitle>
      <DetailBody>{`${numberOfCards} cards in this deck`}</DetailBody>

      <DetailButton
        onPress={() => {
          navigation.navigate('AddCard', { id, syncState });
        }}
      >
        <ButtonBody>Add card</ButtonBody>
      </DetailButton>

      <DetailButton
        primary
        onPress={() => {
          navigation.navigate('Question', {
            deckCoverImage,
            deckTitle,
            cards,
          });
        }}
      >
        <ButtonBody primary>Start quiz</ButtonBody>
      </DetailButton>
    </DetailView>
  );
};

const DetailView = styled(View)`
  height: 100%;
  background-color: ${white};
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: 50%;
`;

const DetailTitle = styled(Title1)`
  margin: 20px 0px 0px 20px;
`;

const DetailBody = styled(Body)`
  margin: 10px 0px 20px 20px;
`;

const DetailButton = styled(TouchableOpacity)`
  width: 80%;
  height: 55px;
  border: ${(props) => (props.primary ? '0px' : `1px solid ${blue}`)};
  border-radius: 10px;
  margin: 10px auto 0px auto;
  background: ${(props) => (props.primary ? blue : white)};
`;

const ButtonBody = styled(Body)`
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
  color: ${(props) => (props.primary ? white : blue)};
`;

DeckDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DeckDetail;
