import { AsyncStorage } from 'react-native';
import { GET_DECKS_QUERY, ADD_DECKS_QUERY } from './queries';
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

export function saveToLocalStorage(data) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// returns all decks from the database
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((localData) => {
    if (localData) {
      console.log('api.js LOG => DATA COMES FROM THE LOCAL STORAGE');
      return JSON.parse(localData);
    }
    console.log('api.js LOG => DATA COMES FROM THE API');
    return fetchAPI(GET_DECKS_QUERY)
      .then((resAPI) => resAPI.data.decks)
      .catch((err) => console.log('Error fetching data from the API => ', err));
  });
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {}

// takes in a single title and creates a corresponding deck to the database
export function addDeck(title, coverImageUrl) {
  return fetchAPI(ADD_DECKS_QUERY(title, coverImageUrl))
    .then((resAPI) => resAPI.data.addDeck)
    .catch((err) => console.log('Error fetching data from the API => ', err));
}

export function clearLocalStorage() {
  return AsyncStorage.removeItem(STORAGE_KEY).then(() => {
    console.log('api.js LOG => REMOVED');
    return fetchAPI(GET_DECKS_QUERY)
      .then((resAPI) => resAPI.data.decks)
      .catch((err) => console.log('Error fetching data from the API => ', err));
  });
}

// takes in two arguments, id and question, and adds the question to the deck
// associated with that id
export function addQuestionToDeck(id, question) {}

// to be deleted once real data is imported
