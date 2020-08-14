import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationTypes } from 'src/shared/enums/notification-types';
import { NotificationSettings } from './model/notification-model';
import { Subscription } from 'rxjs';
import { NotificationsService } from './service/notifications.service';

@Component({
  selector: 'app-notification',
  styles: [
    '.notification__close{cursor: pointer}',
    '.notification{position: absolute !important; top: 1rem !important}',
  ],
  template: `
    <div class="notificationContainer">
      <div class="notifications">
        <div class="notification" [ngClass]="notificationSettings.type">
          <div class="notification__main">
            <h4 class="notification__title">
              {{ notificationSettings.title }}
              <a class="notification__close" title="Close dialog"></a>
            </h4>
            <div class="notification__content">
              {{ notificationSettings.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NotificationComponent implements OnInit, OnDestroy {
  notificationSettings = new NotificationSettings(
    'Title',
    'Message',
    NotificationTypes.Success,
    false
  );
  private notificationSubscription: Subscription;
  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.toggle(false);
    this.notificationSubscription = this.notificationService.settings.subscribe(
      (resp: NotificationSettings) => {
        this.notificationSettings = resp;
        this.toggle(resp.show);
      }
    );

    // add event for closing notification
    const close = document.querySelectorAll('.notification__close');
    close.forEach((notification) => {
      notification.addEventListener('click', () =>
        notification.parentElement.parentElement.parentElement.classList.add('is-hidden')
      );
    });
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }

  // show or hide notification
  private toggle(show: boolean) {
    const elem = document.querySelectorAll('.notification');
    elem.forEach((el) => {
      show ? el.classList.remove('is-hidden') : el.classList.add('is-hidden');
    });
  }
}
