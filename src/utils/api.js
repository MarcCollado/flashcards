import { AsyncStorage } from 'react-native';

import { fetchLocalStorage, DUMMY_DATA_KEY } from './_data';

// returns all decks from the database
export function getDecks() {
  return AsyncStorage.getItem(DUMMY_DATA_KEY).then(fetchLocalStorage);
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {}

// takes in a single title and creates a corresponding deck to the database
export function addDeck(title) {}

// takes in two arguments, id and question, and adds the question to the deck
// associated with that id
export function addQuestionToDeck(id, question) {}
