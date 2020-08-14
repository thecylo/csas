import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationSettings } from '../model/notification-model';
import { NotificationTypes } from 'src/shared/enums/notification-types';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationSettings = new Subject<any>();
  settings = this.notificationSettings.asObservable();

  createNotification(title: string, message: string, type: NotificationTypes): void {
    this.notificationSettings.next(new NotificationSettings(title, message, type, true));
  }
}
