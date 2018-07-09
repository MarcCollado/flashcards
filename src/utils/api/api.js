import { AsyncStorage } from 'react-native';
import { DEV_URL, API_URL, STORAGE_KEY } from 'react-native-dotenv';
import {
  GET_DECKS_QUERY,
  GET_DECK_QUERY,
  ADD_DECK_QUERY,
  ADD_CARD_QUERY,
} from './queries';

async function fetchAPI(query) {
  try {
    const response = await fetch(DEV_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: query,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching data from the API => ', err);
  }
}

function saveToDeviceStorage(decks) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    .then()
    .catch((err) => console.error('Error saving data to device => ', err));
}

export function backgroundSync() {
  return fetchAPI(GET_DECKS_QUERY)
    .then((resAPI) => {
      saveToDeviceStorage(resAPI.data.decks);
      return resAPI.data.decks;
    })
    .catch((err) => console.error('Error fetching data from the API => ', err));
}

// returns all decks from the database
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((decks) => {
    if (decks) {
      // console.log('api/getDecks => GET DECKS FROM DEVICE');
      return JSON.parse(decks);
    }
    // console.log('api/getDecks => GET DECKS FROM API');
    return fetchAPI(GET_DECKS_QUERY)
      .then((resAPI) => resAPI.data.decks)
      .catch((err) => console.error('Error fetching decks => ', err));
  });
}

export function getDeck(id) {
  return fetchAPI(GET_DECK_QUERY(id))
    .then((resAPI) => resAPI.data.deck)
    .catch((err) => console.error('Error fetching deck => ', err));
}

export function addDeck(title, coverImageUrl) {
  return (
    fetchAPI(ADD_DECK_QUERY(title, coverImageUrl))
      // returns the { newDeck }
      .then((resAPI) => resAPI.data.addDeck)
      .catch((err) => console.error('Error adding deck => ', err))
  );
}

export function addCardToDeck(id, question, answer) {
  return fetchAPI(ADD_CARD_QUERY(id, question, answer))
    .then((resAPI) => resAPI.data.addCardToDeck)
    .catch((err) => console.error('Error adding card to deck => ', err));
}
