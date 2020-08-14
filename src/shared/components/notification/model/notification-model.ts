import { NotificationTypes } from 'src/shared/enums/notification-types';

export class NotificationSettings {
  constructor(
    public title: string,
    public message: string,
    public type: NotificationTypes,
    public show: boolean
  ) {}
}
