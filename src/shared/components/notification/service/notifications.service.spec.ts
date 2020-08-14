import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';
import { NotificationTypes } from 'src/shared/enums/notification-types';
import { By } from '@angular/platform-browser';
import { NotificationComponent } from '../notification.component';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [NotificationComponent],
      providers: [NotificationsService],
    });
    fixture = TestBed.createComponent(NotificationComponent);
    fixture.detectChanges();
    service = TestBed.inject(NotificationsService);
  });

  test('should be created notification service', () => {
    expect(service).toBeTruthy();
  });

  test('should create info notification', () => {
    service.createNotification('Info title', 'Info message', NotificationTypes.Info);
    fixture.detectChanges();
    const divMessage = fixture.debugElement.query(By.css('div.notification__content'))
      .nativeElement;
    const divTitle = fixture.debugElement.query(By.css('h4.notification__title')).nativeElement;
    expect(divMessage.textContent.trim()).toBe('Info message');
    expect(divTitle.textContent.trim()).toBe('Info title');
  });
});
