import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

class NotificationService {
  private initialized = false;

  async initialize(): Promise<boolean> {
    if (this.initialized) return true;

    if (!Device.isDevice) {
      console.log('Notifications only work on physical devices');
      return false;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permissions not granted');
        return false;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#2563EB',
        });

        await Notifications.setNotificationChannelAsync('announcements', {
          name: 'Announcements',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
        });

        await Notifications.setNotificationChannelAsync('homework', {
          name: 'Homework',
          importance: Notifications.AndroidImportance.DEFAULT,
        });

        await Notifications.setNotificationChannelAsync('fees', {
          name: 'Fees',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }

      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Notification initialization error:', error);
      return false;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async scheduleLocalNotification(
    payload: NotificationPayload,
    delay: number = 0
  ): Promise<string | null> {
    try {
      const trigger = delay > 0 ? { date: new Date(Date.now() + delay) } : null;
      
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: payload.title,
          body: payload.body,
          data: payload.data,
          sound: 'default',
        },
        trigger,
      });
      return id;
    } catch (error) {
      console.error('Schedule notification error:', error);
      return null;
    }
  }

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Cancel notification error:', error);
    }
  }

  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Cancel all notifications error:', error);
    }
  }

  async getBadgeCount(): Promise<number> {
    return await Notifications.getBadgeCountAsync();
  }

  async setBadgeCount(count: number): Promise<void> {
    await Notifications.setBadgeCountAsync(count);
  }

  addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void
  ): Notifications.EventSubscription {
    return Notifications.addNotificationReceivedListener(callback);
  }

  addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void
  ): Notifications.EventSubscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  async sendHomeworkReminder(homeworkTitle: string, dueDate: string): Promise<void> {
    await this.scheduleLocalNotification({
      title: '📚 Homework Reminder',
      body: `${homeworkTitle} is due on ${dueDate}`,
      data: { type: 'homework' },
    });
  }

  async sendExamReminder(examName: string, date: string): Promise<void> {
    await this.scheduleLocalNotification({
      title: '📝 Exam Reminder',
      body: `${examName} is scheduled on ${date}`,
      data: { type: 'exam' },
    });
  }

  async sendFeeReminder(feeType: string, dueDate: string): Promise<void> {
    await this.scheduleLocalNotification({
      title: '💰 Fee Payment Reminder',
      body: `${feeType} payment is due on ${dueDate}`,
      data: { type: 'fee' },
    });
  }

  async sendAnnouncementNotification(title: string): Promise<void> {
    await this.scheduleLocalNotification({
      title: '📢 New Announcement',
      body: title,
      data: { type: 'announcement' },
    });
  }
}

export const notificationService = new NotificationService();
export default notificationService;
