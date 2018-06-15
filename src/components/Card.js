import React from 'react';
import { View, Text, Image, } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LargeTitle, Body, } from '../utils/ui/typography';
import { white, black, } from '../utils/ui/colors';

const Card = ({ children, style, }) => (
  <View style={style}>
    <StyledImage
      source={{uri: 'https://images.unsplash.com/photo-1464490997959-0c65eee1cc26?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a94e63e6f9e5de6163c5343adfe75689&auto=format&fit=crop&w=1350&q=80'}}
    />
    <LargeTitle>
      {children}
    </LargeTitle>
    <Body>
      This is Body
    </Body>
  </View>
);

const StyledCard = styled(Card)`
  width: 80%;
  height: 340;
  border-radius: 8px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(25, 25, 25, 0.15);
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 60%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

Card.propTypes = {

};

export default StyledCard;
