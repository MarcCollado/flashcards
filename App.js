import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { AppLoading } from 'expo';
import { createStackNavigator } from 'react-navigation';

import DeckList from './src/components/DeckList';
import DeckDetail from './src/components/DeckDetail';
import AddQuestion from './src/components/AddQuestion';
import { getDecks, } from './src/utils/api';
import { LargeTitle, Body, } from './src/utils/ui/typography';
import { black, white, } from './src/utils/ui/colors';

class HomeScreen extends React.Component {
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
        <DeckList
          navigation={this.props.navigation}
        >
          {decks}
        </DeckList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${white}`,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const StackNavigator = createStackNavigator(
// RouteConfigs
{
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Decks`,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('deckTitle'),
    }),
  },
},
// StackNavigatorConfig
{
  initialRouteName: 'Home',
},
);

const RootStack = createStackNavigator(
  {
    Root: {
      screen: StackNavigator,
    },
    AddQuestion: {
      screen: AddQuestion,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('id'),
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
