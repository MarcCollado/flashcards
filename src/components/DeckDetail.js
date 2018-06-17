import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DeckDetail = ({ navigation }) => {
  const deckCoverImage = navigation.getParam('deckCoverImage');
  const deckTitle = navigation.getParam('deckTitle');
  const id = navigation.getParam('id');
  const numberOfCards = navigation.getParam('numberOfCards');

  return (
    <View>
      <DetailCoverImage
        source={{ uri: deckCoverImage }}
      />
      <Text>
        {id}
      </Text>
    </View>
  );
};

const DetailCoverImage = styled(Image)`
  width: 100%;
  height: 200px;
`;

DeckDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DeckDetail;
