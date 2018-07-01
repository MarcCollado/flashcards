import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';

import AddDeck from './src/components/AddDeck';
import AddQuestion from './src/components/AddQuestion';
import DeckDetail from './src/components/DeckDetail';
import DeckCard from './src/components/DeckCard';
import Quiz from './src/components/Quiz';
import { getDecks, saveToDeviceStorage } from './src/utils/api/api';
import { blue, white } from './src/utils/ui/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${white}`,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AddDeckButton = styled(TouchableOpacity)`
  margin-left: 15px;
`;

class Home extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  state = {
    decks: null,
    ready: false,
  };

  componentDidMount() {
    getDecks().then((decks) => {
      this.setState(
        {
          decks,
          ready: true,
        },
        () => saveToDeviceStorage(this.state.decks).then(() => {}),
      );
    });
  }

  renderDeckCards = () => {
    const { navigation } = this.props;
    const { decks } = this.state;

    return decks.map((deck) => (
      <DeckCard
        deckCoverImage={deck.coverImageUrl}
        deckTitle={deck.title}
        id={deck.id}
        key={deck.id}
        navigation={navigation}
        quiz={deck.quiz}
      />
    ));
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.renderDeckCards()}
      </ScrollView>
    );
  }
}

const StackNavigator = createStackNavigator(
  // RouteConfigs
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Decks',
        headerLeft: (
          <AddDeckButton
            onPress={() => {
              navigation.navigate('AddDeck');
            }}
          >
            <Feather name="plus" size={25} color={blue} />
          </AddDeckButton>
        ),
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
    Quiz: {
      screen: Quiz,
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
    AddDeck: {
      screen: AddDeck,
    },
    AddQuestion: {
      screen: AddQuestion,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const App = () => <RootStack />;

export default App;
