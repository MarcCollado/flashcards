import { AsyncStorage } from 'react-native';
import { GET_DECKS } from './queries';
import { DEV_URL, STORAGE_KEY } from './vars';

async function fetchAPI() {
  const response = await fetch(DEV_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: GET_DECKS,
  });
  const data = await response.json();
  return data;
}

// returns all decks from the database
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then((localData) => {
    if (localData) {
      // console.log('LOG => DATA COMES FROM THE LOCAL STORAGE');
      return JSON.parse(localData);
    }
    // console.log('LOG => DATA COMES FROM THE API');
    return fetchAPI()
      .then((resAPI) => resAPI.data.decks)
      .catch((err) => console.log('Error fetching data from the API => ', err));
  });
}

export function saveToLocalStorage(data) {
  // console.log('LOG => DATA SAVED TO LOCAL STORAGE');
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {}

// takes in a single title and creates a corresponding deck to the database
export function addDeck(title) {}

// takes in two arguments, id and question, and adds the question to the deck
// associated with that id
export function addQuestionToDeck(id, question) {}

// to be deleted once real data is imported
