import React from 'react';
import { View, } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body } from '../utils/ui/typography';

const AddQuestion = ({ navigation }) => {

  const id = navigation.getParam('id');

  return (
    <View>
      <Body>${id}</Body>
    </View>
  );
}

export default AddQuestion;
