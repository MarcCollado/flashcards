# 🎴 Flashcards
React Native Project — Udacity React Developer Nanodegree

This is the third (and last) project of the [React Developer Nanodegree](https://eu.udacity.com/course/react-nanodegree--nd019). Below you'll find the rest of the Nanodegree projects and I also wrote a [short post](https://www.collado.io/blog/2018/udacity-rdnd) in my blog about the course experience.

* [MyReads](https://github.com/MarcCollado/my-reads) — React Project
* [Magis](https://github.com/MarcCollado/magis), formerly [Would You Rather](https://www.collado.io/blog/2018/magis-10) — React & Redux Project
* [Flashcards](https://github.com/MarcCollado/flashcards) — React Native Project
  * [Flashcards API](https://github.com/MarcCollado/flashcards-api) — Flashcards' backend

ℹ️ This project was developed in 2018 during the Nanodegree, and has now become my go-to React Native playground — where I try new technologies before rolling them out to more mature [Native-based projects](https://github.com/MarcCollado/pansa) of mine.

⚠️ Because of that, this project lives in a permanent state of beta. And while I try to maintain it as stable as possible, you might come across some bugs or a few broken things here and there.


## About
This project consists in a [flashcards](https://en.wikipedia.org/wiki/Flashcard) mobile application built with React Native. The mobile app, currently available for iOS, allows users to create decks, add cards with questions to the decks and, of course, quiz themselves and receive a score upon quiz completion.


## Tech Stack
* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org/)
* [Styled Components](https://www.styled-components.com)
* [Unsplash API](https://unsplash.com/developers)
* [GraphQL](https://graphql.org) — also used by [Flashcards API](https://github.com/MarcCollado/flashcards-api)
* [MongoDB](https://www.mongodb.com) — used by [Flashcards API](https://github.com/MarcCollado/flashcards-api)
* [Express](https://expressjs.com) — used by [Flashcards API](https://github.com/MarcCollado/flashcards-api)


## Installation
The following instructions will get you a copy of Flashcards up and running on your local machine.

### Prerequisites
Because this is an iOS application, in order to run it on your local machine make sure you have read the documentation and set up both iOS simulator — [Xcode](https://developer.apple.com/xcode/) on MacOS required — and Watchman.

* [iOS simulator](https://docs.expo.io/versions/v28.0.0/introduction/installation#ios-simulator)
* [Watchman](https://facebook.github.io/watchman/docs/install.html)

Watchman will probably require the Command Line Tools. To install them just run `xcode-select --install` in the terminal with Xcode already installed.

Finally, if this is the first time you use Xcode, launch Xcode, go to Preferences > Locations and set the Command Line Tools to the ones you just installed in the step above.

Installing [Node.js](https://nodejs.org/en/) is entirely optional since the production version of the app features a [GraphQL API](https://graphql.org) in combination with a [MongoDB](https://www.mongodb.com) data base and has been already deployed in [Heroku](https://www.heroku.com) — more on that later.

### Installing
Clone the repository, then move to the newly created `flashcards` directory and finally install all the necessary packages by running `npm install`:

```
git clone https://github.com/MarcCollado/flashcards.git
cd flashcards
npm install
```

### Running the app
Once all the packages have been installed, initialize the app by running `npm run ios`. This will launch the iOS simulator and start the app.

```
npm run ios
```

**👨‍💻 Pro Tip:** although the app looks great on all iOS devices, from the beginning it was developed to get the most out of the iPhone X screen size. Therefore, if you are running the app on the iOS simulator, it is highly recommended to do it with an iPhone X.

### GraphQL API and MongoDB
On the backend, the app runs on Express and MongoDB to store and sync all the decks and cards created on the app. The communications that handle all the user requests happen through a custom built GraphQL API.

Despite the app fetches all the information from the server it can also run offline since it has already built the functionality to silently sync all the data to React Native' `AsyncStorage` key-value local storage system.

**👨‍💻 Pro Tip:** if you want to run the server locally instead of using the production version, you might be interested in checking [this](https://github.com/MarcCollado/flashcards-api) out. In such case, make sure to update the API endpoint by going to `./src/utils/api/api.js` and switch the API parameter in line 12 to be `DEV_URL`.


## Features
### Home
The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
Tapping on a deck in the list should route to an individual deck view.

### Deck
The individual deck view features:
* Deck title
* Number of cards in the deck
* Option to start a quiz for that deck
* Option to add a new question to the deck

From the home page, the user is also able to create a new deck.

### Quiz
Pressing the 'Start quiz' routes the user to the Quiz mode, which starts with a question from the selected deck — the question flips upon tap, to display the answer — and the ability to mark the questions as right or wrong.

When the last question is answered, the user score is displayed as the number of questions answered correctly.

### Other goodies
* Local notifications are generated at a specific time if the user hasn’t completed at least one quiz for that day.
* A random image pulled from the Unsplash API is assigned upon deck creation.