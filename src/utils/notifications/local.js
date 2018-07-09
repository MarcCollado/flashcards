import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { NOTIFICATION_KEY } from 'react-native-dotenv';

function createNotification() {
  return {
    title: "Still haven't studied today...",
    body: '🙋‍♀️ make some time and practice with some flashcards',
    ios: {
      sound: true,
    },
  };
}

export function getNotificationPermissions() {
  return Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    .then(({ status }) => {
      if (status !== 'granted') {
        return false;
      }
      return true;
    })
    .catch((err) => console.error('Error getting permissions => ', err));
}

export function askNotificationPermissions() {
  Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
    .then(({ status }) => {
      if (status !== 'granted') {
        alert(
          `🙋‍♀️ Hey! You might want to enable notifications, otherwise you're missing out on daily reminders.`,
        );
      }
    })
    .catch((err) => console.error('Error getting permissions => ', err));
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch((err) =>
      console.error('Error clearing local notifications => ', err),
    );
}

export function sendLocalNotification() {
  return Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {
        Notifications.presentLocalNotificationAsync(createNotification());
      }
    })
    .catch((err) => console.error('Error sending local notification => ', err));
}

export function setDailyNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data === null) {
        Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(18);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              ).then((id) =>
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(id)),
              );
            } else {
              alert(
                `🙋‍♀️ Hey! You might want to enable notifications, otherwise you're missing out on daily reminders.`,
              );
            }
          })
          .catch((err) => console.error('Error getting permissions => ', err));
      }
    })
    .catch((err) =>
      console.error(
        'Error retreiving notification from local storage => ',
        err,
      ),
    );
}
