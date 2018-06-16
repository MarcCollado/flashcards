import React from 'react';
import { View, Text, Image, } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LargeTitle, Body, } from '../utils/ui/typography';
import { white, black, } from '../utils/ui/colors';

const DeckList = ({ style, }) => (
  <View style={style}>

  </View>
);

Card.propTypes = {
  style: PropTypes.array.isRequired,
};

export default DeckList;
