import { AsyncStorage } from 'react-native';

export const DUMMY_DATA_KEY = 'flashcards:dummy-data';

// to be deleted once real data is imported
const dummyData = {
  aviation: {
    title: 'Aviation history',
    coverImageUrl: 'https://images.unsplash.com/photo-1464490997959-0c65eee1cc26?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a94e63e6f9e5de6163c5343adfe75689&auto=format&fit=crop&w=1350&q=80',
    questions: [
      {
        question: 'Which was Concorde\'s maximum speed?',
        answer: 'The Concorde had a maximum speed over twice the speed of sound at Mach 2.04.',
      },
      {
        question: 'Who was F-22 Raptor\' manufacturer?',
        answer: 'The F-22 Raptor was manufactured by Lockheed Martin.',
      },
      {
        question: 'When did the Airbus A380 had its first flight?',
        answer: 'The A380 flew for the first time on April 2005.',
      },
    ],
  },
  code: {
    title: 'Learn to code',
    coverImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e5a31d03ddee66863a599421f792e07b&auto=format&fit=crop&w=1350&q=80',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      },
      {
        question: 'What is the difference between methods and functions in OOP?',
        answer: 'A function is a piece of code that is called by name, but a method is a piece of code that is called by a name that is associated with an object.',
      },
    ],
  },
};

function setDummyData() {
  // might be interesting to add a timestamp to the deck
  // const timestamp = Date.now();

  AsyncStorage.setItem(DUMMY_DATA_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function fetchLocalStorage(results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results);
}
// to be renamed once real data is imported
