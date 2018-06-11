import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks } from './src/utils/api';

export default class App extends React.Component {

  componentDidMount() {
    getDecks()
      .then(decks => console.log(decks))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
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