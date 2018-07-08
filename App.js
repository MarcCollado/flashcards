import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';
// import components
import AddCard from './src/components/AddCard';
import AddDeck from './src/components/AddDeck';
import Answer from './src/components/Answer';
import Deck from './src/components/Deck';
import DeckDetail from './src/components/DeckDetail';
import Finished from './src/components/Finished';
import Question from './src/components/Question';
// import utils
import ErrorPage from './src/utils/notifications/error';
import { askNotificationPermissions } from './src/utils/notifications/local';
import Toast from './src/utils/notifications/toast';
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
    toast: null,
  };

  componentDidMount() {
    const { navigation } = this.props;

    askNotificationPermissions();

    getDecks()
      .then((decks) => {
        this.setState(
          () => {
            return {
              decks,
              loading: false,
              refreshing: false,
              toast: null,
            };
          },
          () => backgroundSync(),
        );
      })
      .catch((err) => navigation.navigate('ErrorPage', { err }));

    navigation.setParams({
      syncState: this.syncState,
    });
  }

  onRefresh = () => {
    const { navigation } = this.props;

    this.setState({ refreshing: true });
    backgroundSync()
      .then((decks) => {
        this.setState({ decks, refreshing: false });
      })
      .catch((err) => navigation.navigate('ErrorPage', { err }));
  };

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
            toast: 'newCard',
          };
        },
        () => backgroundSync(),
      );
    } else {
      this.setState(
        (prevState) => {
          return {
            decks: prevState.decks.concat(delta),
            toast: 'newDeck',
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

  renderToast = (message) => {
    switch (message) {
      case 'newDeck':
        return <Toast>{`A new deck was created 👍`}</Toast>;
      case 'newCard':
        return <Toast>{`The card was added to the deck 👍`}</Toast>;
      default:
        return null;
    }
  };

  render() {
    const { loading, refreshing, toast } = this.state;

    if (loading === true) {
      return <AppLoading />;
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            title="Fetching decks..."
          />
        }
      >
        {this.renderDecks()}
        {toast && this.renderToast(toast)}
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
    ErrorPage: {
      screen: ErrorPage,
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
