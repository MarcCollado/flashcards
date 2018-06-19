import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppLoading } from 'expo';

import AddQuestion from './src/components/AddQuestion';
import DeckDetail from './src/components/DeckDetail';
import DeckList from './src/components/DeckList';
import { getDecks } from './src/utils/api';
import { white } from './src/utils/ui/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${white}`,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Home extends React.Component {
  state = {
    ready: false,
    decks: null,
  };

  componentDidMount() {
    getDecks().then((decks) => {
      this.setState(() => ({
        decks,
        ready: true,
      }));
    });
  }

  render() {
    const { decks, ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <DeckList navigation={this.props.navigation}>{decks}</DeckList>
      </View>
    );
  }
}

const StackNavigator = createStackNavigator(
  // RouteConfigs
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Decks',
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
  },
);

const App = () => <RootStack />;

export default App;
