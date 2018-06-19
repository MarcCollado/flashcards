import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { createStackNavigator } from 'react-navigation';

import DeckList from './src/components/DeckList';
import DeckDetail from './src/components/DeckDetail';
import AddQuestion from './src/components/AddQuestion';
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

class HomeScreen extends React.Component {
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
      screen: HomeScreen,
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
