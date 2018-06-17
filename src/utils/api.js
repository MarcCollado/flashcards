import { AsyncStorage } from 'react-native';

import { fetchLocalStorage, DUMMY_DATA_KEY } from './_data';

// returns all decks from the database
export function getDecks() {
  return AsyncStorage.getItem(DUMMY_DATA_KEY)
    .then(fetchLocalStorage);
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {

}

// takes in a single title and creates a corresponding deck to the database
export function saveDeck(title) {

}

// takes in two arguments, id and card, and adds the card to the deck
// associated with that id
export function addCardToDeck(id, card) {

}
