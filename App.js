import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { AppLoading } from 'expo';

import DeckList from './src/components/DeckList';
import { getDecks, } from './src/utils/api';
import { LargeTitle, Body, } from './src/utils/ui/typography';
import { black, white, } from './src/utils/ui/colors';

export default class App extends React.Component {
  state = {
    ready: false,
    decks: null,
  };

  componentDidMount() {
    const { ready } = this.state;

    getDecks()
      .then((decks) => {
        this.setState(() => ({
          decks: decks,
          ready: true,
        }));
      })
  };

  render() {
    const { decks, ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <DeckList>
          {decks}
        </DeckList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${white}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
