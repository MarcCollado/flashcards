import { AsyncStorage } from 'react-native';

import { fetchLocalStorage, DUMMY_DATA_KEY } from './_data';

async function fetchAsync() {
  const URL = `http://localhost:4000/graphql?`;
  const queryDecks = `{"query":"query {\
    decks {\
      id\
      title\
      coverImageUrl\
      quiz {\
        question\
        answer\
      }\
    }\
  }\
  "}`;
  // await response of fetch call
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: queryDecks,
  });
  // only proceed once promise is resolved
  const data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

// returns all decks from the database
export function getDecks() {
  fetchAsync()
    .then((res) => JSON.stringify(res.data.decks))
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
  return AsyncStorage.getItem(DUMMY_DATA_KEY).then(fetchLocalStorage);
}

const DATA_KEY_DEV = `flashcards-dev`;

// const getDecksFromAPI = async () => {
//   try {
//     const URL = ...
//     const queryDecks = ...
//     return await fetch(URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: queryDecks,
//     })
//       .then((res) => res.json())
//       .then((res) => JSON.stringify(res.data.decks));
//   } catch (error) {
//     error.log('error fetching API');
//   }
// };

// returns all decks from the database
export function getDecksv2() {
  // returns the item in LocalStorage if local data is found
  // returns null if no data is found and then fetches from the API
  AsyncStorage.getItem(DATA_KEY_DEV).then((res) => {
    console.log('getDecksv2 =>', res);
    return res === null ? getDecksFromAPI() : JSON.parse(res);
  });
}

// takes in a single id argument and returns the deck associated with that id
export function getDeck(id) {}

// takes in a single title and creates a corresponding deck to the database
export function addDeck(title) {}

// takes in two arguments, id and question, and adds the question to the deck
// associated with that id
export function addQuestionToDeck(id, question) {}
