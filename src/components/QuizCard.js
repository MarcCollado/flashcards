import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import { white } from '../utils/ui/colors';

const styles = StyleSheet.create({
  flipCard: {
    width: 300,
    height: 300,
    borderRadius: 8,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
  },
  flipText: {
    textAlign: 'center',
    fontSize: 24,
  },
});

class QuizCard extends Component {
  state = {
    flip: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    if (this.props.question !== prevProps.question) {
      this.setState({ flip: new Animated.Value(0) });
    }
  }

  flipCard() {
    const { flip } = this.state;

    if (this.value >= 90) {
      Animated.spring(flip, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(flip, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  }

  render() {
    const { flip } = this.state;
    const { question, answer } = this.props;

    this.value = 0;

    flip.addListener(({ value }) => {
      this.value = value;
    });

    const frontFlipRange = {
      transform: [
        {
          rotateY: flip.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    const backFlipRange = {
      transform: [
        {
          rotateY: flip.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity onPress={() => this.flipCard()}>
        <Animated.View style={[styles.flipCard, frontFlipRange]}>
          <Text style={styles.flipText}>{question}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.flipCard, styles.flipCardBack, backFlipRange]}
        >
          <Text style={styles.flipText}>{answer}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

QuizCard.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default QuizCard;
