import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';

import AddDeck from './src/components/AddDeck';
import AddCard from './src/components/AddCard';
import Answer from './src/components/Answer';
import Deck from './src/components/Deck';
import DeckDetail from './src/components/DeckDetail';
import Finished from './src/components/Finished';
import Question from './src/components/Question';

import { askNotificationPermissions } from './src/utils/notifications/local';
import { getDecks, backgroundSync } from './src/utils/api/api';
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

class Home extends React.Component {
  state = {
    decks: null,
    loading: true,
  };

  componentDidMount() {
    const { navigation } = this.props;

    askNotificationPermissions();

    getDecks().then((decks) => {
      this.setState(
        () => {
          return {
            decks,
            loading: false,
          };
        },
        () => backgroundSync(),
      );
    });

    navigation.setParams({ syncState: this.syncState });
  }

  syncState = (delta, id) => {
    if (id !== undefined) {
      this.setState(
        (prevState) => {
          const decksWithDelta = prevState.decks.map((deck) => {
            if (deck.id === id) {
              return {
                ...deck,
                card: deck.card.concat(delta),
              };
            }
            return deck;
          });
          return {
            decks: decksWithDelta,
          };
        },
        () => backgroundSync(),
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            decks: prevState.decks.concat(delta),
          };
        },
        () => backgroundSync(),
      );
    }
  };

  renderDecks = () => {
    const { navigation } = this.props;
    const { decks } = this.state;

    return decks.map((deck) => (
      <Deck
        key={deck.id}
        id={deck.id}
        deckCoverImage={deck.coverImageUrl}
        deckTitle={deck.title}
        navigation={navigation}
        cards={deck.card}
        syncState={this.syncState}
      />
    ));
  };

  render() {
    const { loading } = this.state;

    if (loading === true) {
      return <AppLoading />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {this.renderDecks()}
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
              const syncState = navigation.getParam('syncState');
              navigation.navigate('AddDeck', { syncState });
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
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
    Question: {
      screen: Question,
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
    AddCard: {
      screen: AddCard,
    },
    Answer: {
      screen: Answer,
    },
    Finished: {
      screen: Finished,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AddDeckButton = styled(TouchableOpacity)`
  margin-left: 15px;
`;

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const App = () => <RootStack />;

export default App;
