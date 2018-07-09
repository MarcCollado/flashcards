import Unsplash from 'unsplash-js/native';
import {
  UNSPLASH_APP_ACCESS_KEY,
  UNSPLASH_APP_SECRET,
} from 'react-native-dotenv';

// unsplash app auth
export const unsplash = new Unsplash({
  applicationId: UNSPLASH_APP_ACCESS_KEY,
  secret: UNSPLASH_APP_SECRET,
});
