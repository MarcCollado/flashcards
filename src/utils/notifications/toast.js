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

  componentDidMount() {
    const { opacity, position } = this.state;

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
          toValue: -70,
          duration: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
        }),
      ]),
    ]).start();
  }

  render() {
    const { opacity, position } = this.state;
    const { children } = this.props;

    return (
      <Animated.View style={[styles.container, { opacity, bottom: position }]}>
        <NotificationText>{children}</NotificationText>
      </Animated.View>
    );
  }
}

const NotificationText = styled(Body)`
  margin: 5px 0px 0px 20px;
  align-self: center;
`;

Toast.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Toast;
