import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import Card from './src/components/Card';
import { getDecks, } from './src/utils/api';
import { LargeTitle, Body, } from './src/utils/ui/typography';
import { black, white, } from './src/utils/ui/colors';

export default class App extends React.Component {

  componentDidMount() {
    getDecks()
      .then(decks => console.log(decks))
  }

  render() {
    return (
      <View style={styles.container}>
        <Card>
          Hello
        </Card>
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
