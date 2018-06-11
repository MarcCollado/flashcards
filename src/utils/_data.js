import { AsyncStorage } from 'react-native';

export const DUMMY_DATA_KEY = 'flashcards:dummy-data';

// to be deleted once real data is imported
const dummyData = {
  aviation: {
    title: 'Aviation history',
    questions: [
      {
        question: 'Which was Concorde\'s maximum speed?',
        answer: 'The Concorde had a maximum speed over twice the speed of sound at Mach 2.04.'
      },
      {
        question: 'Who was F-22 Raptor\' manufacturer?',
        answer: 'The F-22 Raptor was manufactured by Lockheed Martin.'
      },
      {
        question: 'When did the Airbus A380 had its first flight?',
        answer: 'The A380 flew for the first time on April 2005.'
      },
    ]
  },
  code: {
    title: 'Learn to code',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'What is the difference between methods and functions in OOP?',
        answer: 'A function is a piece of code that is called by name, but a method is a piece of code that is called by a name that is associated with an object.'
      },
    ]
  },
};

export function fetchLocalStorage(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results);
}
// to be renamed once real data is imported
function setDummyData() {

  // might be interesting to add a timestamp to the deck
  // const timestamp = Date.now();

  AsyncStorage.setItem(DUMMY_DATA_KEY, JSON.stringify(dummyData));

  return dummyData;
}
