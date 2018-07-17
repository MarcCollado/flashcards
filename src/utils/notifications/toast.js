import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { greyLight } from '../ui/colors';
import { Body } from '../ui/typography';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 70,
    width: '90%',
    borderRadius: 12,
    backgroundColor: `${greyLight}`,
    position: 'absolute',
  },
});

class Toast extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    position: new Animated.Value(-60),
  };

  componentDidUpdate(prevProps) {
    const { opacity, position } = this.state;
    const { type } = this.props;

    if (prevProps.type && prevProps.type !== type) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(position, {
            toValue: 30,
            duration: 1000,
          }),
        ]),
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(position, {
            toValue: -60,
            duration: 500,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
          }),
        ]),
      ]).start();
    }
  }

  createMessage = (type) => {
    switch (type) {
      case 'newDeck':
        return `A new deck was created`;
      case 'newCard':
        return `The card was added to the deck`;
      default:
        return null;
    }
  }

  render() {
    const { opacity, position } = this.state;
    const { type } = this.props;
    console.log(type);

    return (
      <Animated.View style={[styles.container, { opacity, bottom: position }]}>
        <NotificationText>{this.createMessage(type)}</NotificationText>
      </Animated.View>
    );
  }
}

const NotificationText = styled(Body)`
  margin: 5px 0px 0px 20px;
  align-self: center;
  font-size: 14px;
`;

Toast.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Toast;
