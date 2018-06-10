import { AsyncStorage } from 'react-native';

// function setDummyData() {
//
//   const dummyData = {
//     aviation: {
//       title: 'Aviation history',
//       questions: [
//         {
//           question: 'Which was Concorde\'s maximum speed?',
//           answer: 'The Concorde had a maximum speed over twice the speed of sound at Mach 2.04.'
//         },
//         {
//           question: 'Who was F-22 Raptor\' manufacturer?',
//           answer: 'The F-22 Raptor was manufactured by Lockheed Martin.'
//         },
//         {
//           question: 'When did the Airbus A380 had its first flight?',
//           answer: 'The A380 flew for the first time on April 2005.'
//         },
//       ]
//     },
//     code: {
//       title: 'Learn to code',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         },
//         {
//           question: 'What is the difference between methods and functions in OOP?',
//           answer: 'A function is a piece of code that is called by name, but a method is a piece of code that is called by a name that is associated with an object'.
//         },
//       ]
//     },
//   };
//
//   const timestamp = Date.now();
//
//   for (let i = -183; i < 0; i++) {
//     const time = timestamp + i * 24 * 60 * 60 * 1000;
//     const strTime = timeToString(time);
//     dummyData[strTime] = getRandomNumber(3) % 2 === 0
//       ? {
//         run: getRandomNumber(run.max),
//         bike: getRandomNumber(bike.max),
//         swim: getRandomNumber(swim.max),
//         sleep: getRandomNumber(sleep.max),
//         eat: getRandomNumber(eat.max),
//       }
//       : null;
//   }
//
//   AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData));
//
//   return dummyData;
// }
