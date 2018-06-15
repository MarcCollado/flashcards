import React from 'react';
import { View, Text, } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LargeTitle, Body, } from '../utils/ui/typography';
import { white, black, } from '../utils/ui/colors';

const Card = ({ children, style, }) => (
  <View style={style}>
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
  height: 300;
  border-radius: 8px;
  background-color: ${white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
`;


Card.propTypes = {

};

export default StyledCard;
