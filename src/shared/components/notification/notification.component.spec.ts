import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create notification', () => {
    expect(component).toBeTruthy();
  });

  test('should create hidden success notification', () => {
    const divClass = fixture.debugElement
      .query(By.css('div.notification'))
      .nativeElement.getAttribute('class');
    expect(divClass).toBe('notification is-hidden is-success');
  });

  test('should create hidden success notification with Message and Title', () => {
    const divMessage = fixture.debugElement.query(By.css('div.notification__content'))
      .nativeElement;
    const divTitle = fixture.debugElement.query(By.css('h4.notification__title')).nativeElement;
    expect(divMessage.textContent.trim()).toBe('Message');
    expect(divTitle.textContent.trim()).toBe('Title');
  });
});
