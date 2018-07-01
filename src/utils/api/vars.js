import Unsplash from 'unsplash-js/native';
import {
  UNSPLASH_APP_ACCESS_KEY,
  UNSPLASH_APP_SECRET,
  UNSPLASH_CALLBACK_URL,
} from 'react-native-dotenv';

// unsplash app auth
export const unsplash = new Unsplash({
  applicationId: UNSPLASH_APP_ACCESS_KEY,
  secret: UNSPLASH_APP_SECRET,
  callbackUrl: UNSPLASH_CALLBACK_URL,
});

// AsyncStorage key
export const STORAGE_KEY = `flashcards`;
// URL endpoint for GraphQL API calls
export const DEV_URL = `http://localhost:4000/graphql?`;
