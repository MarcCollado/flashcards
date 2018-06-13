import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import { getDecks, } from './src/utils/api';
import { LargeTitle, Body, } from './src/utils/ui/typography';

export default class App extends React.Component {

  componentDidMount() {
    getDecks()
      .then(decks => console.log(decks))
  }

  render() {
    return (
      <View style={styles.container}>
        <LargeTitle>
          This is LargeTitle
        </LargeTitle>
        <Body>
          This is Body
        </Body>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
