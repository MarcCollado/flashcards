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
import Deck from './src/components/Deck';
import DeckDetail from './src/components/DeckDetail';
import Finished from './src/components/Finished';
import Quiz from './src/components/Quiz';
// import utils
import ErrorPage from './src/utils/notifications/error';
import WelcomePage from './src/utils/notifications/welcome';
import { askNotificationPermissions } from './src/utils/notifications/local';
import Toast from './src/utils/notifications/toast';
import { getDecks, backgroundSync } from './src/utils/api/api';
import { blue, white, purple } from './src/utils/ui/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${white}`,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
});

class Home extends React.Component {
  state = {
    decks: null,
    loading: true,
    notifications: false,
    refreshing: false,
    // 'ready', 'newDeck', 'newCard'
    toast: null,
  };

  componentDidMount() {
    const { navigation } = this.props;

    getDecks()
      .then((decks) => {
        this.setState(({
          decks,
          loading: false,
          refreshing: false,
          toast: 'ready',
        }));
      })
      .catch((err) => navigation.navigate('ErrorPage', { err }));

    navigation.setParams({
      syncState: this.syncState,
    });
  }

  onRefresh = () => {
    const { navigate } = this.props.navigation;

    this.setState({ refreshing: true });
    backgroundSync()
      .then((decks) => {
        this.setState({ decks, refreshing: false });
      })
      .catch((err) => navigate('ErrorPage', { err }));
  };

  initialSetup = (notifications) => {
    if (notifications) {
      askNotificationPermissions();
    }
    this.setState({
      notifications: true,
    });
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
        (prevState) => ({
          decks: prevState.decks.concat(delta),
          toast: 'newDeck',
        }),
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
        cards={deck.card}
        deckCoverImage={deck.coverImageUrl}
        deckTitle={deck.title}
        navigate={navigation.navigate}
        syncState={this.syncState}
      />
    ));
  };

  render() {
    const {
      loading, notifications, refreshing, toast,
    } = this.state;

    if (!notifications) {
      return <WelcomePage initialSetup={this.initialSetup} />;
    }

    if (loading) {
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
        {toast && <Toast type={toast} />}
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
        headerBackTitle: null,
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: purple,
        },
        headerTintColor: white,
        title: 'Quiz mode',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: white,
        },
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
    AddDeck: {
      screen: AddDeck,
    },
    AddCard: {
      screen: AddCard,
    },
    Finished: {
      screen: Finished,
    },
    ErrorPage: {
      screen: ErrorPage,
    },
    WelcomePage: {
      screen: WelcomePage,
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
