import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

/**
 * @description Define NOTIFICATION KEY
 */
const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

/**
 * @description Define a function to create notification
 */
function createNotification () {
    return {
        title: 'Log your stats!',
        body: "👋 Don't forget to look any flash card today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

/**
 * @description Define a function to set local notification
 */
export function setLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications
                  .cancelAllScheduledNotificationsAsync()
                  .then(() => {
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
  
                    Notifications.scheduleNotificationAsync({
                      content: createNotification(),
                      trigger: tomorrow,
                    })
                    .then(() => {
                      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                      console.log('reminder set!')
                    })
                  })
              }
            })
        }
      })
  }

/**
 * @description Define a function to set local notification
 */
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}