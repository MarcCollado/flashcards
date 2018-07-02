import { AsyncStorage } from 'react-native';
import { GET_DECKS_QUERY, ADD_DECKS_QUERY, ADD_QUIZ_QUERY } from './queries';
import { DEV_URL, STORAGE_KEY } from './vars';

async function fetchAPI(query) {
  const response = await fetch(DEV_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: query,
  });
  const data = await response.json();
  return data;
}

function saveToDeviceStorage(decks) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
    .then(() => {})
    .catch((err) => console.log('Error saving data to device => ', err));
}

export function syncData() {
  return fetchAPI(GET_DECKS_QUERY)
    .then((resAPI) => saveToDeviceStorage(resAPI.data.decks))
    .catch((err) => console.log('Error fetching data from the API => ', err));
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
      .catch((err) => console.log('Error fetching data from API => ', err));
  });
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {}

// takes in a single title and creates a corresponding deck to the database
export function addDeck(title, coverImageUrl) {
  return (
    fetchAPI(ADD_DECKS_QUERY(title, coverImageUrl))
      // returns the { newDeck }
      .then((resAPI) => resAPI.data.addDeck)
      .catch((err) => console.log('Error adding the new deck => ', err))
  );
}

// takes in two arguments, id and question, and adds the question to the deck
// associated with that id
export function addQuizToDeck(id, question, answer) {
  return fetchAPI(ADD_QUIZ_QUERY(id, question, answer))
    .then((resAPI) => resAPI.data.addQuizToDeck)
    .catch((err) => console.log('Error adding the quiz to the deck => ', err));
}
