import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

import { NOTIFICATION_KEY } from '../api/vars';

function createNotification() {
  return {
    title: "Still haven't studied today...",
    body: '🙋‍♀️ make some time and practice with some flashcards',
    ios: {
      sound: true,
    },
  };
}

function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationAsync)
    .catch((err) =>
      console.error('Error clearing local notifications => ', err),
    );
}

function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationAsync();

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMintutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

// Notifications.presentLocalNotificationAsync(localNotification)
// Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)

// Notifications.cancelScheduledNotificationAsync(localNotificationId)
// Notifications.cancelAllScheduledNotificationsAsync()
