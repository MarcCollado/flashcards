# Mobile Flashcards
React Native Project — Udacity React Developer Nanodegree

This is the third (and last) project of the [React Developer Nanodegree](https://eu.udacity.com/course/react-nanodegree--nd019).

* [MyReads](https://github.com/MarcCollado/my-reads) — React Fundamentals Project
* [Would You Rather](https://github.com/MarcCollado/would-you-rather) — React & Redux Project
* [Flashcards](https://github.com/MarcCollado/flashcards) — React Native Project

## TL;DR
This project consists in a [flashcards](https://en.wikipedia.org/wiki/Flashcard) mobile application built with React Native. The mobile app, currently available for iOS, allows users to create decks, add cards with questions to the decks and, of course, quiz themselves and receive a score upon quiz completion.


## Tech Stack
* [React Native](https://facebook.github.io/react-native/)
* [React Navigation](https://reactnavigation.org/)
* [GraphQL](https://graphql.org)
* [MongoDB](https://www.mongodb.com)
* [Express](https://expressjs.com)
* [Styled Components](https://www.styled-components.com)
* [Unsplash API](https://unsplash.com/developers)


## Setting Things Up
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


## How It Works
TBD...

### Ask For Notifications
TBD...
### Decks
TBD...
### Deck Details
TBD...
### Quiz
TBD...
## Add Deck and Card
TBD...